import Branch from "../models/Branch.js";

export const createBranchService = async (data) => {

    const existingBranch = await Branch.findOne({
        branchCode: data.branchCode,
    });

    if (existingBranch) {
        throw new Error("Branch code already exists.");
    }

    const branch = await Branch.create(data);

    return branch;
};

export const getAllBranchesService = async () => {
    const branches = await Branch.find({
        isActive: true,
    }).sort({
        createdAt: -1,
    });

    return branches;
};

export const getBranchByIdService = async (branchId) => {

    const branch = await Branch.findById(branchId);

    if (!branch) {
        throw new Error("Branch not found.");
    }

    return branch;

};

export const updateBranchService = async (branchId, updateData) => {

    const branch = await Branch.findById(branchId);

    if (!branch) {
        throw new Error("Branch not found.");
    }

    Object.assign(branch, updateData);

    await branch.save();

    return branch;

};

export const toggleBranchStatusService = async (branchId) => {

    const branch = await Branch.findById(branchId);

    if (!branch) {
        throw new Error("Branch not found.");
    }

    branch.isActive = !branch.isActive;

    await branch.save();

    return branch;

};