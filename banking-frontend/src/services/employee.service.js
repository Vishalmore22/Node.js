import api from "../api/axios";

// Create Employee
export const createEmployee = async (data) => {
    const response = await api.post("/employees", data);

    return response.data;
};

// Get All Employees
export const getEmployees = async () => {
    const response = await api.get("/employees");

    return response.data;
};

// Get Employee By ID
export const getEmployeeById = async (id) => {
    const response = await api.get(`/employees/${id}`);

    return response.data;
};

// Update Employee
export const updateEmployee = async (id, data) => {
    const response = await api.put(`/employees/${id}`, data);

    return response.data;
};

// Toggle Employee Status
export const toggleEmployeeStatus = async (id) => {
    const response = await api.patch(`/employees/${id}/status`);

    return response.data;
};