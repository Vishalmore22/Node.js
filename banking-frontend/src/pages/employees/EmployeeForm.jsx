import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createEmployee } from "../../services/employee.service";
import { getBranches } from "../../services/branch.service";

const EmployeeForm = () => {
  const navigate = useNavigate();

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [branchLoading, setBranchLoading] = useState(true);

  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "branch_employee",
    branch: "",
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  // Get branches
  const fetchBranches = async () => {
    try {
      setBranchLoading(true);

      const response = await getBranches();

      setBranches(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load branches");
    } finally {
      setBranchLoading(false);
    }
  };

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await createEmployee(formData);

      toast.success(response.message);

      navigate("/employees");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header">
              <h4 className="mb-0">Create Employee</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Employee ID */}

                <div className="mb-3">
                  <label className="form-label">Employee ID</label>

                  <input
                    type="text"
                    name="employeeId"
                    className="form-control"
                    placeholder="Ex-EMP0001"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* First Name */}

                <div className="mb-3">
                  <label className="form-label">First Name</label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Last Name */}

                <div className="mb-3">
                  <label className="form-label">Last Name</label>

                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}

                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="employee@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}

                <div className="mb-3">
                  <label className="form-label">Phone</label>

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}

                <div className="mb-3">
                  <label className="form-label">Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="6"
                    required
                  />
                </div>

                {/* Role */}

                <div className="mb-3">
                  <label className="form-label">Role</label>

                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="branch_employee">Branch Employee</option>

                    <option value="branch_manager">Branch Manager</option>
                  </select>
                </div>

                {/* Branch */}

                <div className="mb-3">
                  <label className="form-label">Branch</label>

                  {branchLoading ? (
                    <select className="form-select" disabled>
                      <option>Loading branches...</option>
                    </select>
                  ) : (
                    <select
                      name="branch"
                      className="form-select"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Branch</option>

                      {branches.map((branch) => (
                        <option key={branch._id} value={branch._id}>
                          {branch.branchCode} - {branch.branchName}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Buttons */}

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || branchLoading}
                  >
                    {loading ? "Creating..." : "Create Employee"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/employees")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
