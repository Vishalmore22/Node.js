import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getBranchById,
  toggleBranchStatus,
} from "../../services/branch.service";

const ViewBranch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchBranch();
  }, [id]);

  const fetchBranch = async () => {
    try {
      setLoading(true);

      const response = await getBranchById(id);

      setBranch(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load branch");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async () => {
    const action = branch.isActive ? "deactivate" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this branch?`,
    );

    if (!confirmed) return;

    try {
      const response = await toggleBranchStatus(id);

      toast.success(response.message);

      setBranch(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to change branch status",
      );
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

  if (!branch) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Branch not found.</div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/branches")}
        >
          Back to Branches
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Branch Details</h2>

          <p className="text-muted mb-0">Branch #{branch.branchCode}</p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/branches")}
        >
          Back
        </button>
      </div>

      {/* Branch Information */}

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">Branch Information</h5>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Branch Code</strong>
              <p className="mb-0">{branch.branchCode}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Branch Name</strong>
              <p className="mb-0">{branch.branchName}</p>
            </div>

            <div className="col-md-12 mb-3">
              <strong>Address</strong>
              <p className="mb-0">{branch.address}</p>
            </div>

            <div className="col-md-4 mb-3">
              <strong>City</strong>
              <p className="mb-0">{branch.city}</p>
            </div>

            <div className="col-md-4 mb-3">
              <strong>State</strong>
              <p className="mb-0">{branch.state}</p>
            </div>

            <div className="col-md-4 mb-3">
              <strong>Phone</strong>
              <p className="mb-0">{branch.phone}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Status</strong>

              <p className="mb-0">
                {branch.isActive ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Inactive</span>
                )}
              </p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Created At</strong>

              <p className="mb-0">
                {new Date(branch.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}

      {isAdmin && (
        <div className="card shadow-sm">
          <div className="card-header">
            <h5 className="mb-0">Branch Actions</h5>
          </div>

          <div className="card-body">
            <Link
              to={`/branches/edit/${branch._id}`}
              className="btn btn-warning me-2"
            >
              Edit Branch
            </Link>

            <button
              className={`btn ${
                branch.isActive ? "btn-danger" : "btn-success"
              }`}
              onClick={handleStatusToggle}
            >
              {branch.isActive ? "Deactivate Branch" : "Activate Branch"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBranch;
