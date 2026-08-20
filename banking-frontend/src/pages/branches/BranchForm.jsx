import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createBranch } from "../../services/branch.service";

const BranchForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    branchCode: "",
    branchName: "",
    address: "",
    city: "",
    state: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await createBranch(formData);

      toast.success(response.message);

      navigate("/branches");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create branch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Create Branch</h2>
          <p className="text-muted mb-0">Add a new bank branch</p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/branches")}
        >
          Back
        </button>
      </div>

      {/* Form */}

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Branch Information</h5>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Branch Code */}

                <div className="mb-3">
                  <label className="form-label">Branch Code</label>

                  <input
                    type="text"
                    name="branchCode"
                    className="form-control"
                    placeholder="Example: SUR001"
                    value={formData.branchCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Branch Name */}

                <div className="mb-3">
                  <label className="form-label">Branch Name</label>

                  <input
                    type="text"
                    name="branchName"
                    className="form-control"
                    placeholder="Example: Surat Main Branch"
                    value={formData.branchName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address */}

                <div className="mb-3">
                  <label className="form-label">Address</label>

                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    placeholder="Enter branch address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* City */}

                <div className="mb-3">
                  <label className="form-label">City</label>

                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="Example: Surat"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* State */}

                <div className="mb-3">
                  <label className="form-label">State</label>

                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="Example: Gujarat"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}

                <div className="mb-3">
                  <label className="form-label">Phone</label>

                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Enter branch phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Buttons */}

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Branch"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/branches")}
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

export default BranchForm;
