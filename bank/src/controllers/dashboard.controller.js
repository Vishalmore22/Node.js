import { getDashboardStatsService } from "../services/dashboard.service.js";

export const getDashboardStats = async (req, res) => {

    try {

        const stats = await getDashboardStatsService();

        res.status(200).json({
            success: true,
            data: stats,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};