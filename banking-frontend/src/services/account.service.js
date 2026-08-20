import api from "../api/axios";

export const getAccounts = async () => {
    const response = await api.get("/accounts");
    return response.data;
};

export const getAccountByNumber = async (accountNumber) => {
    const response = await api.get(
        `/accounts/${accountNumber}`
    );
    return response.data;
};

export const createAccount = async (data) => {
    const response = await api.post("/accounts", data);
    return response.data;
};

export const searchAccounts = async (query) => {
    const response = await api.get(
        `/accounts/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
};

export const toggleAccountStatus = async (accountNumber) => {
    const response = await api.patch(
        `/accounts/${accountNumber}/status`
    );
    return response.data;
};

export const closeAccount = async (accountNumber) => {
    const response = await api.patch(
        `/accounts/${accountNumber}/close`
    );
    return response.data;
};