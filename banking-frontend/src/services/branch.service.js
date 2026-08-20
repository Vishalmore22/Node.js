import api from "../api/axios";

// Get all active branches
export const getBranches = async () => {
    const response = await api.get("/branches");

    return response.data;
};

// Get branch by ID
export const getBranchById = async (id) => {
    const response = await api.get(`/branches/${id}`);

    return response.data;
};

// Create branch
export const createBranch = async (data) => {
    const response = await api.post("/branches", data);

    return response.data;
};

// Update branch
export const updateBranch = async (id, data) => {
    const response = await api.put(`/branches/${id}`, data);

    return response.data;
};

// Activate / Deactivate branch
export const toggleBranchStatus = async (id) => {
    const response = await api.patch(
        `/branches/${id}/status`
    );

    return response.data;
};