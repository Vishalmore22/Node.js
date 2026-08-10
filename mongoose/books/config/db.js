import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("    /book");
        console.log("MongoDB Server Connnect !");
    } catch (err) {
        console.log("MongoDB is not connect !", err);
    }
}
export default connectDB;