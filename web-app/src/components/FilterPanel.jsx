import './FilterPanel.css'

const FilterPanel = ({ filters, onFilterChange, onReset }) => {
  const categories = [
    { id: 'all', name: '전체 과목' },
    { id: 'cat-math', name: '수학' },
    { id: 'cat-science', name: '과학' },
    { id: 'cat-english', name: '영어' },
    { id: 'cat-korean', name: '국어' }
  ]

  const difficulties = [
    { id: 'all', name: '전체 난이도' },
    { id: 'easy', name: '쉬움' },
    { id: 'medium', name: '보통' },
    { id: 'hard', name: '어려움' }
  ]

  const types = [
    { id: 'all', name: '전체 유형' },
    { id: 'multiple_choice', name: '객관식' },
    { id: 'short_answer', name: '주관식' },
    { id: 'essay', name: '서술형' }
  ]

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    })
  }

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.difficulty !== 'all' ||
    filters.type !== 'all'

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label className="filter-label">과목</label>
        <select
          className="filter-select"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">난이도</label>
        <select
          className="filter-select"
          value={filters.difficulty}
          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
        >
          {difficulties.map(diff => (
            <option key={diff.id} value={diff.id}>{diff.name}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">유형</label>
        <select
          className="filter-select"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          {types.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button className="filter-reset" onClick={onReset}>
          ↻ 초기화
        </button>
      )}
    </div>
  )
}

export default FilterPanel
