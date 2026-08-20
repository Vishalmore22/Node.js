import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { transferMoney } from "../../services/transaction.service";

const Transfer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fromAccountNumber: "",
    toAccountNumber: "",
    amount: "",
    description: "",
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

    const { fromAccountNumber, toAccountNumber, amount } = formData;

    if (fromAccountNumber === toAccountNumber) {
      toast.error("Sender and receiver account cannot be same.");
      return;
    }

    if (Number(amount) <= 0) {
      toast.error("Transfer amount must be greater than zero.");
      return;
    }

    try {
      setLoading(true);

      const response = await transferMoney({
        fromAccountNumber,
        toAccountNumber,
        amount: Number(amount),
        description: formData.description,
      });

      toast.success(response.message);

      navigate(`/transactions/account/${fromAccountNumber}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Fund transfer failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow-sm">
            <div className="card-header">
              <h4 className="mb-0">🔄 Fund Transfer</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Sender */}

                <div className="mb-3">
                  <label className="form-label">From Account</label>

                  <input
                    type="text"
                    name="fromAccountNumber"
                    className="form-control"
                    placeholder="Sender account number"
                    value={formData.fromAccountNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Receiver */}

                <div className="mb-3">
                  <label className="form-label">To Account</label>

                  <input
                    type="text"
                    name="toAccountNumber"
                    className="form-control"
                    placeholder="Receiver account number"
                    value={formData.toAccountNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Amount */}

                <div className="mb-3">
                  <label className="form-label">Transfer Amount</label>

                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    placeholder="Enter amount"
                    min="1"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}

                <div className="mb-3">
                  <label className="form-label">Description</label>

                  <textarea
                    name="description"
                    className="form-control"
                    rows="3"
                    placeholder="Enter transfer description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Buttons */}

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Transfer Money"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/accounts")}
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

export default Transfer;
