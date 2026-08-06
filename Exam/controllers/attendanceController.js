import Attendance from "../models/Attendance.js";

// Mark Attendance
export const markAttendance = async (req, res) => {
    try {

        const status = req.body.status;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            faculty: req.faculty.id,
            date: today
        });

        if (attendance) {
            return res.status(400).json({
                success: false,
                message: "Attendance already marked today"
            });
        }

        const newAttendance = new Attendance({
            faculty: req.faculty.id,
            date: today,
            status: status
        });

        await newAttendance.save();

        res.status(201).json({
            success: true,
            message: "Attendance Marked Successfully",
            data: newAttendance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Today Attendance
export const getTodayAttendance = async (req, res) => {
    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendanceList = await Attendance.find({
            date: today
        }).populate("faculty", "name email department");

        res.status(200).json({
            success: true,
            count: attendanceList.length,
            attendance: attendanceList
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Attendance By Date
export const getAttendanceByDate = async (req, res) => {
    try {

        const date = req.query.date;

        if (!date) {
            return res.status(400).json({
                success: false,
                message: "Please provide a date"
            });
        }

        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);

        const attendanceList = await Attendance.find({
            date: selectedDate
        }).populate("faculty", "name email department");

        res.status(200).json({
            success: true,
            count: attendanceList.length,
            attendance: attendanceList
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};