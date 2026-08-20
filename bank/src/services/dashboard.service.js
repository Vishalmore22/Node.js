import Branch from "../models/Branch.js";
import User from "../models/User.js";
import Customer from "../models/Customer.js";
import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

export const getDashboardStatsService = async () => {

    const totalBranches = await Branch.countDocuments();

    const totalEmployees = await User.countDocuments({
        role: {
            $in: ["branch_manager", "branch_employee"],
        },
    });

    const activeEmployees = await User.countDocuments({
        role: {
            $in: ["branch_manager", "branch_employee"],
        },
        isActive: true,
    });

    const inactiveEmployees = await User.countDocuments({
        role: {
            $in: ["branch_manager", "branch_employee"],
        },
        isActive: false,
    });
    const totalCustomers = await Customer.countDocuments();

    const totalAccounts = await Account.countDocuments({
        status: { $ne: "closed" },
    });


    const activeAccounts = await Account.countDocuments({
        status: "active",
    });


    const inactiveAccounts = await Account.countDocuments({
        status: "inactive",
    });

    const frozenAccounts = await Account.countDocuments({
        status: "frozen",
    });

    const deposits = await Transaction.aggregate([
        {
            $match: {
                transactionType: "deposit",
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount",
                },
            },
        },
    ]);

    const withdrawals = await Transaction.aggregate([
        {
            $match: {
                transactionType: "withdraw",
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount",
                },
            },
        },
    ]);

    const transfers = await Transaction.aggregate([
        {
            $match: {
                transactionType: "debit",
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount",
                },
            },
        },
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTransactions = await Transaction.countDocuments({
        createdAt: {
            $gte: today,
        },
    });

    return {
        totalBranches,
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        totalCustomers,
        totalAccounts,
        activeAccounts,
        inactiveAccounts,
        frozenAccounts,
        totalDeposits: deposits[0]?.total || 0,
        totalWithdrawals: withdrawals[0]?.total || 0,
        totalTransfers: transfers[0]?.total || 0,
        todayTransactions,
    };
};