import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getEmployeeById,
  toggleEmployeeStatus,
} from "../../services/employee.service";

const ViewEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get employee
  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);

      const response = await getEmployeeById(id);

      setEmployee(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load employee");
    } finally {
      setLoading(false);
    }
  };

  // Activate / Deactivate
  const handleStatusToggle = async () => {
    const action = employee.isActive ? "deactivate" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this employee?`,
    );

    if (!confirmed) return;

    try {
      const response = await toggleEmployeeStatus(employee._id);

      toast.success(response.message);

      setEmployee(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to change employee status",
      );
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Employee not found
  if (!employee) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Employee not found.</div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/employees")}
        >
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Employee Details</h2>

          <p className="text-muted mb-0">
            Employee ID: <strong>{employee.employeeId}</strong>
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/employees")}
        >
          Back
        </button>
      </div>

      {/* Employee Information */}

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">Employee Information</h5>
        </div>

        <div className="card-body">
          <div className="row">
            {/* Employee ID */}

            <div className="col-md-6 mb-3">
              <strong>Employee ID</strong>

              <p className="mb-0">{employee.employeeId}</p>
            </div>

            {/* Name */}

            <div className="col-md-6 mb-3">
              <strong>Name</strong>

              <p className="mb-0">
                {employee.firstName} {employee.lastName}
              </p>
            </div>

            {/* Email */}

            <div className="col-md-6 mb-3">
              <strong>Email</strong>

              <p className="mb-0">{employee.email}</p>
            </div>

            {/* Phone */}

            <div className="col-md-6 mb-3">
              <strong>Phone</strong>

              <p className="mb-0">{employee.phone}</p>
            </div>

            {/* Role */}

            <div className="col-md-6 mb-3">
              <strong>Role</strong>

              <p className="mb-0">
                {employee.role?.replace("_", " ").toUpperCase()}
              </p>
            </div>

            {/* Status */}

            <div className="col-md-6 mb-3">
              <strong>Status</strong>

              <p className="mb-0">
                {employee.isActive ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Inactive</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Information */}

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">Branch Information</h5>
        </div>

        <div className="card-body">
          {employee.branch ? (
            <div className="row">
              <div className="col-md-4">
                <strong>Branch Code</strong>

                <p>{employee.branch.branchCode}</p>
              </div>

              <div className="col-md-4">
                <strong>Branch Name</strong>

                <p>{employee.branch.branchName}</p>
              </div>

              <div className="col-md-4">
                <strong>City</strong>

                <p>{employee.branch.city}</p>
              </div>
            </div>
          ) : (
            <p className="text-muted mb-0">No branch assigned.</p>
          )}
        </div>
      </div>

      {/* Employee Actions */}

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">Employee Actions</h5>
        </div>

        <div className="card-body">
          <Link
            to={`/employees/edit/${employee._id}`}
            className="btn btn-warning me-2"
          >
            Edit Employee
          </Link>

          <button
            className={`btn ${
              employee.isActive ? "btn-danger" : "btn-success"
            }`}
            onClick={handleStatusToggle}
          >
            {employee.isActive ? "Deactivate Employee" : "Activate Employee"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
