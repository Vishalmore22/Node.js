import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getBranches, toggleBranchStatus } from "../../services/branch.service";

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);

      const response = await getBranches();

      setBranches(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load branches");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const action = currentStatus ? "deactivate" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this branch?`,
    );

    if (!confirmed) return;

    try {
      const response = await toggleBranchStatus(id);

      toast.success(response.message);

      fetchBranches();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to change branch status",
      );
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Branches</h2>

        {/* Only Admin can create branch */}
        {isAdmin && (
          <Link to="/branches/create" className="btn btn-primary">
            + Create Branch
          </Link>
        )}
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : branches.length === 0 ? (
        <div className="alert alert-info">No active branches found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Branch Code</th>
                <th>Branch Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {branches.map((branch) => (
                <tr key={branch._id}>
                  <td>
                    <strong>{branch.branchCode}</strong>
                  </td>

                  <td>{branch.branchName}</td>

                  <td>{branch.address}</td>

                  <td>{branch.city}</td>

                  <td>{branch.state}</td>

                  <td>{branch.phone}</td>

                  <td>
                    {branch.isActive ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </td>

                  <td>
                    {/* Everyone can view */}
                    <Link
                      to={`/branches/view/${branch._id}`}
                      className="btn btn-info btn-sm me-1"
                    >
                      View
                    </Link>

                    {/* Only Admin can edit */}
                    {isAdmin && (
                      <Link
                        to={`/branches/edit/${branch._id}`}
                        className="btn btn-warning btn-sm me-1"
                      >
                        Edit
                      </Link>
                    )}

                    {/* Only Admin can activate/deactivate */}
                    {isAdmin && (
                      <button
                        className={`btn btn-sm ${
                          branch.isActive ? "btn-danger" : "btn-success"
                        }`}
                        onClick={() =>
                          handleStatusToggle(branch._id, branch.isActive)
                        }
                      >
                        {branch.isActive ? "Deactivate" : "Activate"}
                      </button>
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

export default BranchList;
