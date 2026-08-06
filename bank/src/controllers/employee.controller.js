import {
    createEmployeeService,
    getAllEmployeesService,
    getEmployeeByIdService,
    updateEmployeeService,
    toggleEmployeeStatusService
} from "../services/employee.service.js";

export const createEmployee = async (req, res) => {
    try {
        const employee = await createEmployeeService(req.body);

        res.status(201).json({
            success: true,
            message: "Employee created successfully.",
            data: employee,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await getAllEmployeesService();

        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getEmployeeById = async (req, res) => {
    try {
        const employee = await getEmployeeByIdService(req.params.id);

        res.status(200).json({
            success: true,
            data: employee,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateEmployee = async (req, res) => {
    try {

        const employee = await updateEmployeeService(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Employee updated successfully.",
            data: employee,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

export const toggleEmployeeStatus = async (req, res) => {

    try {

        const employee = await toggleEmployeeStatusService(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: employee.isActive
                ? "Employee activated successfully."
                : "Employee deactivated successfully.",
            data: employee,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};