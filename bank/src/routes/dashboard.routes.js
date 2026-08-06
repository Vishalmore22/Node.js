import express from "express";

import { getDashboardStats } from "../controllers/dashboard.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
    "/stats",
    authMiddleware,
    authorize("admin"),
    getDashboardStats
);

export default router;