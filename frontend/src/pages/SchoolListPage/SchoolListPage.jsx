// // SchoolListPage.jsx
// import React, { useState } from "react";
// import styles from "./SchoolListPage.module.css";
// import SearchBar from "../../elements/SearchBar/SearchBar";
// import SchoolCard from "../../elements/SchoolCard/SchoolCard"; // adjust path if needed
// import { useThemeTrigger } from "../../ThemeTrigger";

// const dummySchools = [
//   { 
//     id: 1, 
//     name: "Green Valley School", 
//     location: "New Delhi", 
//     type: "Public",
//     mealOptions: 12,
//     image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//   },
//   { 
//     id: 2, 
//     name: "Sunrise Academy", 
//     location: "Mumbai", 
//     type: "Private",
//     mealOptions: 8,
//     image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//   },
//   { 
//     id: 3, 
//     name: "Bluebell High School", 
//     location: "Kolkata", 
//     type: "Public",
//     mealOptions: 15,
//     image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//   },
//   { 
//     id: 4, 
//     name: "Hilltop International", 
//     location: "Bangalore", 
//     type: "International",
//     mealOptions: 20,
//     image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//   },
//   { 
//     id: 5, 
//     name: "Riverdale Elementary", 
//     location: "Chennai", 
//     type: "Public",
//     mealOptions: 10,
//     image: "https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//   },
//   { 
//     id: 6, 
//     name: "Oakwood Preparatory", 
//     location: "Hyderabad", 
//     type: "Private",
//     mealOptions: 14,
//     image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//   },
// ];

// const SchoolListPage = () => {
//   const [search, setSearch] = useState("");
//   const { darkMode } = useThemeTrigger();

//   const filteredSchools = dummySchools.filter((school) =>
//     school.name.toLowerCase().includes(search.toLowerCase()) ||
//     school.location.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleSearch = (query) => {
//     setSearch(query);
//   };

//   return (
//     <div className={`${styles.page} ${darkMode ? styles.darkMode : ""}`}>
//       <div className={styles.header}>
//         <h1 className={styles.heading}>Find Your School</h1>
//         <p className={styles.subheading}>Discover meal options at schools across India</p>
//       </div>

//       <div className={styles.searchContainer}>
//         <SearchBar onSearch={handleSearch} placeholder="Search by school name or location..." />
//         <div className={styles.resultsCount}>{filteredSchools.length} schools found</div>
//       </div>

//       <div className={styles.grid}>
//         {filteredSchools.map((school) => (
//           <SchoolCard key={school.id} school={school} />
//         ))}
//       </div>

//       {filteredSchools.length === 0 && (
//         <div className={styles.noResults}>
//           <div className={styles.noResultIcon}>🔍</div>
//           <p className={styles.noResultText}>No schools found matching your search</p>
//           <p className={styles.noResultSubtext}>Try different keywords or browse all schools</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SchoolListPage;

// import React, { useState, useEffect } from "react";
// import { getSchools, searchSchools } from "../../API/School_api"; // Adjust path as needed
// import styles from "./SchoolListPage.module.css";
// import SearchBar from "../../elements/SearchBar/SearchBar";
// import SchoolCard from "../../elements/SchoolCard/SchoolCard";
// import { useThemeTrigger } from "../../ThemeTrigger";

// const SchoolListPage = () => {
//   const [search, setSearch] = useState("");
//   const [schools, setSchools] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { darkMode } = useThemeTrigger();

//   // Fetch schools from API
//   useEffect(() => {
//     const fetchSchools = async () => {
//       try {
//         setLoading(true);
        
//         let response;
//         if (search) {
//           response = await searchSchools(search);
//         } else {
//           response = await getSchools();
//         }
        
//         if (response.success) {
//           setSchools(response.data);
//           setError(null);
//         } else {
//           setError(response.message || "Failed to load schools");
//         }
//       } catch (err) {
//         if (err.response?.status === 401) {
//           // Token expired, let the interceptor handle it
//           return;
//         }
//         setError(err.message || "Failed to load schools. Please try again later.");
//         console.error("Error fetching schools:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Add debouncing to prevent too many API calls
//     const timeoutId = setTimeout(() => {
//       fetchSchools();
//     }, 300); // 300ms debounce

//     return () => clearTimeout(timeoutId);
//   }, [search]);

//   const handleSearch = (query) => {
//     setSearch(query);
//   };

