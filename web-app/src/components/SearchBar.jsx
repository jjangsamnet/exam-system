import './SearchBar.css'

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <div className="search-icon">🔍</div>
      <input
        type="text"
        className="search-input"
        placeholder="문제 내용이나 과목으로 검색..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm && (
        <button
          className="search-clear"
          onClick={() => onSearchChange('')}
          title="검색어 지우기"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
