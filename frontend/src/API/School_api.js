// import API from "./api"; // Import your main API instance

// // Get all schools
// export const getSchools = async () => {
//   try {
//     const res = await API.get("/schools");
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to fetch schools");
//   }
// };

// // Search schools by query
// export const searchSchools = async (query) => {
//   try {
//     const res = await API.get(`schools/search?q=${encodeURIComponent(query)}`);
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to search schools");
//   }
// };

// // Get school by ID
// export const getSchoolById = async (id) => {
//   try {
//     const res = await API.get(`/schools/${id}`);
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to fetch school");
//   }
// };

// // Create new school (admin only)
// export const createSchool = async (schoolData) => {
//   try {
//     const res = await API.post("/schools", schoolData);
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to create school");
//   }
// };

// // Update school (admin only)
// export const updateSchool = async (id, schoolData) => {
//   try {
//     const res = await API.put(`/schools/${id}`, schoolData);
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to update school");
//   }
// };

// // Delete school (admin only)
// export const deleteSchool = async (id) => {
//   try {
//     const res = await API.delete(`/schools/${id}`);
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to delete school");
//   }
// };

// // Get schools with pagination
// export const getSchoolsPaginated = async (page = 1, limit = 10) => {
//   try {
//     const res = await API.get(`/schools?page=${page}&limit=${limit}`);
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to fetch schools");
//   }
// };

// // Get schools by filter (type, location, etc.)
// export const getSchoolsByFilter = async (filters = {}) => {
//   try {
//     const queryParams = new URLSearchParams(filters).toString();
//     const res = await API.get(`/schools/filter?${queryParams}`);
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to filter schools");
//   }
// };

// export default {
//   getSchools,
//   searchSchools,
//   getSchoolById,
//   createSchool,
//   updateSchool,
//   deleteSchool,
//   getSchoolsPaginated,
//   getSchoolsByFilter
// };


import API from "./api";

// Get all schools
export const getSchools = async () => {
  try {
    const res = await API.get("/schools");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch schools");
  }
};

// Search schools by query
export const searchSchools = async (query) => {
  try {
    const res = await API.get(`/schools/search?q=${encodeURIComponent(query)}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to search schools");
  }
};

// Get school by ID
export const getSchoolById = async (id) => {
  try {
    const res = await API.get(`/schools/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch school");
  }
};

// Create new school (admin only)
export const createSchool = async (schoolData) => {
  try {
    const res = await API.post("/schools", schoolData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create school");
  }
};

// Update school (admin only)
export const updateSchool = async (id, schoolData) => {
  try {
    const res = await API.put(`/schools/${id}`, schoolData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update school");
  }
};

// Delete school (admin only)
export const deleteSchool = async (id) => {
  try {
    const res = await API.delete(`/schools/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete school");
  }
};

// Get schools with pagination
export const getSchoolsPaginated = async (page = 1, limit = 10) => {
  try {
    const res = await API.get(`/schools?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch schools");
  }
};

// Get schools by filter (type, location, etc.)
export const getSchoolsByFilter = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const res = await API.get(`/schools/filter?${queryParams}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to filter schools");
  }
};

// Get school statistics
export const getSchoolStats = async () => {
  try {
    const res = await API.get("/schools/stats/overview");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch school statistics");
  }
};

export default {
  getSchools,
  searchSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
  getSchoolsPaginated,
  getSchoolsByFilter,
  getSchoolStats
};