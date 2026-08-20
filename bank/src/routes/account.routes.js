import express from "express";

import {
    createAccount,
    getAllAccounts,
    getAccountByNumber,
    toggleAccountStatus,
    closeAccount,
    searchAccounts
} from "../controllers/account.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorize("admin", "branch_manager", "branch_employee"),
    createAccount
);

router.get(
    "/",
    authMiddleware,
    authorize("admin", "branch_manager", "branch_employee"),
    getAllAccounts
);

router.get(
    "/search",
    authMiddleware,
    authorize("admin", "branch_manager", "branch_employee"),
    searchAccounts
);

router.get(
    "/:accountNumber",
    authMiddleware,
    authorize("admin", "branch_manager", "branch_employee"),
    getAccountByNumber
);

router.patch(
    "/:accountNumber/status",
    authMiddleware,
    authorize("admin", "branch_manager", "branch_employee"),
    toggleAccountStatus
);

router.patch(
    "/:accountNumber/close",
    authMiddleware,
    authorize("admin", "branch_manager", "branch_employee"),
    closeAccount
);


export default router;