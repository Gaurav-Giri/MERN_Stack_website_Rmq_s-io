// api/FooterApi.js

import API from "../api.js";

// Get footer content
export const getFooter = async () => {
  try {
    const res = await API.get("/footerApi");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch footer content");
  }
};

// Create footer content (admin only)
export const createFooter = async (footerData) => {
  try {
    const res = await API.post("/footerApi", footerData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create footer content");
  }
};

// Update footer content (admin only)
export const updateFooter = async (updates) => {
  try {
    const res = await API.put("/footerApi", updates);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update footer content");
  }
};

// Add footer section (admin only)
export const addFooterSection = async (sectionData) => {
  try {
    const res = await API.post("/footerApi/sections", sectionData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add footer section");
  }
};

// Update footer section (admin only)
export const updateFooterSection = async (sectionId, sectionData) => {
  try {
    const res = await API.put(`/footerApi/sections/${sectionId}`, sectionData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update footer section");
  }
};

// Delete footer section (admin only)
export const deleteFooterSection = async (sectionId) => {
  try {
    const res = await API.delete(`/footerApi/sections/${sectionId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete footer section");
  }
};

// Update social links (admin only)
export const updateFooterSocialLinks = async (socialLinks) => {
  try {
    const res = await API.put("/footerApi/social-links", socialLinks);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update social links");
  }
};

// Update theme settings (admin only)
export const updateFooterThemeSettings = async (themeSettings) => {
  try {
    const res = await API.put("/footerApi/theme-settings", themeSettings);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update theme settings");
  }
};

// Reorder footer sections (admin only)
export const reorderFooterSections = async (sectionsOrder) => {
  try {
    const res = await API.patch("/footerApi/sections/reorder", { sectionsOrder });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to reorder footer sections");
  }
};

// Toggle section status (admin only)
export const toggleFooterSectionStatus = async (sectionId) => {
  try {
    const res = await API.patch(`/footerApi/sections/${sectionId}/toggle-status`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to toggle section status");
  }
};

// Get footer statistics
export const getFooterStats = async () => {
  try {
    const res = await API.get("/footerApi/stats/overview");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch footer statistics");
  }
};

export default {
  getFooter,
  createFooter,
  updateFooter,
  addFooterSection,
  updateFooterSection,
  deleteFooterSection,
  updateFooterSocialLinks,
  updateFooterThemeSettings,
  reorderFooterSections,
  toggleFooterSectionStatus,
  getFooterStats
};