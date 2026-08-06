import {
    createAccountService,
    getAllAccountsService,
    getAccountByNumberService,
    toggleAccountStatusService,
    closeAccountService,
    searchAccountsService
} from "../services/account.service.js";

export const createAccount = async (req, res) => {

    try {

        const account = await createAccountService(
            req.body,
            req.user
        );

        res.status(201).json({
            success: true,
            message: "Account opened successfully.",
            data: account,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

export const getAllAccounts = async (req, res) => {

    try {

        const accounts = await getAllAccountsService();

        res.status(200).json({
            success: true,
            count: accounts.length,
            data: accounts,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const getAccountByNumber = async (
    req,
    res
) => {

    try {

        const account =
            await getAccountByNumberService(
                req.params.accountNumber
            );

        res.status(200).json({
            success: true,
            data: account,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }

};

export const toggleAccountStatus = async (
    req,
    res
) => {

    try {

        const account =
            await toggleAccountStatusService(
                req.params.accountNumber
            );

        res.status(200).json({
            success: true,
            message:
                account.status === "active"
                    ? "Account activated successfully."
                    : "Account frozen successfully.",
            data: account,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

export const closeAccount = async (
    req,
    res
) => {

    try {

        const account =
            await closeAccountService(
                req.params.accountNumber
            );

        res.status(200).json({
            success: true,
            message: "Account closed successfully.",
            data: account,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

export const searchAccounts = async (
    req,
    res
) => {

    try {

        const accounts =
            await searchAccountsService(
                req.query.q
            );

        res.status(200).json({
            success: true,
            count: accounts.length,
            data: accounts,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};