import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAccountByNumber,
  toggleAccountStatus,
  closeAccount,
} from "../../services/account.service";

const ViewAccount = () => {
  const { accountNumber } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccount();
  }, [accountNumber]);

  const fetchAccount = async () => {
    try {
      setLoading(true);

      const response = await getAccountByNumber(accountNumber);

      setAccount(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load account");
    } finally {
      setLoading(false);
    }
  };
  const handleStatusToggle = async () => {
    const action = account.status === "active" ? "freeze" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this account?`,
    );

    if (!confirmed) return;

    try {
      const response = await toggleAccountStatus(account.accountNumber);

      toast.success(response.message);

      setAccount(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to change account status",
      );
    }
  };

  const handleCloseAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to close this account?",
    );

    if (!confirmed) return;

    try {
      const response = await closeAccount(account.accountNumber);

      toast.success(response.message);

      setAccount(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to close account");
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

  if (!account) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Account not found.</div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/accounts")}
        >
          Back to Accounts
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Account Details</h2>

          <p className="text-muted mb-0">Account #{account.accountNumber}</p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/accounts")}
        >
          Back
        </button>
      </div>

      {/* Account Summary */}

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted">Account Number</h6>

              <h4>{account.accountNumber}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted">Current Balance</h6>

              <h4>₹{Number(account.balance).toLocaleString("en-IN")}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted">Available Balance</h6>

              <h4>
                ₹{Number(account.availableBalance).toLocaleString("en-IN")}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">Account Information</h5>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Account Type</strong>

              <p className="mb-0">
                {account.accountType?.replace("_", " ").toUpperCase()}
              </p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Currency</strong>

              <p className="mb-0">{account.currency}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Opening Balance</strong>

              <p className="mb-0">
                ₹{Number(account.openingBalance).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Status</strong>

              <p className="mb-0">
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
              </p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Opened Date</strong>

              <p className="mb-0">
                {new Date(account.openedDate).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">Account Actions</h5>
        </div>

        <div className="card-body">
          {account.status !== "closed" && (
            <>
              <button
                className={`btn me-2 ${
                  account.status === "active" ? "btn-warning" : "btn-success"
                }`}
                onClick={handleStatusToggle}
              >
                {account.status === "active"
                  ? "Freeze Account"
                  : "Activate Account"}
              </button>

              <button className="btn btn-danger" onClick={handleCloseAccount}>
                Close Account
              </button>
              <div className="mt-3">
                <button
                  className="btn btn-success me-2"
                  onClick={() => navigate("/transactions/deposit")}
                  disabled={account.status !== "active"}
                >
                  💰 Deposit
                </button>

                <button
                  className="btn btn-danger me-2"
                  onClick={() => navigate("/transactions/withdraw")}
                  disabled={account.status !== "active"}
                >
                  💸 Withdraw
                </button>

                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate("/transactions/transfer")}
                  disabled={account.status !== "active"}
                >
                  🔄 Transfer
                </button>

                <button
                  className="btn btn-dark me-2"
                  onClick={() =>
                    navigate(`/transactions/account/${account.accountNumber}`)
                  }
                >
                  📋 Transaction History
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    navigate(
                      `/transactions/account/${account.accountNumber}/mini-statement`,
                    )
                  }
                >
                  🧾 Mini Statement
                </button>
              </div>
            </>
          )}

          {account.status === "closed" && (
            <div className="alert alert-danger mb-0">
              This account is closed and cannot be modified.
            </div>
          )}
        </div>
      </div>

      {/* Customer Information */}

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">Customer Information</h5>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Customer ID</strong>

              <p className="mb-0">{account.customer?.customerId}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Customer Name</strong>

              <p className="mb-0">
                {account.customer?.firstName} {account.customer?.lastName}
              </p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Phone</strong>

              <p className="mb-0">{account.customer?.phone}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Email</strong>

              <p className="mb-0">{account.customer?.email || "N/A"}</p>
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
          <div className="row">
            <div className="col-md-4">
              <strong>Branch Code</strong>

              <p>{account.branch?.branchCode}</p>
            </div>

            <div className="col-md-4">
              <strong>Branch Name</strong>

              <p>{account.branch?.branchName}</p>
            </div>

            <div className="col-md-4">
              <strong>City</strong>

              <p>{account.branch?.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Opened By */}

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">Account Opened By</h5>
        </div>

        <div className="card-body">
          <p className="mb-1">
            <strong>Employee ID:</strong> {account.openedBy?.employeeId}
          </p>

          <p className="mb-1">
            <strong>Name:</strong> {account.openedBy?.firstName}{" "}
            {account.openedBy?.lastName}
          </p>

          <p className="mb-0">
            <strong>Role:</strong> {account.openedBy?.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewAccount;
