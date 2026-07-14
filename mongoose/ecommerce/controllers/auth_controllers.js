import Auth from "../models/auth_model.js";
import bcrypt from 'bcrypt';//password hassing 
import jwt from 'jsonwebtoken'//for token
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 12);//password hassing 
        const result = await Auth.create({ name, email, password: hashed })
        res.status(200).json({
            status: true,
            message: "Sing-up successfully",
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Sing-up Failed",
            err: err.message
        })
    }
}
export const signin = async (req, res) => {
    try {
        const token = jwt.sign({ email: req.body.email }, "!@#$%^&*()", {
            expiresIn: '1h',
        });
        res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 1 })
        res.status(200).json({
            status: true,
            message: "Signin successfully! ",
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Sing-in Failed",
            err: err.message
        })
    }
}