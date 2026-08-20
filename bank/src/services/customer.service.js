import Customer from "../models/Customer.js";
import Branch from "../models/Branch.js";
import Account from "../models/Account.js";

export const createCustomerService = async (customerData, userId) => {

    const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phone,
        email,
        aadhaarNumber,
        panNumber,
        address,
        city,
        state,
        pincode,
        branch,
    } = customerData;

    // Duplicate Phone
    if (await Customer.findOne({ phone })) {
        throw new Error("Phone number already exists.");
    }

    // Duplicate Aadhaar
    if (await Customer.findOne({ aadhaarNumber })) {
        throw new Error("Aadhaar number already exists.");
    }

    // Duplicate PAN
    if (await Customer.findOne({ panNumber })) {
        throw new Error("PAN number already exists.");
    }

    // Check Branch
    const branchExists = await Branch.findById(branch);

    if (!branchExists) {
        throw new Error("Branch not found.");
    }

    // Generate Customer ID
    const lastCustomer = await Customer.findOne()
        .sort({ createdAt: -1 })
        .select("customerId");

    let nextNumber = 1;

    if (lastCustomer?.customerId) {
        const lastNumber = parseInt(
            lastCustomer.customerId.replace("CUS", "")
        );

        nextNumber = lastNumber + 1;
    }

    const customerId = `CUS${String(nextNumber).padStart(4, "0")}`;

    const customer = await Customer.create({
        customerId,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phone,
        email,
        aadhaarNumber,
        panNumber,
        address,
        city,
        state,
        pincode,
        branch,
        createdBy: userId,
    });

    return await customer.populate([
        {
            path: "branch",
            select: "branchCode branchName city",
        },
        {
            path: "createdBy",
            select: "employeeId firstName lastName role",
        },
    ]);
};

export const getAllCustomersService = async () => {
    return await Customer.find()
        .populate("branch", "branchCode branchName city")
        .populate("createdBy", "employeeId firstName lastName role")
        .sort({ createdAt: -1 });
};

export const getCustomerByIdService = async (customerId) => {

    const customer = await Customer.findById(customerId)
        .populate("branch", "branchCode branchName city")
        .populate(
            "createdBy",
            "employeeId firstName lastName role"
        );

    if (!customer) {
        throw new Error("Customer not found.");
    }

    return customer;
};

export const updateCustomerService = async (
    customerId,
    updateData
) => {

    const customer = await Customer.findById(customerId);

    if (!customer) {
        throw new Error("Customer not found.");
    }

    const oldBranch = customer.branch;

    // Check duplicate phone
    if (
        updateData.phone &&
        updateData.phone !== customer.phone
    ) {
        const phoneExists = await Customer.findOne({
            phone: updateData.phone,
        });

        if (phoneExists) {
            throw new Error("Phone number already exists.");
        }
    }

    // Check duplicate Aadhaar
    if (
        updateData.aadhaarNumber &&
        updateData.aadhaarNumber !== customer.aadhaarNumber
    ) {
        const aadhaarExists = await Customer.findOne({
            aadhaarNumber: updateData.aadhaarNumber,
        });

        if (aadhaarExists) {
            throw new Error("Aadhaar number already exists.");
        }
    }

    // Check duplicate PAN
    if (
        updateData.panNumber &&
        updateData.panNumber !== customer.panNumber
    ) {
        const panExists = await Customer.findOne({
            panNumber: updateData.panNumber,
        });

        if (panExists) {
            throw new Error("PAN number already exists.");
        }
    }

    // Allowed fields only
    const allowedFields = [
        "firstName",
        "lastName",
        "dateOfBirth",
        "gender",
        "phone",
        "email",
        "aadhaarNumber",
        "panNumber",
        "address",
        "city",
        "state",
        "pincode",
        "branch"
    ];

    allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
            customer[field] = updateData[field];
        }
    });

    await customer.save();

    // If customer's branch changed,
    // update all accounts belonging to this customer
    if (
        updateData.branch &&
        updateData.branch.toString() !== oldBranch.toString()
    ) {
        await Account.updateMany(
            {
                customer: customer._id,
                status: { $ne: "closed" },
            },
            {
                $set: {
                    branch: customer.branch,
                },
            }
        );
    }

    return await customer.populate([
        {
            path: "branch",
            select: "branchCode branchName city",
        },
        {
            path: "createdBy",
            select: "employeeId firstName lastName role",
        },
    ]);
};

export const toggleCustomerStatusService = async (customerId) => {

    const customer = await Customer.findById(customerId);

    if (!customer) {
        throw new Error("Customer not found.");
    }

    customer.isActive = !customer.isActive;

    await customer.save();

    return await customer.populate([
        {
            path: "branch",
            select: "branchCode branchName city",
        },
        {
            path: "createdBy",
            select: "employeeId firstName lastName role",
        },
    ]);
};

export const searchCustomersService = async (search) => {

    const customers = await Customer.find({
        $or: [
            { customerId: { $regex: search, $options: "i" } },
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { aadhaarNumber: { $regex: search, $options: "i" } },
            { panNumber: { $regex: search, $options: "i" } },
        ],
    })
        .populate("branch", "branchCode branchName city")
        .populate(
            "createdBy",
            "employeeId firstName lastName role"
        )
        .sort({ createdAt: -1 });

    return customers;
};