import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getCustomers,
  toggleCustomerStatus,
} from "../../services/customer.service";

const CustomerList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const response = await getCustomers();

      setCustomers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load customers");
    } finally {
      setLoading(false);
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

  //  Search
  const filteredCustomers = customers.filter((customer) => {
    const searchValue = search.toLowerCase();

    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();

    return (
      fullName.includes(searchValue) ||
      customer.customerId?.toLowerCase().includes(searchValue) ||
      customer.phone?.toLowerCase().includes(searchValue) ||
      customer.email?.toLowerCase().includes(searchValue)
    );
  });

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const startIndex = (currentPage - 1) * customersPerPage;

  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + customersPerPage,
  );

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Customers</h2>

        <Link to="/customers/create" className="btn btn-primary">
          + Add Customer
        </Link>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, customer ID, phone or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* No Results */}
          {filteredCustomers.length === 0 ? (
            <div className="alert alert-info">No customers found.</div>
          ) : (
            <div className="table-responsive">
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
                  {paginatedCustomers.map((customer) => (
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
                          className="btn btn-info btn-sm me-1"
                        >
                          View
                        </Link>

                        <Link
                          to={`/customers/edit/${customer._id}`}
                          className="btn btn-warning btn-sm me-1"
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
              {totalPages > 1 && (
                <nav className="mt-3">
                  <ul className="pagination justify-content-center">
                    {/* Previous */}

                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>

                    {/* Page Numbers */}

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}

                    {/* Next */}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerList;
