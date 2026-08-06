import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const loginService = async ({ email, password }) => {

    if (!email || !password) {
        throw new Error("Email and Password are required.");
    }

    const user = await User.findOne({
        email,
        isActive: true,
    }).select("+password");

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new Error("Invalid email or password.");
    }

    const token = generateToken(user);

    return {
        success: true,
        message: "Login successful.",
        token,
        user: {
            id: user._id,
            employeeId: user.employeeId,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
        },
    };
};