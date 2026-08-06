import { loginService } from "../services/auth.service.js";

export const login = async (req, res) => {
    try {

        const result = await loginService(req.body);

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};