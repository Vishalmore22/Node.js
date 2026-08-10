import api from "../api/axios";

export const getBranches = async () => {
    const response = await api.get("/branches");
    return response.data;
};