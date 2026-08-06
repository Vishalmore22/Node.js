import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    markAttendance,
    getAttendanceByDate,
    getTodayAttendance

} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", authMiddleware, markAttendance);
router.get("/today", authMiddleware, getTodayAttendance);
router.get("/by-date", authMiddleware, getAttendanceByDate);

export default router;