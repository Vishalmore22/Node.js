import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCustomers,
  toggleCustomerStatus,
} from "../../services/customer.service";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusToggle = async (id) => {
    const confirmAction = window.confirm(
      "Are you sure you want to change this customer's status?",
    );

    if (!confirmAction) return;

    try {
      const response = await toggleCustomerStatus(id);

      toast.success(response.message);

      fetchCustomers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Customers</h2>

        <Link to="/customers/create" className="btn btn-primary">
          + Add Customer
        </Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>City</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.customerId}</td>

              <td>
                {customer.firstName} {customer.lastName}
              </td>

              <td>{customer.phone}</td>

              <td>{customer.email}</td>

              <td>{customer.city}</td>

              <td>
                {customer.isActive ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Inactive</span>
                )}
              </td>
              <td>
                <Link
                  to={`/customers/view/${customer._id}`}
                  className="btn btn-info btn-sm me-2"
                >
                  View
                </Link>

                <Link
                  to={`/customers/edit/${customer._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>

                <button
                  className={`btn btn-sm ${
                    customer.isActive ? "btn-danger" : "btn-success"
                  }`}
                  onClick={() => handleStatusToggle(customer._id)}
                >
                  {customer.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
