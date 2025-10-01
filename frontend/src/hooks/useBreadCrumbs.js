// import { useLocation } from 'react-router-dom';
// import { ROUTES } from '../Routes/routes.jsx';

// export const useBreadcrumbs = () => {
//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter(x => x);
  
//   const breadcrumbs = pathnames.map((value, index) => {
//     const to = `/${pathnames.slice(0, index + 1).join('/')}`;
//     const route = ROUTES.find(route => route.path === to);
    
//     return {
//       path: to,
//       name: route?.name || value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
//     };
//   });
  
//   return breadcrumbs;
// };

// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { ROUTES } from '../Routes/routes.jsx';

// export const useBreadcrumbs = () => {
//   const location = useLocation();
//   const [breadcrumbs, setBreadcrumbs] = useState(() => {
//     // Initialize from sessionStorage or with Home
//     const saved = sessionStorage.getItem('breadcrumbs');
//     return saved ? JSON.parse(saved) : [{ path: '/', name: 'Home' }];
//   });

//   useEffect(() => {
//     // Don't process if we're already on the home page
//     if (location.pathname === '/') {
//       // Reset to just Home when navigating to root
//       const newBreadcrumbs = [{ path: '/', name: 'Home' }];
//       setBreadcrumbs(newBreadcrumbs);
//       sessionStorage.setItem('breadcrumbs', JSON.stringify(newBreadcrumbs));
//       return;
//     }

//     const route = ROUTES.find(route => route.path === location.pathname);
//     const name = route?.name || 
//                 location.pathname.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

//     const newCrumb = { path: location.pathname, name };

//     setBreadcrumbs(prev => {
//       // Check if this page is already in the breadcrumbs
//       const existingIndex = prev.findIndex(crumb => crumb.path === location.pathname);
      
//       let newBreadcrumbs;
//       if (existingIndex >= 0) {
//         // If page exists, truncate to that point (for backward navigation)
//         newBreadcrumbs = prev.slice(0, existingIndex + 1);
//       } else {
//         // Otherwise add the new page to the history
//         newBreadcrumbs = [...prev, newCrumb];
//       }
      
//       // Save to sessionStorage
//       sessionStorage.setItem('breadcrumbs', JSON.stringify(newBreadcrumbs));
//       return newBreadcrumbs;
//     });
//   }, [location.pathname]);

//   return breadcrumbs;
// };



// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { ROUTES } from '../Routes/routes.jsx';

// export const useBreadcrumbs = () => {
//   const location = useLocation();
//   const [breadcrumbs, setBreadcrumbs] = useState([]);

//   useEffect(() => {
//     // Handle home page separately
//     if (location.pathname === '/') {
//       setBreadcrumbs([{ path: '/', name: 'Home' }]);
//       return;
//     }

//     const route = ROUTES.find(route => route.path === location.pathname);
//     const name = route?.name || 
//                 location.pathname.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

//     const newCrumb = { path: location.pathname, name };

//     setBreadcrumbs(prev => {
//       // If we're coming from home page (no previous breadcrumbs)
//       if (prev.length === 0 || (prev.length === 1 && prev[0].path === '/')) {
//         return [{ path: '/', name: 'Home' }, newCrumb];
//       }
      
//       // Check if this page is already in the breadcrumbs
//       const existingIndex = prev.findIndex(crumb => crumb.path === location.pathname);
      
//       if (existingIndex >= 0) {
//         // If page exists, truncate to that point
//         return prev.slice(0, existingIndex + 1);
//       } else {
//         // Otherwise add the new page to the history
//         return [...prev, newCrumb];
//       }
//     });
//   }, [location.pathname]);

//   return breadcrumbs;
// };



import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../Routes/routes.jsx';

export const useBreadcrumbs = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState(() => {
    // Load from sessionStorage on initial load or start with Home
    const saved = sessionStorage.getItem('breadcrumbs');
    return saved ? JSON.parse(saved) : [{ path: '/', name: 'Home' }];
  });

  useEffect(() => {
    // Don't process if we're on the home page
    if (location.pathname === '/') {
      const newBreadcrumbs = [{ path: '/', name: 'Home' }];
      setBreadcrumbs(newBreadcrumbs);
      sessionStorage.setItem('breadcrumbs', JSON.stringify(newBreadcrumbs));
      return;
    }

    const route = ROUTES.find(route => route.path === location.pathname);
    const name = route?.name || 
                location.pathname.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const newCrumb = { path: location.pathname, name };

    setBreadcrumbs(prev => {
      // If we're coming from home page (no previous breadcrumbs or only home)
      if (prev.length === 0 || (prev.length === 1 && prev[0].path === '/')) {
        const newBreadcrumbs = [{ path: '/', name: 'Home' }, newCrumb];
        sessionStorage.setItem('breadcrumbs', JSON.stringify(newBreadcrumbs));
        return newBreadcrumbs;
      }
      
      // Check if this page is already in the breadcrumbs
      const existingIndex = prev.findIndex(crumb => crumb.path === location.pathname);
      
      let newBreadcrumbs;
      if (existingIndex >= 0) {
        // If page exists, truncate to that point (for backward navigation)
        newBreadcrumbs = prev.slice(0, existingIndex + 1);
      } else {
        // Otherwise add the new page to the history
        newBreadcrumbs = [...prev, newCrumb];
      }
      
      // Save to sessionStorage
      sessionStorage.setItem('breadcrumbs', JSON.stringify(newBreadcrumbs));
      return newBreadcrumbs;
    });
  }, [location.pathname]);

  return breadcrumbs;
};