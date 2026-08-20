    import api from "../api/axios";

    // Deposit
    export const depositMoney = async (data) => {
        const response = await api.post(
            "/transactions/deposit",
            data
        );

        return response.data;
    };

    // Withdraw
    export const withdrawMoney = async (data) => {
        const response = await api.post(
            "/transactions/withdraw",
            data
        );

        return response.data;
    };

    // Fund Transfer
    export const transferMoney = async (data) => {
        const response = await api.post(
            "/transactions/transfer",
            data
        );

        return response.data;
    };

    // Transaction History
    export const getTransactionHistory = async (
        accountNumber
    ) => {
        const response = await api.get(
            `/transactions/account/${accountNumber}`
        );

        return response.data;
    };

    // Mini Statement
    export const getMiniStatement = async (
        accountNumber
    ) => {
        const response = await api.get(
            `/transactions/account/${accountNumber}/mini-statement`
        );

        return response.data;
    };