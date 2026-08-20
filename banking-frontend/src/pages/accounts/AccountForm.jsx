import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createAccount } from "../../services/account.service";
import { getCustomers } from "../../services/customer.service";

const AccountForm = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customersLoading, setCustomersLoading] = useState(true);

  const [formData, setFormData] = useState({
    customerId: "",
    accountType: "savings",
    openingBalance: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();

      setCustomers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load customers");
    } finally {
      setCustomersLoading(false);
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
      setLoading(true);

      const response = await createAccount({
        customerId: formData.customerId,
        accountType: formData.accountType,
        openingBalance: Number(formData.openingBalance),
      });

      toast.success(response.message);

      navigate("/accounts");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to open account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Open New Account</h2>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/accounts")}
        >
          Back
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Customer */}

            <div className="mb-3">
              <label className="form-label">Select Customer</label>

              <select
                name="customerId"
                className="form-select"
                value={formData.customerId}
                onChange={handleChange}
                required
                disabled={customersLoading}
              >
                <option value="">
                  {customersLoading
                    ? "Loading customers..."
                    : "Select Customer"}
                </option>

                {customers
                  .filter((customer) => customer.isActive !== false)
                  .map((customer) => (
                    <option key={customer._id} value={customer.customerId}>
                      {customer.customerId} - {customer.firstName}{" "}
                      {customer.lastName} - {customer.phone}
                    </option>
                  ))}
              </select>
            </div>

            {/* Account Type */}

            <div className="mb-3">
              <label className="form-label">Account Type</label>

              <select
                name="accountType"
                className="form-select"
                value={formData.accountType}
                onChange={handleChange}
                required
              >
                <option value="savings">Savings</option>

                <option value="current">Current</option>

                <option value="fixed_deposit">Fixed Deposit</option>
              </select>
            </div>

            {/* Opening Balance */}

            <div className="mb-3">
              <label className="form-label">Opening Balance</label>

              <div className="input-group">
                <span className="input-group-text">₹</span>

                <input
                  type="number"
                  name="openingBalance"
                  className="form-control"
                  value={formData.openingBalance}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Minimum Balance Info */}

            <div className="alert alert-info">
              <strong>Minimum Opening Balance</strong>

              <ul className="mb-0 mt-2">
                <li>Savings: ₹5,000</li>

                <li>Current: ₹5,000</li>

                <li>Fixed Deposit: ₹10,000</li>
              </ul>
            </div>

            {/* Submit */}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Opening Account..." : "Open Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
