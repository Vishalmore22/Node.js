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
    authorize("admin", "branch_manager"),
    createAccount
);

router.get(
    "/",
    authMiddleware,
    authorize("admin", "branch_manager"),
    getAllAccounts
);

router.get(
    "/search",
    authMiddleware,
    authorize("admin", "branch_manager"),
    searchAccounts
);

router.get(
    "/:accountNumber",
    authMiddleware,
    authorize("admin", "branch_manager"),
    getAccountByNumber
);

router.patch(
    "/:accountNumber/status",
    authMiddleware,
    authorize("admin", "branch_manager"),
    toggleAccountStatus
);

router.patch(
    "/:accountNumber/close",
    authMiddleware,
    authorize("admin", "branch_manager"),
    closeAccount
);


export default router;