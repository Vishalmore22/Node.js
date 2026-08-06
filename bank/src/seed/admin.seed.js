import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminExists = await User.findOne({
            email: "admin@bank.com",
        });

        if (adminExists) {
            console.log(" Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        await User.create({
            employeeId: "EMP0001",
            firstName: "System",
            lastName: "Admin",
            email: "admin@bank.com",
            phone: "9999999999",
            password: hashedPassword,
            role: "admin",
        });

        console.log(" Admin Created Successfully");

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);
    }
};

seedAdmin();