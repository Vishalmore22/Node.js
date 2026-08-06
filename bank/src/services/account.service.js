import Account from "../models/Account.js";
import Customer from "../models/Customer.js";

const generateAccountNumber = async () => {

    const lastAccount = await Account.findOne()
        .sort({ createdAt: -1 });

    if (!lastAccount) {
        return "1000000001";
    }

    return (
        Number(lastAccount.accountNumber) + 1
    ).toString();
};


export const createAccountService = async (
    accountData,
    user
) => {

    const {
        customerId,
        accountType,
        openingBalance,
    } = accountData;

    // Find Customer by customerId
    const customer = await Customer.findOne({
        customerId,
    });

    if (!customer) {
        throw new Error("Customer not found.");
    }

    if (!customer.isActive) {
        throw new Error("Customer is inactive.");
    }

    // Prevent duplicate account type
    const existingAccount = await Account.findOne({
        customer: customer._id,
        accountType,
        status: { $ne: "closed" },
    });

    if (existingAccount) {
        throw new Error(
            `Customer already has a ${accountType} account.`
        );
    }

    // Minimum Balance Validation
    const minimumBalance = {
        savings: 500,
        current: 5000,
        fixed_deposit: 10000,
    };

    if (
        openingBalance <
        minimumBalance[accountType]
    ) {
        throw new Error(
            `Minimum opening balance for ${accountType} account is ₹${minimumBalance[accountType]}`
        );
    }

    // Generate Account Number
    const accountNumber =
        await generateAccountNumber();

    const account = await Account.create({

        accountNumber,

        customer: customer._id,

        branch: customer.branch,

        accountType,

        openingBalance,

        balance: openingBalance,

        availableBalance: openingBalance,

        openedBy: user.id,

    });

    return await account.populate([
        {
            path: "customer",
            select: "customerId firstName lastName phone",
        },
        {
            path: "branch",
            select: "branchCode branchName city",
        },
        {
            path: "openedBy",
            select: "employeeId firstName lastName role",
        },
    ]);
};

export const getAllAccountsService = async () => {

    // const accounts = await Account.find()

    const accounts = await Account.find({
        status: {
            $ne: "closed",
        },
    })
        .populate({
            path: "customer",
            select: "customerId firstName lastName phone",
        })

        .populate({
            path: "branch",
            select: "branchCode branchName city",
        })

        .populate({
            path: "openedBy",
            select: "employeeId firstName lastName role",
        })

        .sort({ createdAt: -1 });

    return accounts;
};

export const getAccountByNumberService = async (
    accountNumber
) => {

    const account = await Account.findOne({
        accountNumber,
    })

        .populate({
            path: "customer",
            select:
                "customerId firstName lastName phone email",
        })

        .populate({
            path: "branch",
            select:
                "branchCode branchName city",
        })

        .populate({
            path: "openedBy",
            select:
                "employeeId firstName lastName role",
        });

    if (!account) {
        throw new Error("Account not found.");
    }

    return account;
};

export const toggleAccountStatusService = async (
    accountNumber
) => {

    const account = await Account.findOne({
        accountNumber,
    });

    if (!account) {
        throw new Error("Account not found.");
    }

    // Closed accounts cannot be reopened
    if (account.status === "closed") {
        throw new Error(
            "Closed account cannot be modified."
        );
    }

    account.status =
        account.status === "active"
            ? "frozen"
            : "active";

    await account.save();

    return await account.populate([
        {
            path: "customer",
            select: "customerId firstName lastName",
        },
        {
            path: "branch",
            select: "branchCode branchName",
        },
        {
            path: "openedBy",
            select: "employeeId firstName lastName",
        },
    ]);
};

export const closeAccountService = async (
    accountNumber
) => {

    const account = await Account.findOne({
        accountNumber,
    });

    if (!account) {
        throw new Error("Account not found.");
    }

    if (account.status === "closed") {
        throw new Error("Account is already closed.");
    }

    if (account.balance > 0) {
        throw new Error(
            "Account balance must be zero before closing."
        );
    }

    account.status = "closed";

    await account.save();

    return account;
};

export const searchAccountsService = async (query) => {

    return await Account.find({
        status: { $ne: "closed" },
    })
        .populate("customer")
        .populate("branch", "branchCode branchName city")
        .populate(
            "openedBy",
            "employeeId firstName lastName"
        )
        .then((accounts) =>
            accounts.filter((account) => {

                const customer = account.customer;

                return (
                    account.accountNumber.includes(query) ||

                    customer.customerId
                        ?.toLowerCase()
                        .includes(query.toLowerCase()) ||

                    customer.firstName
                        ?.toLowerCase()
                        .includes(query.toLowerCase()) ||

                    customer.lastName
                        ?.toLowerCase()
                        .includes(query.toLowerCase())
                );
            })
        );
};