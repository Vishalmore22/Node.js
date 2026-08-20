import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAccounts,
  searchAccounts,
  toggleAccountStatus,
  closeAccount,
} from "../../services/account.service";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);

      const response = await getAccounts();

      setAccounts(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  // Search
  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      fetchAccounts();
      return;
    }

    try {
      const response = await searchAccounts(value);

      setAccounts(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Search failed");
    }
  };

  // Freeze / Activate
  const handleStatusToggle = async (accountNumber) => {
    const confirmAction = window.confirm(
      "Are you sure you want to change this account status?",
    );

    if (!confirmAction) return;

    try {
      const response = await toggleAccountStatus(accountNumber);

      toast.success(response.message);

      fetchAccounts();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to change account status",
      );
    }
  };

  // Close account
  const handleClose = async (accountNumber) => {
    const confirmAction = window.confirm(
      "Are you sure you want to close this account?",
    );

    if (!confirmAction) return;

    try {
      const response = await closeAccount(accountNumber);

      toast.success(response.message);

      fetchAccounts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to close account");
    }
  };

  return (
    <div className="container mt-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Accounts</h2>

        <Link to="/accounts/create" className="btn btn-primary">
          + Open Account
        </Link>
      </div>

      {/* Search */}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by account number, customer ID or customer name..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Loading */}

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : accounts.length === 0 ? (
        <div className="alert alert-info">No accounts found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Account Number</th>

                <th>Customer</th>

                <th>Account Type</th>

                <th>Branch</th>

                <th>Balance</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {accounts.map((account) => (
                <tr key={account._id}>
                  {/* Account Number */}

                  <td>
                    <strong>{account.accountNumber}</strong>
                  </td>

                  {/* Customer */}

                  <td>
                    {account.customer?.firstName} {account.customer?.lastName}
                    <br />
                    <small className="text-muted">
                      {account.customer?.customerId}
                    </small>
                  </td>

                  {/* Account Type */}

                  <td>{account.accountType.replace("_", " ").toUpperCase()}</td>

                  {/* Branch */}

                  <td>
                    {account.branch?.branchCode}

                    <br />

                    <small className="text-muted">
                      {account.branch?.branchName}
                    </small>
                  </td>

                  {/* Balance */}

                  <td>₹{Number(account.balance).toLocaleString("en-IN")}</td>

                  {/* Status */}

                  <td>
                    {account.status === "active" && (
                      <span className="badge bg-success">Active</span>
                    )}

                    {account.status === "frozen" && (
                      <span className="badge bg-warning text-dark">Frozen</span>
                    )}

                    {account.status === "inactive" && (
                      <span className="badge bg-secondary">Inactive</span>
                    )}

                    {account.status === "closed" && (
                      <span className="badge bg-danger">Closed</span>
                    )}
                  </td>

                  {/* Actions */}

                  <td>
                    <Link
                      to={`/accounts/${account.accountNumber}`}
                      className="btn btn-info btn-sm me-1"
                    >
                      View
                    </Link>

                    {account.status !== "closed" && (
                      <>
                        <button
                          className={`btn btn-sm me-1 ${
                            account.status === "active"
                              ? "btn-warning"
                              : "btn-success"
                          }`}
                          onClick={() =>
                            handleStatusToggle(account.accountNumber)
                          }
                        >
                          {account.status === "active" ? "Freeze" : "Activate"}
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleClose(account.accountNumber)}
                        >
                          Close
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

export default AccountList;
