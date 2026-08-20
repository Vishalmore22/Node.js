import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employee.service";

import { getBranches } from "../../services/branch.service";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    branch: "",
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [employeeResponse, branchResponse] = await Promise.all([
        getEmployeeById(id),
        getBranches(),
      ]);

      const employee = employeeResponse.data;

      setFormData({
        employeeId: employee.employeeId || "",
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        role: employee.role || "",
        branch: employee.branch?._id || employee.branch || "",
      });

      setBranches(branchResponse.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load employee");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await updateEmployee(id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        branch: formData.branch,
      });

      toast.success(response.message);

      navigate(`/employees/view/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update employee");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header">
              <h4 className="mb-0">Edit Employee</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Employee ID */}

                <div className="mb-3">
                  <label className="form-label">Employee ID</label>

                  <input
                    type="text"
                    className="form-control"
                    value={formData.employeeId}
                    disabled
                  />

                  <small className="text-muted">
                    Employee ID cannot be changed.
                  </small>
                </div>

                {/* First Name */}

                <div className="mb-3">
                  <label className="form-label">First Name</label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
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
                    value={formData.phone}
                    onChange={handleChange}
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
                    <option value="">Select Role</option>

                    <option value="branch_manager">Branch Manager</option>

                    <option value="branch_employee">Branch Employee</option>
                  </select>
                </div>

                {/* Branch */}

                <div className="mb-3">
                  <label className="form-label">Branch</label>

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
                </div>

                {/* Buttons */}

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? "Updating..." : "Update Employee"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(`/employees/view/${id}`)}
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

export default EditEmployee;
