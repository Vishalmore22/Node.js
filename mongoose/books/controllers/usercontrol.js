import user from "../model/usermodel";
import bcrypt from "bcrypt";

export const adduser = async (req, res) => {
    try {
        const password = req.body.password;
        const hast = await bcrypt.hash(password, 12);
        const resulr = await user.create({ ...req.body, password: hast });
        res.status(201).json({
            status: true,
            message: "User insert successfuly !",
            resulr,
        })
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: "Error occurred while inserting user !",
            err: err.message,
        })
    }
};

export const sighin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({ email })
        if (!User) {
            res.json({
                message: "User is not found !"
            })
        };
        const imatch = await bcrypt.compare(password, User.password)
        if (imatch) {
            res.json({
                status: true,
                message: "Signin Successfuly !",
                User
            }

            );

        } else {
            res.status(400).json({
                message: "incurrect Password !",
            })
        }
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Sign in Faild",
            err: err.message
        })
    }
}