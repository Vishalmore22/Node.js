import express from "express";
import {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    toggleBranchStatus
} from "../controllers/branch.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorize("admin"),
    createBranch
);

router.get(
    "/",
    authMiddleware,
    authorize("admin", "branch_manager", "branch_employee"),
    getAllBranches
);

router.get(
    "/:id",
    authMiddleware,
    authorize("admin", "branch_manager", "branch_employee"),
    getBranchById
);

router.put(
    "/:id",
    authMiddleware,
    authorize("admin"),
    updateBranch
);

router.patch(
    "/:id/status",
    authMiddleware,
    authorize("admin"),
    toggleBranchStatus
);


export default router;