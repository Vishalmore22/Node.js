import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createCustomer,
  getCustomerById,
  updateCustomer,
} from "../../services/customer.service";

import { getBranches } from "../../services/branch.service";

const CustomerForm = ({ isEdit = false }) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "male",
    phone: "",
    email: "",
    aadhaarNumber: "",
    panNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    branch: "",
  });

  const [branches, setBranches] = useState([]);

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

      if (isEdit) {
        await updateCustomer(id, formData);

        toast.success("Customer updated successfully");
      } else {
        await createCustomer(formData);

        toast.success("Customer created successfully");
      }

      navigate("/customers");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();

    if (isEdit && id) {
      fetchCustomer();
    }
  }, [isEdit, id]);

  const fetchBranches = async () => {
    try {
      const response = await getBranches();
      setBranches(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomer = async () => {
    try {
      setLoading(true);

      const response = await getCustomerById(id);

      const customer = response.data;

      setFormData({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        dateOfBirth: customer.dateOfBirth
          ? customer.dateOfBirth.split("T")[0]
          : "",
        gender: customer.gender || "male",
        phone: customer.phone || "",
        email: customer.email || "",
        aadhaarNumber: customer.aadhaarNumber || "",
        panNumber: customer.panNumber || "",
        address: customer.address || "",
        city: customer.city || "",
        state: customer.state || "",
        pincode: customer.pincode || "",
        branch: customer.branch?._id || customer.branch || "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? "Edit Customer" : "Add Customer"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              className="form-control"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Gender</label>
            <select
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Aadhaar Number</label>
            <input
              type="text"
              name="aadhaarNumber"
              className="form-control"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>PAN Number</label>
            <input
              type="text"
              name="panNumber"
              className="form-control"
              value={formData.panNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-12 mb-3">
            <label>Address</label>
            <textarea
              name="address"
              className="form-control"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              className="form-control"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-12 mb-4">
            <label>Select Branch</label>

            <select
              name="branch"
              className="form-select"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="">Select Branch</option>

              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.branchCode} - {branch.branchName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? "Saving..."
            : isEdit
              ? "Update Customer"
              : "Create Customer"}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
