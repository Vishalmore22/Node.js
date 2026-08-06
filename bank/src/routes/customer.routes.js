import express from "express";
import {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    toggleCustomerStatus,
    searchCustomers
} from "../controllers/customer.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorize("admin", "branch_manager"),
    createCustomer
);

router.get(
    "/",
    authMiddleware,
    authorize("admin", "branch_manager"),
    getAllCustomers
);

router.get(
    "/search",
    authMiddleware,
    authorize("admin", "branch_manager"),
    searchCustomers
);

router.get(
    "/:id",
    authMiddleware,
    authorize("admin", "branch_manager"),
    getCustomerById
);

router.put(
    "/:id",
    authMiddleware,
    authorize("admin", "branch_manager"),
    updateCustomer
);

router.patch(
    "/:id/status",
    authMiddleware,
    authorize("admin", "branch_manager"),
    toggleCustomerStatus
);
export default router;