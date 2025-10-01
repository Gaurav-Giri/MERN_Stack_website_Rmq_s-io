import React, { lazy } from "react";
import ProtectedRoute, { PublicRoute } from "./ProtectedRoutes.jsx";
const VendorDashboardPage = lazy(()=> import("../pages/Dashboard/VendorDashboard/VendorDashboardPage.jsx"))
const UserDashboardPage =  lazy(()=> import("../pages/Dashboard/UserDashboard/UserDashboardPage.jsx"))
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage.jsx"));
const HomePage = lazy(() => import("../pages/homePage/HomePage.jsx"));
const NotFoundPage = lazy(() => import("../Pages/error-pages/NotFoundPage.jsx"));
const SchoolMealPage = lazy(() => import("../pages/SchoolMealPage/SchoolMealPage.jsx"));
const FAQPage = lazy(() => import("../pages/FAQPage/FAQPage.jsx"));
const TermsAndConditionsPage = lazy(() => import("../pages/TermsAndConditionsPage/TermsAndConditionsPage.jsx"));
const PrivacyPolicyPage = lazy(() => import("../pages/PrivacyPolicyPage/PrivacyPolicyPage.jsx"));
const AboutUsPage = lazy(() => import("../pages/AboutUspage/AboutUSPage.jsx"));
const ContactUSPage = lazy(() => import("../pages/ContactUsPage/ContactUsPage.jsx"));
const SchoolListPage = lazy(() => import("../pages/SchoolListPage/SchoolListPage.jsx"));
const AdminDashboardPage = lazy(() => import("../pages/Dashboard/AdminDashboard/AdminDashBoardPage.jsx"));
const CheckoutPage = lazy(()=>import("../pages/CheckoutPage/CheckoutPage.jsx"));

export const ROUTES = [
  {
    path: "/",
    element: <HomePage />,
    name: "home",
  },
  {
    path: "/AdminDashboard",
    element: (
      <ProtectedRoute requireAdmin={true}>
        <AdminDashboardPage />
      </ProtectedRoute>
    ),
    name: "AdminDashboard",
  },

  {
    path: "/VendorDashboard",
    element: (
        <ProtectedRoute>
            < VendorDashboardPage/>
        </ProtectedRoute>
    
    ),
    name: "VendorDashboard"
  },

  
  {
    path: "/UserDashboard",
    element: (
        <ProtectedRoute>
            < UserDashboardPage/>
        </ProtectedRoute>
    
    ),
    name: "UserDashboard"
  },


  {
    path:"/Checkout",
    element:(
      <ProtectedRoute>
          <CheckoutPage/>
      </ProtectedRoute>
    ),
    name:"Checkout",
  },

  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
    name: "login",
  },
  {
    path: "/SchoolList",
    element: (
      <ProtectedRoute>
        <SchoolListPage />
      </ProtectedRoute>
    ),
    name: "SchoolList",
  },
  {
    path: "/SchoolMeal",
    element: (
      <ProtectedRoute>
        <SchoolMealPage />
      </ProtectedRoute>
    ),
    name: "schoolMeal",
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicyPage />,
    name: "PrivacyPolicy",
  },
  {
    path: "/Terms&Conditions",
    element: <TermsAndConditionsPage />,
    name: "Terms&Conditions",
  },
  {
    path: "/FAQ",
    element: <FAQPage />,
    name: "FAQ",
  },
  {
    path: "/AboutUs",
    element: <AboutUsPage />,
    name: "AboutUs",
  },
  {
    path: "/ContactUs",
    element: <ContactUSPage />,
    name: "ContactUs",
  },
  {
    path: "*",
    element: <NotFoundPage />,
    name: "notFound",
  },
];