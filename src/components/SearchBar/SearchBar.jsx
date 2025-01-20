import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedSearch = useCallback(
    debounce((value) => onSearch(value), 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;