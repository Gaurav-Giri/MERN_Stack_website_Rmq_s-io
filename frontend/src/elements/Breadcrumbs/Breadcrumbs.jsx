
// import React from 'react';

// import './Breadcrumbs.css';
// import { Link } from 'react-router-dom';
// import useBreadcrumbs from 'd:/school_lunch/Frontend/src/hooks/useBreadcrumbs';
// import './Breadcrumbs.css';


// const Breadcrumbs = () => {
//   const breadcrumbs = useBreadcrumbs();

//   return (
//     <nav className="breadcrumbs">
//       <Link to="/">Home</Link>
//       {breadcrumbs.map((breadcrumb, index) => (
//         <React.Fragment key={breadcrumb.path}>
//           <span className="breadcrumb-separator"> / </span>
//           {index === breadcrumbs.length - 1 ? (
//             <span className="breadcrumb-active">{breadcrumb.name}</span>
//           ) : (
//             <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
//           )}
//         </React.Fragment>
//       ))}
//     </nav>
//   );
// };

// export default Breadcrumbs;




// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import useBreadcrumbs from 'd:/school_lunch/Frontend/src/hooks/useBreadcrumbs';
// import './Breadcrumbs.css';

// const Breadcrumbs = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const breadcrumbs = useBreadcrumbs();

//   useEffect(() => {
//     const checkDarkMode = () => {
//       setIsDarkMode(document.body.classList.contains('dark-mode'));
//     };
    
//     checkDarkMode();
    
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.body, {
//       attributes: true,
//       attributeFilter: ['class']
//     });
    
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <nav className={`breadcrumbs ${isDarkMode ? 'dark' : ''}`}>
//       <Link to="/">Home</Link>
//       {breadcrumbs.map((breadcrumb, index) => (
//         <React.Fragment key={breadcrumb.path}>
//           <span className="breadcrumb-separator"> / </span>
//           {index === breadcrumbs.length - 1 ? (
//             <span className="breadcrumb-active">{breadcrumb.name}</span>
//           ) : (
//             <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
//           )}
//         </React.Fragment>
//       ))}
//     </nav>
//   );
// };

// export default Breadcrumbs;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useBreadcrumbs } from '../../hooks/useBreadCrumbs'; // Fixed import path
// import { useThemeTrigger } from '../../ThemeTrigger'; // Import the theme hook
// import './Breadcrumbs.css';

// const Breadcrumbs = () => {
//   const { darkMode } = useThemeTrigger(); // Use theme context
//   const breadcrumbs = useBreadcrumbs();
//   console.log('Current breadcrumbs:', breadcrumbs);
//   return (
//     <nav className={`breadcrumbs ${darkMode ? 'dark' : ''}`}>
//       <Link to="/">Home</Link>
//       {breadcrumbs.map((breadcrumb, index) => (
//         <React.Fragment key={breadcrumb.path}>
//           <span className="breadcrumb-separator"> / </span>
//           {index === breadcrumbs.length - 1 ? (
//             <span className="breadcrumb-active">{breadcrumb.name}</span>
//           ) : (
//             <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
//           )}
//         </React.Fragment>
//       ))}
//     </nav>
//   );
// };

// export default Breadcrumbs;

import React from 'react';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from '../../hooks/useBreadCrumbs';
import { useThemeTrigger } from '../../ThemeTrigger';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
  const { darkMode } = useThemeTrigger();
  const breadcrumbs = useBreadcrumbs();

  return (
    <nav className={`breadcrumbs ${darkMode ? 'dark' : ''}`}>
      {/* Always show Home link */}
      <Link to="/">Home</Link>
      
      {/* Show other breadcrumbs (skip the first one which is Home) */}
      {breadcrumbs.slice(1).map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          <span className="breadcrumb-separator"> / </span>
          {index === breadcrumbs.length - 2 ? ( // Adjusted index calculation
            <span className="breadcrumb-active">{breadcrumb.name}</span>
          ) : (
            <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;