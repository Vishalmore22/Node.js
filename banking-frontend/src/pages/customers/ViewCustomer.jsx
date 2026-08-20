import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCustomerById } from "../../services/customer.service";

const ViewCustomer = () => {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await getCustomerById(id);

      setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!customer) {
    return <h4 className="text-center mt-5">Loading...</h4>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between">
          <h3>Customer Details</h3>

          <Link to="/customers" className="btn btn-secondary">
            Back
          </Link>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Customer ID</strong>
              <p>{customer.customerId}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Name</strong>
              <p>
                {customer.firstName} {customer.lastName}
              </p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Email</strong>
              <p>{customer.email}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Phone</strong>
              <p>{customer.phone}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Gender</strong>
              <p>{customer.gender}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Date of Birth</strong>
              <p>{customer.dateOfBirth.split("T")[0]}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Aadhaar</strong>
              <p>{customer.aadhaarNumber}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>PAN</strong>
              <p>{customer.panNumber}</p>
            </div>

            <div className="col-md-12 mb-3">
              <strong>Address</strong>
              <p>{customer.address}</p>
            </div>

            <div className="col-md-4 mb-3">
              <strong>City</strong>
              <p>{customer.city}</p>
            </div>

            <div className="col-md-4 mb-3">
              <strong>State</strong>
              <p>{customer.state}</p>
            </div>

            <div className="col-md-4 mb-3">
              <strong>Pincode</strong>
              <p>{customer.pincode}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Branch</strong>
              <p>{customer.branch.branchName}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Status</strong>

              <p>
                {customer.isActive ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Inactive</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
