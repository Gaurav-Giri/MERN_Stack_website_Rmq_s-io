// // src/components/common/Breadcrumbs.jsx
// import React from 'react';
// // import { useLocation, Link } from 'react-router-dom';
// // import { ROUTES } from '../../routes';
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




import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'd:/school_lunch/Frontend/src/hooks/useBreadcrumbs';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const breadcrumbs = useBreadcrumbs();

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`breadcrumbs ${isDarkMode ? 'dark' : ''}`}>
      <Link to="/">Home</Link>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          <span className="breadcrumb-separator"> / </span>
          {index === breadcrumbs.length - 1 ? (
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