//   if (loading && schools.length === 0) {
//     return (
//       <div className={`${styles.page} ${darkMode ? styles.darkMode : ""}`}>
//         <div className={styles.loadingContainer}>
//           <div className={styles.spinner}></div>
//           <p>Loading schools...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`${styles.page} ${darkMode ? styles.darkMode : ""}`}>
//         <div className={styles.errorContainer}>
//           <div className={styles.errorIcon}>⚠️</div>
//           <p className={styles.errorText}>{error}</p>
//           <button 
//             className={styles.retryButton}
//             onClick={() => window.location.reload()}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`${styles.page} ${darkMode ? styles.darkMode : ""}`}>
//       <div className={styles.header}>
//         <h1 className={styles.heading}>Find Your School</h1>
//         <p className={styles.subheading}>Discover meal options at schools across India</p>
//       </div>

//       <div className={styles.searchContainer}>
//         <SearchBar onSearch={handleSearch} placeholder="Search by school name or location..." />
//         <div className={styles.resultsCount}>{schools.length} schools found</div>
//       </div>

//       <div className={styles.grid}>
//         {schools.map((school) => (
//           <SchoolCard key={school._id} school={school} />
//         ))}
//       </div>

//       {schools.length === 0 && !loading && (
//         <div className={styles.noResults}>
//           <div className={styles.noResultIcon}>🔍</div>
//           <p className={styles.noResultText}>No schools found matching your search</p>
//           <p className={styles.noResultSubtext}>Try different keywords or browse all schools</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SchoolListPage;



import React, { useState, useEffect } from "react";
import { getSchools, searchSchools } from "../../API/School_api";
import styles from "./SchoolListPage.module.css";
import SearchBar from "../../elements/SearchBar/SearchBar";
import SchoolCard from "../../elements/SchoolCard/SchoolCard";
import { useThemeTrigger } from "../../ThemeTrigger";

const SchoolListPage = () => {
  const [search, setSearch] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useThemeTrigger();

  // Fetch schools from API
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response;
        if (search) {
          response = await searchSchools(search);
        } else {
          response = await getSchools();
        }
        
        if (response.success) {
          setSchools(response.data);
        } else {
          setError(response.message || "Failed to load schools");
        }
      } catch (err) {
        // Handle different types of errors
        if (err.response?.status === 401) {
          setError("Authentication failed. Please login again.");
        } else if (err.response?.status === 404) {
          setError("Schools not found. Please try again.");
        } else if (err.response?.status === 400) {
          setError("Invalid request. Please check your input.");
        } else if (err.message?.includes("Invalid school ID")) {
          setError("There seems to be an issue with school data. Please refresh.");
        } else {
          setError(err.message || "Failed to load schools. Please try again later.");
        }
        console.error("Error fetching schools:", err);
      } finally {
        setLoading(false);
      }
    };

    // Add debouncing to prevent too many API calls
    const timeoutId = setTimeout(() => {
      fetchSchools();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleSearch = (query) => {
    setSearch(query);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-fetch schools
    const fetchData = async () => {
      try {
        const response = await getSchools();
        if (response.success) {
          setSchools(response.data);
        }
      } catch (err) {
        setError("Failed to load schools. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  if (loading && schools.length === 0) {
    return (
      <div className={`${styles.page} ${darkMode ? styles.darkMode : ""}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading schools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.page} ${darkMode ? styles.darkMode : ""}`}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <p className={styles.errorText}>{error}</p>
          <button 
            className={styles.retryButton}
            onClick={handleRetry}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${darkMode ? styles.darkMode : ""}`}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Find Your School</h1>
        <p className={styles.subheading}>Discover meal options at schools across India</p>
      </div>

      <div className={styles.searchContainer}>
        <SearchBar onSearch={handleSearch} placeholder="Search by school name or location..." />
        <div className={styles.resultsCount}>
          {schools.length} school{schools.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div className={styles.grid}>
        {schools.map((school) => (
          <SchoolCard key={school._id} school={school} />
        ))}
      </div>

      {schools.length === 0 && !loading && (
        <div className={styles.noResults}>
          <div className={styles.noResultIcon}>🔍</div>
          <p className={styles.noResultText}>No schools found</p>
          <p className={styles.noResultSubtext}>
            {search ? 'Try different keywords or clear search to see all schools' : 'No schools available at the moment'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SchoolListPage;