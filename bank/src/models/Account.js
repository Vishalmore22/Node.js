import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        accountNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

        branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },

        accountType: {
            type: String,
            enum: ["savings", "current", "fixed_deposit"],
            required: true,
        },

        openingBalance: {
            type: Number,
            required: true,
            min: 0,
        },

        // Total Ledger Balance
        balance: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        // Amount customer can use
        availableBalance: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        currency: {
            type: String,
            default: "INR",
        },

        status: {
            type: String,
            enum: [
                "active",
                "inactive",
                "frozen",
                "closed",
            ],
            default: "active",
        },

        openedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        openedDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Account", accountSchema);