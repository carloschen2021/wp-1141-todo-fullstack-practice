interface SearchFilterProps {
    searchQuery: string;
    filterStatus: 'all' | 'active' | 'completed';
    onSearchChange: (query: string) => void;
    onFilterChange: (status: 'all' | 'active' | 'completed') => void;
    totalCount: number;
    filteredCount: number;
}

const SearchFilter = ({
    searchQuery,
    filterStatus,
    onSearchChange,
    onFilterChange,
    totalCount,
    filteredCount,
}: SearchFilterProps) => {
    return (
        <div className="search-filter-section">
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search todos..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchQuery && (
                    <button
                        className="clear-search-btn"
                        onClick={() => onSearchChange('')}
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>

            <div className="filter-buttons">
                <button
                    className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                    onClick={() => onFilterChange('all')}
                >
                    All
                </button>
                <button
                    className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
                    onClick={() => onFilterChange('active')}
                >
                    Active
                </button>
                <button
                    className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
                    onClick={() => onFilterChange('completed')}
                >
                    Completed
                </button>
            </div>

            {(searchQuery || filterStatus !== 'all') && (
                <div className="filter-info">
                    Showing {filteredCount} of {totalCount} todos
                </div>
            )}
        </div>
    );
};

export default SearchFilter;
