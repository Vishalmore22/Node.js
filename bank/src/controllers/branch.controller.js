import {
    createBranchService,
    getAllBranchesService,
    getBranchByIdService,
    updateBranchService,
    toggleBranchStatusService
} from "../services/branch.service.js";

export const createBranch = async (req, res) => {
    try {
        const branch = await createBranchService(req.body);

        res.status(201).json({
            success: true,
            message: "Branch created successfully.",
            data: branch,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

export const getAllBranches = async (req, res) => {
    try {

        const branches = await getAllBranchesService();

        res.status(200).json({
            success: true,
            count: branches.length,
            data: branches,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getBranchById = async (req, res) => {

    try {

        const branch = await getBranchByIdService(req.params.id);

        res.status(200).json({
            success: true,
            data: branch
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

export const updateBranch = async (req, res) => {

    try {

        const branch = await updateBranchService(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Branch updated successfully.",
            data: branch
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const toggleBranchStatus = async (req, res) => {

    try {

        const branch = await toggleBranchStatusService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Branch status updated successfully.",
            data: branch
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};