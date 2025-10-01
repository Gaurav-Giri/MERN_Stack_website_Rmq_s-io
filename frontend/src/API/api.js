

// import axios from "axios";


// const getBackendHost = () => {
//   const { hostname, protocol } = window.location;
  
//   // Local development
//   if (hostname === "localhost" || hostname === "127.0.0.1") {
//     return "http://localhost:5000";
//   }
  
//   // DevTunnels - simple pattern matching
//   if (hostname.includes('devtunnels.ms')) {
//     return `https://${hostname.replace('-3000', '-5000')}`;
//   }
  
//   // Default for network IPs and production
//   return `${protocol}//${hostname}:5000`;
// };



// const backendHost = getBackendHost();
// console.log('🌐 Backend Host:', backendHost);

// const API = axios.create({
//   baseURL: `/api`,
// });

// // Request interceptor
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // API functions
// export const sendOTP = async (email) => {
//   const res = await API.post("/send-otp", { email });
//   return res.data;
// };

// export const verifyOTP = async (email, otp) => {
//   const res = await API.post("/verify-otp", { email, otp });
//   return res.data;
// };

// export const updateUserDetails = async ({ email, name, phone }) => {
//   const res = await API.post("/update-details", { email, name, phone });
//   return res.data;
// };

// export const getUserProfile = async () => {
//   const res = await API.get("/profile");
//   return res.data;
// };

// export const updateProfile = async (userData) => {
//   const res = await API.put("/profile", userData);
//   return res.data;
// };

// export const logoutUser = async () => {
//   const res = await API.post("/logout");
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
//   return res.data;
// };

// export default API;





// --------------------------------------complete using proxy--------------------------------------------------------



import axios from "axios";

// Use relative paths - Vite proxy will handle the routing
const API = axios.create({
  baseURL: '/api', // Relative path - proxy will handle this
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API functions
export const sendOTP = async (email) => {
  const res = await API.post("/send-otp", { email });
  return res.data;
};

export const verifyOTP = async (email, otp) => {
  const res = await API.post("/verify-otp", { email, otp });
  return res.data;
};

export const updateUserDetails = async ({ email, name, phone }) => {
  const res = await API.post("/update-details", { email, name, phone });
  return res.data;
};

export const getUserProfile = async () => {
  const res = await API.get("/profile");
  return res.data;
};

export const updateProfile = async (userData) => {
  const res = await API.put("/profile", userData);
  return res.data;
};

export const logoutUser = async () => {
  const res = await API.post("/logout");
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return res.data;
};

export default API;


