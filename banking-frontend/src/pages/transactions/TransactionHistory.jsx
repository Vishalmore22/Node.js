import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getTransactionHistory } from "../../services/transaction.service";

const TransactionHistory = () => {
  const { accountNumber } = useParams();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [accountNumber]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const response = await getTransactionHistory(accountNumber);

      setTransactions(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load transaction history",
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="container mt-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>Transaction History</h2>

          <p className="text-muted mb-0">
            Account: <strong>{accountNumber}</strong>
          </p>
        </div>

        <div className="d-flex gap-2">
          <Link to="/transactions/deposit" className="btn btn-success">
            Deposit
          </Link>

          <Link to="/transactions/withdraw" className="btn btn-danger">
            Withdraw
          </Link>

          <Link to="/transactions/transfer" className="btn btn-primary">
            Transfer
          </Link>
          <Link
            to={`/transactions/account/${accountNumber}/mini-statement`}
            className="btn btn-dark"
          >
            Mini Statement
          </Link>
        </div>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : transactions.length === 0 ? (
        <div className="alert alert-info">
          No transactions found for this account.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Transaction ID</th>
                <th>Reference</th>
                <th>Type</th>
                <th>Mode</th>
                <th>Amount</th>
                <th>Balance After</th>
                <th>Description</th>
                <th>Performed By</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  {/* Transaction ID */}

                  <td>
                    <strong>{transaction.transactionId}</strong>
                  </td>

                  {/* Reference */}

                  <td>{transaction.referenceNumber || "-"}</td>

                  {/* Type */}

                  <td>
                    {transaction.transactionType === "deposit" && (
                      <span className="badge bg-success">Deposit</span>
                    )}

                    {transaction.transactionType === "withdraw" && (
                      <span className="badge bg-danger">Withdraw</span>
                    )}

                    {transaction.transactionType === "debit" && (
                      <span className="badge bg-danger">Debit</span>
                    )}

                    {transaction.transactionType === "credit" && (
                      <span className="badge bg-success">Credit</span>
                    )}
                  </td>

                  {/* Mode */}

                  <td>
                    {transaction.transactionMode
                      ?.replace("_", " ")
                      .toUpperCase()}
                  </td>

                  {/* Amount */}

                  <td>
                    <strong>
                      ₹{Number(transaction.amount).toLocaleString("en-IN")}
                    </strong>
                  </td>

                  {/* Balance */}

                  <td>
                    ₹
                    {Number(transaction.balanceAfterTransaction).toLocaleString(
                      "en-IN",
                    )}
                  </td>

                  {/* Description */}

                  <td>{transaction.description || "-"}</td>

                  {/* Performed By */}

                  <td>
                    {transaction.performedBy ? (
                      <>
                        {transaction.performedBy.firstName}{" "}
                        {transaction.performedBy.lastName}
                        <br />
                        <small className="text-muted">
                          {transaction.performedBy.employeeId}
                        </small>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* Date */}

                  <td>{formatDate(transaction.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
