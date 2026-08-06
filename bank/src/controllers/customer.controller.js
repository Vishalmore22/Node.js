import {
    createCustomerService,
    getAllCustomersService,
    getCustomerByIdService,
    updateCustomerService,
    toggleCustomerStatusService,
    searchCustomersService
} from "../services/customer.service.js";

export const createCustomer = async (req, res) => {
    try {
        const customer = await createCustomerService(
            req.body,
            req.user.id
        );

        res.status(201).json({
            success: true,
            message: "Customer created successfully.",
            data: customer,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllCustomers = async (req, res) => {
    try {

        const customers = await getAllCustomersService();

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getCustomerById = async (req, res) => {

    try {

        const customer = await getCustomerByIdService(
            req.params.id
        );

        res.status(200).json({
            success: true,
            data: customer,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }

};

export const updateCustomer = async (req, res) => {
    try {

        const customer = await updateCustomerService(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Customer updated successfully.",
            data: customer,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

export const toggleCustomerStatus = async (req, res) => {

    try {

        const customer = await toggleCustomerStatusService(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: customer.isActive
                ? "Customer activated successfully."
                : "Customer deactivated successfully.",
            data: customer,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

export const searchCustomers = async (req, res) => {

    try {

        const { search } = req.query;

        if (!search) {
            return res.status(400).json({
                success: false,
                message: "Search keyword is required.",
            });
        }

        const customers =
            await searchCustomersService(search);

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};