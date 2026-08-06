import express from "express";
import {
    registerFaculty,
    loginFaculty
} from "../controllers/facultyController.js";

const router = express.Router();

router.post("/register", registerFaculty);
router.post("/login", loginFaculty);

export default router;