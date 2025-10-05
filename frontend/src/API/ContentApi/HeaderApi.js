// api/HeaderApi.js

import API from "../api.js";

// Get header content
export const getHeader = async () => {
  try {
    const res = await API.get("/headerApi");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch header content");
  }
};

// Create header content (admin only)
export const createHeader = async (headerData) => {
  try {
    const res = await API.post("/headerApi", headerData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create header content");
  }
};

// Update header content (admin only)
export const updateHeader = async (updates) => {
  try {
    const res = await API.put("/headerApi", { updates });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update header content");
  }
};

// Add navigation link (admin only)
export const addHeaderLink = async (linkData) => {
  try {
    const res = await API.post("/headerApi/links", linkData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add navigation link");
  }
};

// Update navigation link (admin only)
export const updateHeaderLink = async (linkId, linkData) => {
  try {
    const res = await API.put(`/headerApi/links/${linkId}`, linkData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update navigation link");
  }
};

// Delete navigation link (admin only)
export const deleteHeaderLink = async (linkId) => {
  try {
    const res = await API.delete(`/headerApi/links/${linkId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete navigation link");
  }
};

// Update logo (admin only)
export const updateHeaderLogo = async (logoData) => {
  try {
    const res = await API.patch("/headerApi/logo", logoData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update logo");
  }
};

// Update theme settings (admin only)
export const updateHeaderThemeSettings = async (themeSettings) => {
  try {
    const res = await API.patch("/headerApi/theme-settings", themeSettings);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update theme settings");
  }
};

// Reorder navigation links (admin only)
export const reorderHeaderLinks = async (linksOrder) => {
  try {
    const res = await API.patch("/headerApi/reorder-links", { linksOrder });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to reorder navigation links");
  }
};

// Toggle link status (admin only)
export const toggleHeaderLinkStatus = async (linkId) => {
  try {
    const res = await API.patch(`/headerApi/links/${linkId}/toggle-status`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to toggle link status");
  }
};

// Get header statistics
export const getHeaderStats = async () => {
  try {
    const res = await API.get("/headerApi/stats/overview");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch header statistics");
  }
};

export default {
  getHeader,
  createHeader,
  updateHeader,
  addHeaderLink,
  updateHeaderLink,
  deleteHeaderLink,
  updateHeaderLogo,
  updateHeaderThemeSettings,
  reorderHeaderLinks,
  toggleHeaderLinkStatus,
  getHeaderStats
};