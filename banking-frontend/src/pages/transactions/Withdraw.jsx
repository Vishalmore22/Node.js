import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { withdrawMoney } from "../../services/transaction.service";

const Withdraw = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountNumber: "",
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

    if (Number(formData.amount) <= 0) {
      toast.error("Withdrawal amount must be greater than zero.");
      return;
    }

    try {
      setLoading(true);

      const response = await withdrawMoney({
        accountNumber: formData.accountNumber,
        amount: Number(formData.amount),
        description: formData.description,
      });

      toast.success(response.message);

      setFormData({
        accountNumber: "",
        amount: "",
        description: "",
      });

      navigate(`/transactions/account/${formData.accountNumber}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Withdrawal failed.");
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
              <h4 className="mb-0">💸 Cash Withdrawal</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Account Number */}

                <div className="mb-3">
                  <label className="form-label">Account Number</label>

                  <input
                    type="text"
                    name="accountNumber"
                    className="form-control"
                    placeholder="Enter account number"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Amount */}

                <div className="mb-3">
                  <label className="form-label">Withdrawal Amount</label>

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
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Buttons */}

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Withdraw Money"}
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

export default Withdraw;
