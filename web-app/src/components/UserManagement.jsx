import { useState, useEffect } from 'react'
import { listAllUsers, updateUserApprovalStatus, updateUserRole } from '../dataconnect-generated'
import './UserManagement.css'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const result = await listAllUsers()
      setUsers(result.data.users || [])
    } catch (error) {
      console.error('사용자 목록 로드 실패:', error)
      alert('사용자 목록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleApprovalUpdate = async (userId, newStatus) => {
    try {
      await updateUserApprovalStatus({ userId, approvalStatus: newStatus })
      alert(`사용자를 ${newStatus === 'approved' ? '승인' : '거부'}했습니다.`)
      loadUsers()
    } catch (error) {
      console.error('승인 상태 업데이트 실패:', error)
      alert('승인 상태 업데이트에 실패했습니다.')
    }
  }

  const handleRoleUpdate = async (userId, newRole) => {
    if (!confirm(`정말로 이 사용자의 역할을 ${getRoleName(newRole)}(으)로 변경하시겠습니까?`)) {
      return
    }

    try {
      await updateUserRole({ userId, role: newRole })
      alert('사용자 역할이 변경되었습니다.')
      loadUsers()
    } catch (error) {
      console.error('역할 업데이트 실패:', error)
      alert('역할 업데이트에 실패했습니다.')
    }
  }

  const getRoleName = (role) => {
    const roles = {
      'student': '학생',
      'teacher': '교사',
      'admin': '관리자'
    }
    return roles[role] || role
  }

  const getStatusBadge = (status) => {
    const badges = {
      'pending': { text: '대기중', className: 'status-pending' },
      'approved': { text: '승인됨', className: 'status-approved' },
      'rejected': { text: '거부됨', className: 'status-rejected' }
    }
    const badge = badges[status] || { text: status, className: '' }
    return <span className={`status-badge ${badge.className}`}>{badge.text}</span>
  }

  const getRoleBadge = (role) => {
    const badges = {
      'student': { text: '학생', className: 'role-student' },
      'teacher': { text: '교사', className: 'role-teacher' },
      'admin': { text: '관리자', className: 'role-admin' }
    }
    const badge = badges[role] || { text: role, className: '' }
    return <span className={`role-badge ${badge.className}`}>{badge.text}</span>
  }

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.approvalStatus === filter
    const matchesSearch = searchTerm === '' ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="user-management">
        <div className="loading">사용자 목록을 불러오는 중...</div>
      </div>
    )
  }

  return (
    <div className="user-management">
      <div className="page-header">
        <h1 className="page-title">사용자 관리</h1>
        <p className="page-description">모든 사용자를 확인하고 승인/거부할 수 있습니다.</p>
      </div>

      <div className="filters">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            전체 ({users.length})
          </button>
          <button
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            대기중 ({users.filter(u => u.approvalStatus === 'pending').length})
          </button>
          <button
            className={`filter-tab ${filter === 'approved' ? 'active' : ''}`}
            onClick={() => setFilter('approved')}
          >
            승인됨 ({users.filter(u => u.approvalStatus === 'approved').length})
          </button>
          <button
            className={`filter-tab ${filter === 'rejected' ? 'active' : ''}`}
            onClick={() => setFilter('rejected')}
          >
            거부됨 ({users.filter(u => u.approvalStatus === 'rejected').length})
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="이름 또는 이메일로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>이메일</th>
              <th>역할</th>
              <th>학교</th>
              <th>상태</th>
              <th>가입일</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-message">
                  {searchTerm ? '검색 결과가 없습니다.' : '사용자가 없습니다.'}
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="user-name">{user.name}</td>
                  <td className="user-email">{user.email}</td>
                  <td>
                    <select
                      className="role-select"
                      value={user.role}
                      onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                    >
                      <option value="student">학생</option>
                      <option value="teacher">교사</option>
                      <option value="admin">관리자</option>
                    </select>
                  </td>
                  <td className="user-school">{user.schoolName || '-'}</td>
                  <td>{getStatusBadge(user.approvalStatus)}</td>
                  <td className="user-date">
                    {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="user-actions">
                    {user.approvalStatus === 'pending' && (
                      <>
                        <button
                          className="action-btn approve-btn"
                          onClick={() => handleApprovalUpdate(user.id, 'approved')}
                        >
                          승인
                        </button>
                        <button
                          className="action-btn reject-btn"
                          onClick={() => handleApprovalUpdate(user.id, 'rejected')}
                        >
                          거부
                        </button>
                      </>
                    )}
                    {user.approvalStatus === 'rejected' && (
                      <button
                        className="action-btn approve-btn"
                        onClick={() => handleApprovalUpdate(user.id, 'approved')}
                      >
                        승인
                      </button>
                    )}
                    {user.approvalStatus === 'approved' && user.role !== 'student' && (
                      <button
                        className="action-btn reject-btn"
                        onClick={() => handleApprovalUpdate(user.id, 'rejected')}
                      >
                        차단
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement
