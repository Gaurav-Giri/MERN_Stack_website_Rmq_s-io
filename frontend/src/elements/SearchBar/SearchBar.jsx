// import React, { useState } from 'react';
// import searchIcon from '../../../public/images/search.png';
// import './SearchBar.css';
// const SearchBar = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch(searchTerm);
//   };

//   return (
//     <form className="school-search" onSubmit={handleSearch}>
//       <div className="search-input-container">
//         <input
//           type="text"
//           placeholder="Search for your school..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button type="submit" className="search-button">
//           <img src={searchIcon} alt="Search" />
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchBar;

// import React, { useState } from 'react';
// import searchIcon from '../../../public/images/search.png';
// import './SearchBar.css';

// const SearchBar = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch(searchTerm);
//   };

//   return (
//     <form className="school-search" onSubmit={handleSearch}>
//       <div className="search-input-container">
//         <input
//           type="text"
//           placeholder="Search for your school..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button type="submit" className="search-button">
//           <img src={searchIcon} alt="Search" />
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchBar;


// import React, { useState } from 'react';
// import searchIcon from '../../../public/images/search.png';
// import './SearchBar.css';

// const SearchBar = ({ onSearch, placeholder = "Search for your school..." }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch(searchTerm);
//   };

//   return (
//     <form className="school-search" onSubmit={handleSearch}>
//       <div className="search-input-container">
//         <input
//           type="text"
//           placeholder={placeholder}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button type="submit" className="search-button">
//           <img src={searchIcon} alt="Search" />
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchBar;



// import React, { useState } from 'react';
// import searchIcon from '../../../public/images/search.png';
// import styles from './SearchBar.module.css';

// const SearchBar = ({ onSearch, placeholder = "Search for your school..." }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch(searchTerm);
//   };

//   return (
//     <form className={styles.schoolSearch} onSubmit={handleSearch}>
//       <div className={styles.searchInputContainer}>
//         <input
//           type="text"
//           placeholder={placeholder}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className={styles.searchInput}
//         />
//         <button type="submit" className={styles.searchButton}>
//           <img src={searchIcon} alt="Search" className={styles.searchIcon} />
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchBar;



import React, { useState } from 'react';
import { useThemeTrigger } from '../../ThemeTrigger'; // Adjust path as needed
import searchIcon from '../../../public/images/search.png';
import searchIconWhite from '../../../public/images/Search.png'; // You'll need to add this
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, placeholder = "Search for your school..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode } = useThemeTrigger(); // Get darkMode state from ThemeTrigger

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={`${styles.schoolSearch} ${darkMode ? styles.darkMode : ''}`} onSubmit={handleSearch}>
      <div className={styles.searchInputContainer}>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <img 
            src={darkMode ? searchIconWhite : searchIcon} 
            alt="Search" 
            className={styles.searchIcon} 
          />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;