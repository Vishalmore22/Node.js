import Auth from '../models/auth_model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signinValidation = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ email });
        if (!user) {
            res.status(404).json({
                status: false,
                message: "User not found!"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                status: false,
                message: "Password wrong !"
            })
        }
        next();
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Sing-in Failed",
            err: err.message

        })
    }
}

export const validateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Token Invalid",
            err: err.message
        })

    }
}