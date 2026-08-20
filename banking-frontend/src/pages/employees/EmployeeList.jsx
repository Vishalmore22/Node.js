import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getEmployees,
  toggleEmployeeStatus,
} from "../../services/employee.service";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if admin
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Get all employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await getEmployees();

      setEmployees(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  // Activate / Deactivate employee
  const handleStatusToggle = async (id, currentStatus) => {
    const action = currentStatus ? "deactivate" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this employee?`,
    );

    if (!confirmed) return;

    try {
      const response = await toggleEmployeeStatus(id);

      toast.success(response.message);

      fetchEmployees();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to change employee status",
      );
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();

    return (
      fullName.includes(searchText) ||
      employee.employeeId?.toLowerCase().includes(searchText) ||
      employee.phone?.toLowerCase().includes(searchText) ||
      employee.email?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="container mt-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employees</h2>

        {/* Create Employee - Admin Only */}
        {isAdmin && (
          <Link to="/employees/create" className="btn btn-primary">
            + Create Employee
          </Link>
        )}
      </div>

      {/* Search Bar */}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, employee ID, phone or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading */}

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : employees.length === 0 ? (
        <div className="alert alert-info">No employees found.</div>
      ) : filteredEmployees.length === 0 ? (
        <div className="alert alert-warning">
          No employees found matching your search.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  {/* Employee ID */}

                  <td>
                    <strong>{employee.employeeId}</strong>
                  </td>

                  {/* Name */}

                  <td>
                    {employee.firstName} {employee.lastName}
                  </td>

                  {/* Email */}

                  <td>{employee.email}</td>

                  {/* Phone */}

                  <td>{employee.phone}</td>

                  {/* Role */}

                  <td>{employee.role?.replace("_", " ").toUpperCase()}</td>

                  {/* Branch */}

                  <td>
                    {employee.branch ? (
                      <>
                        {employee.branch.branchCode}
                        <br />

                        <small className="text-muted">
                          {employee.branch.branchName}
                        </small>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* Status */}

                  <td>
                    {employee.isActive ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </td>

                  {/* Actions */}

                  <td>
                    {/* Everyone can View */}
                    <Link
                      to={`/employees/view/${employee._id}`}
                      className="btn btn-info btn-sm me-1"
                    >
                      View
                    </Link>

                    {/* Admin Only */}
                    {isAdmin && (
                      <>
                        <Link
                          to={`/employees/edit/${employee._id}`}
                          className="btn btn-warning btn-sm me-1"
                        >
                          Edit
                        </Link>

                        <button
                          className={`btn btn-sm ${
                            employee.isActive ? "btn-danger" : "btn-success"
                          }`}
                          onClick={() =>
                            handleStatusToggle(employee._id, employee.isActive)
                          }
                        >
                          {employee.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
