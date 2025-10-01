// import React from "react";
// import Header from "./elements/Header/Header.jsx";
// import Footer from "./elements/Footer/Footer.jsx";
// import Breadcrumbs from "./elements/Breadcrumbs/Breadcrumbs.jsx";
// import './mainLayout.css';
// const MainLayout = ({children})=>{
//     return(
//         <div className="layout">
//             <Header/>
//             <Breadcrumbs/>
//             <main className="content">
//                 {children}
//             </main>
//             <Footer/>
//         </div>
//     );
// };


// export default MainLayout;



import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./elements/Header/Header.jsx";
import Footer from "./elements/Footer/Footer.jsx";
import Breadcrumbs from "./elements/Breadcrumbs/Breadcrumbs.jsx";
import './mainLayout.css';

const MainLayout = ({children}) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return(
    <div className="layout">
      <Header/>
      <Breadcrumbs/>
      <main className="content">
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayout;