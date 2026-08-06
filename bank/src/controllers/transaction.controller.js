import {
    depositService,
    withdrawService,
    transferService,
    getTransactionHistoryService,
    getMiniStatementService
} from "../services/transaction.service.js";

export const deposit = async (
    req,
    res
) => {

    try {

        const transaction =
            await depositService(
                req.body,
                req.user
            );

        res.status(201).json({
            success: true,
            message: "Deposit successful.",
            data: transaction,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

export const withdraw = async (
    req,
    res
) => {

    try {

        const transaction =
            await withdrawService(
                req.body,
                req.user
            );

        res.status(201).json({
            success: true,
            message: "Withdrawal successful.",
            data: transaction,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

export const transfer = async (req, res) => {

    try {

        const transaction =
            await transferService(
                req.body,
                req.user
            );

        res.status(201).json({
            success: true,
            message: "Fund transferred successfully.",
            data: transaction,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

export const getTransactionHistory = async (
    req,
    res
) => {

    try {

        const transactions =
            await getTransactionHistoryService(
                req.params.accountNumber
            );

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }

};

export const getMiniStatement = async (
    req,
    res
) => {

    try {

        const transactions =
            await getMiniStatementService(
                req.params.accountNumber
            );

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }

};