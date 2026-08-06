import Faculty from "../models/Faculty.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Faculty
export const registerFaculty = async (req, res) => {
    try {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const department = req.body.department;


        if (!name || !email || !password || !department) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }


        const faculty = await Faculty.findOne({ email: email });

        if (faculty) {
            return res.status(400).json({
                success: false,
                message: "Faculty already exists"
            });
        }


        const hashPassword = await bcrypt.hash(password, 10);


        const newFaculty = new Faculty({
            name: name,
            email: email,
            password: hashPassword,
            department: department
        });

        await newFaculty.save();

        res.status(201).json({
            success: true,
            message: "Faculty Registered Successfully",
            data: newFaculty
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Login Faculty
export const loginFaculty = async (req, res) => {
    try {


        const email = req.body.email;
        const password = req.body.password;


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }


        const faculty = await Faculty.findOne({ email: email });

        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "Faculty not found"
            });
        }


        const checkPassword = await bcrypt.compare(password, faculty.password);

        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong Password"
            });
        }


        const token = jwt.sign(
            {
                id: faculty._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        res.status(200).json({
            success: true,
            message: "Login Successful",
            token: token,
            faculty: {
                id: faculty._id,
                name: faculty.name,
                email: faculty.email,
                department: faculty.department
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};