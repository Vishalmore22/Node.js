import mongoose, { Types } from "mongoose";
const book_Schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        price: { type: Number, require: true },
        category: { type: String, require: true },
        publiceyear: { type: Number, require: true }
    },
    {
        timestamps: true
    },
);
export default mongoose.model("Book", book_Schema);