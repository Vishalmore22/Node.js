import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
    {
        branchCode: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },

        branchName: {
            type: String,
            required: true,
            trim: true,
        },

        address: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;