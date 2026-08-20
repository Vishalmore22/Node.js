import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getBranchById, updateBranch } from "../../services/branch.service";

const EditBranch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    branchCode: "",
    branchName: "",
    address: "",
    city: "",
    state: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Get branch
  useEffect(() => {
    fetchBranch();
  }, [id]);

  const fetchBranch = async () => {
    try {
      setLoading(true);

      const response = await getBranchById(id);

      const branch = response.data;

      setFormData({
        branchCode: branch.branchCode || "",
        branchName: branch.branchName || "",
        address: branch.address || "",
        city: branch.city || "",
        state: branch.state || "",
        phone: branch.phone || "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load branch");
    } finally {
      setLoading(false);
    }
  };

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update branch
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await updateBranch(id, formData);

      toast.success(response.message);

      navigate(`/branches/view/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update branch");
    } finally {
      setSaving(false);
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

  return (
    <div className="container mt-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Edit Branch</h2>

          <p className="text-muted mb-0">Update branch information</p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/branches/view/${id}`)}
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
                    disabled={saving}
                  >
                    {saving ? "Updating..." : "Update Branch"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(`/branches/view/${id}`)}
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

export default EditBranch;
