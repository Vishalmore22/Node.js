import express from "express";
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    toggleEmployeeStatus
} from "../controllers/employee.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorize("admin"),
    createEmployee
);

router.get(
    "/",
    authMiddleware,
    authorize("admin"),
    getAllEmployees
);

router.get(
    "/:id",
    authMiddleware,
    authorize("admin"),
    getEmployeeById
);

router.put(
    "/:id",
    authMiddleware,
    authorize("admin"),
    updateEmployee
);

router.patch(
    "/:id/status",
    authMiddleware,
    authorize("admin"),
    toggleEmployeeStatus
);

export default router;