import React, { useState } from 'react';
import searchIcon from '../../../../public/assets/images/search.png';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="school-search" onSubmit={handleSearch}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for your school..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          <img src={searchIcon} alt="Search" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;