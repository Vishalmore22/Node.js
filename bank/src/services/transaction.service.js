import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

//helper funtion

const generateTransactionId = async () => {

    const lastTransaction = await Transaction.findOne()
        .sort({ createdAt: -1 });

    if (!lastTransaction) {
        return "TXN000001";
    }

    const number = parseInt(
        lastTransaction.transactionId.replace("TXN", "")
    );

    return `TXN${String(number + 1).padStart(6, "0")}`;
};

const generateReferenceNumber = async () => {

    const lastTransfer = await Transaction.findOne({
        referenceNumber: {
            $ne: null,
        },
    }).sort({ createdAt: -1 });

    if (!lastTransfer) {
        return "TRF000001";
    }

    const number = parseInt(
        lastTransfer.referenceNumber.replace(
            "TRF",
            ""
        )
    );

    return `TRF${String(number + 1).padStart(6, "0")}`;
};



export const depositService = async (
    depositData,
    user
) => {

    const {
        accountNumber,
        amount,
        description,
    } = depositData;

    if (amount <= 0) {
        throw new Error("Deposit amount must be greater than zero.");
    }

    const account = await Account.findOne({
        accountNumber,
    });

    if (!account) {
        throw new Error("Account not found.");
    }

    if (account.status === "closed") {
        throw new Error("Account is closed.");
    }

    if (account.status === "frozen") {
        throw new Error("Account is frozen.");
    }

    const balanceBefore = account.balance;

    account.balance += amount;
    account.availableBalance += amount;

    await account.save();

    const transaction = await Transaction.create({

        transactionId: await generateTransactionId(),

        account: account._id,

        transactionType: "deposit",

        amount,

        balanceBeforeTransaction: balanceBefore,

        balanceAfterTransaction: account.balance,

        description,

        performedBy: user.id,

    });

    await transaction.populate([
        {
            path: "account",
            select:
                "accountNumber balance availableBalance",
        },
        {
            path: "performedBy",
            select:
                "employeeId firstName lastName role",
        },
    ]);

    return transaction;
};

export const withdrawService = async (
    withdrawData,
    user
) => {

    const {
        accountNumber,
        amount,
        description,
    } = withdrawData;

    if (amount <= 0) {
        throw new Error(
            "Withdrawal amount must be greater than zero."
        );
    }

    const account = await Account.findOne({
        accountNumber,
    });

    if (!account) {
        throw new Error("Account not found.");
    }

    if (account.status === "closed") {
        throw new Error("Account is closed.");
    }

    if (account.status === "frozen") {
        throw new Error("Account is frozen.");
    }

    if (account.availableBalance < amount) {
        throw new Error("Insufficient balance.");
    }

    const balanceBefore = account.balance;

    account.balance -= amount;
    account.availableBalance -= amount;

    await account.save();

    const transaction = await Transaction.create({

        transactionId: await generateTransactionId(),

        account: account._id,

        transactionType: "withdraw",

        amount,

        balanceBeforeTransaction: balanceBefore,

        balanceAfterTransaction: account.balance,

        description,

        performedBy: user.id,

    });

    await transaction.populate([
        {
            path: "account",
            select:
                "accountNumber balance availableBalance",
        },
        {
            path: "performedBy",
            select:
                "employeeId firstName lastName role",
        },
    ]);

    return transaction;
};

export const transferService = async (
    transferData,
    user
) => {

    const {
        fromAccountNumber,
        toAccountNumber,
        amount,
        description,
    } = transferData;

    if (amount <= 0) {
        throw new Error(
            "Transfer amount must be greater than zero."
        );
    }

    if (fromAccountNumber === toAccountNumber) {
        throw new Error(
            "Sender and receiver account cannot be same."
        );
    }

    const sender = await Account.findOne({
        accountNumber: fromAccountNumber,
    });

    const receiver = await Account.findOne({
        accountNumber: toAccountNumber,
    });

    if (!sender) {
        throw new Error("Sender account not found.");
    }

    if (!receiver) {
        throw new Error("Receiver account not found.");
    }

    if (sender.status !== "active") {
        throw new Error(
            "Sender account is not active."
        );
    }

    if (receiver.status !== "active") {
        throw new Error(
            "Receiver account is not active."
        );
    }

    if (sender.availableBalance < amount) {
        throw new Error("Insufficient balance.");
    }

    const referenceNumber =
        await generateReferenceNumber();

    const senderBalanceBefore = sender.balance;
    const receiverBalanceBefore = receiver.balance;

    // Debit sender
    sender.balance -= amount;
    sender.availableBalance -= amount;
    await sender.save();

    // Credit receiver
    receiver.balance += amount;
    receiver.availableBalance += amount;
    await receiver.save();

    // Sender Transaction
    const senderTransaction = await Transaction.create({

        transactionId: await generateTransactionId(),

        referenceNumber,

        account: sender._id,

        transactionType: "debit",

        transactionMode: "transfer",

        amount,

        balanceBeforeTransaction: senderBalanceBefore,

        balanceAfterTransaction: sender.balance,

        description,

        performedBy: user.id,

    });

    // Receiver Transaction
    await Transaction.create({

        transactionId: await generateTransactionId(),

        referenceNumber,

        account: receiver._id,

        transactionType: "credit",

        transactionMode: "transfer",

        amount,

        balanceBeforeTransaction: receiverBalanceBefore,

        balanceAfterTransaction: receiver.balance,

        description,

        performedBy: user.id,

    });

    await senderTransaction.populate([
        {
            path: "account",
            select:
                "accountNumber balance availableBalance",
        },
        {
            path: "performedBy",
            select:
                "employeeId firstName lastName role",
        },
    ]);

    return senderTransaction;
};

export const getTransactionHistoryService = async (
    accountNumber
) => {

    const account = await Account.findOne({
        accountNumber,
    });

    if (!account) {
        throw new Error("Account not found.");
    }

    const transactions = await Transaction.find({
        account: account._id,
    })
        .populate({
            path: "account",
            select: "accountNumber"
        })

        .populate({
            path: "performedBy",
            select:
                "employeeId firstName lastName role",
        })
        .sort({ createdAt: -1 });

    return transactions;
};

export const getMiniStatementService = async (
    accountNumber
) => {

    const account = await Account.findOne({
        accountNumber,
    });

    if (!account) {
        throw new Error("Account not found.");
    }

    const transactions = await Transaction.find({
        account: account._id,
    })
        .select(
            "-_id transactionId referenceNumber transactionType transactionMode amount balanceAfterTransaction description createdAt"
        )
        .sort({ createdAt: -1 })
        .limit(10);

    return transactions;

};