import express from "express";

import {
    deposit,
    withdraw,
    transfer,
    getTransactionHistory,
    getMiniStatement
} from "../controllers/transaction.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/deposit",
    authMiddleware,
    authorize(
        "admin",
        "branch_manager",
        "branch_employee"
    ),
    deposit
);

router.post(
    "/withdraw",
    authMiddleware,
    authorize(
        "admin",
        "branch_manager",
        "branch_employee"
    ),
    withdraw
);

router.post(
    "/transfer",
    authMiddleware,
    authorize(
        "admin",
        "branch_manager",
        "branch_employee"
    ),
    transfer
);

router.get(
    "/account/:accountNumber/mini-statement",
    authMiddleware,
    authorize(
        "admin",
        "branch_manager",
        "branch_employee"
    ),
    getMiniStatement
);

router.get(
    "/account/:accountNumber",
    authMiddleware,
    authorize(
        "admin",
        "branch_manager",
        "branch_employee"
    ),
    getTransactionHistory
);
export default router;