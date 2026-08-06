import bcrypt from "bcrypt";
import User from "../models/User.js";
import Branch from "../models/Branch.js";

export const createEmployeeService = async (employeeData) => {
    const {
        employeeId,
        firstName,
        lastName,
        email,
        phone,
        password,
        role,
        branch,
    } = employeeData;

    // Check Employee ID
    const employeeExists = await User.findOne({ employeeId });

    if (employeeExists) {
        throw new Error("Employee ID already exists.");
    }

    // Check Email
    const emailExists = await User.findOne({ email });

    if (emailExists) {
        throw new Error("Email already exists.");
    }

    // Check Phone
    const phoneExists = await User.findOne({ phone });

    if (phoneExists) {
        throw new Error("Phone number already exists.");
    }

    // Check Branch
    const branchExists = await Branch.findById(branch);

    if (!branchExists) {
        throw new Error("Branch not found.");
    }

    // Validate Role
    if (!["branch_manager", "branch_employee"].includes(role)) {
        throw new Error("Invalid employee role.");
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Employee
    const employee = await User.create({
        employeeId,
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role,
        branch,
    });

    return {
        id: employee._id,
        employeeId: employee.employeeId,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        role: employee.role,
        branch: employee.branch,
        isActive: employee.isActive,
    };
};

export const getAllEmployeesService = async () => {
    return await User.find({
        role: {
            $in: ["branch_manager", "branch_employee"],
        },
    })
        .populate("branch", "branchCode branchName city")
        .select("-password")
        .sort({ createdAt: -1 });
};

export const getEmployeeByIdService = async (employeeId) => {
    const employee = await User.findById(employeeId)
        .populate("branch", "branchCode branchName city")
        .select("-password");

    if (!employee) {
        throw new Error("Employee not found.");
    }

    return employee;
};

export const updateEmployeeService = async (
    employeeId,
    updateData
) => {

    const employee = await User.findOne({
        _id: employeeId,
        role: {
            $in: ["branch_manager", "branch_employee"],
        },
    });

    if (!employee) {
        throw new Error("Employee not found.");
    }

    // Prevent changing to admin
    if (
        updateData.role &&
        !["branch_manager", "branch_employee"].includes(updateData.role)
    ) {
        throw new Error("Invalid role.");
    }

    // Update password if provided
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    Object.assign(employee, updateData);

    await employee.save();

    return employee;
};

export const toggleEmployeeStatusService = async (employeeId) => {

    const employee = await User.findOne({
        _id: employeeId,
        role: {
            $in: ["branch_manager", "branch_employee"],
        },
    });

    if (!employee) {
        throw new Error("Employee not found.");
    }

    employee.isActive = !employee.isActive;

    await employee.save();

    return employee;
};