import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {

        transactionId: {
            type: String,
            required: true,
            unique: true,
        },

        referenceNumber: {
            type: String,
            default: null,
        },

        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },

        transactionType: {
            type: String,
            enum: [
                "deposit",
                "withdraw",
                "debit",
                "credit",
            ],
            required: true,
        },

        transactionMode: {
            type: String,
            enum: [
                "cash",
                "cheque",
                "upi",
                "neft",
                "rtgs",
                "transfer"
            ],
            default: "cash",
        },

        amount: {
            type: Number,
            required: true,
            min: 1,
        },

        balanceBeforeTransaction: {
            type: Number,
            required: true,
        },

        balanceAfterTransaction: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            trim: true,
        },

        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Transaction",
    transactionSchema
);