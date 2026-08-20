import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();

  const [transactionOpen, setTransactionOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const menuItems = {
    admin: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Customers", path: "/customers" },
      { name: "Accounts", path: "/accounts" },
      { name: "Employees", path: "/employees" },
      { name: "Branches", path: "/branches" },
    ],

    branch_manager: [
      { name: "Customers", path: "/customers" },
      { name: "Accounts", path: "/accounts" },
      { name: "Employees", path: "/employees" },
      { name: "Branches", path: "/branches" },
    ],

    branch_employee: [
      { name: "Customers", path: "/customers" },
      { name: "Accounts", path: "/accounts" },
    ],
  };

  const items = menuItems[role] || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">Core Banking</h4>

      {/* User */}
      <div className="mb-4">
        <div>
          <strong>
            {user?.firstName
              ? `${user.firstName} ${user.lastName || ""}`
              : user?.name || "User"}
          </strong>
        </div>

        <small className="text-secondary">
          {role?.replace("_", " ").toUpperCase()}
        </small>
      </div>

      {/* Menu */}
      <div className="d-flex flex-column gap-2">
        {/* Normal Menu Items */}
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-decoration-none p-2 rounded ${
                isActive ? "bg-primary text-white" : "text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

        {/* Transactions Dropdown */}
        <div className="mt-1">
          <button
            type="button"
            className="btn btn-dark text-white w-100 text-start p-2"
            onClick={() => setTransactionOpen(!transactionOpen)}
          >
            Transactions
            <span className="float-end">{transactionOpen ? "▲" : "▼"}</span>
          </button>

          {transactionOpen && (
            <div className="ms-3">
              <NavLink
                to="/transactions/deposit"
                className={({ isActive }) =>
                  `text-decoration-none p-2 d-block rounded ${
                    isActive ? "bg-primary text-white" : "text-white"
                  }`
                }
              >
                Deposit
              </NavLink>

              <NavLink
                to="/transactions/withdraw"
                className={({ isActive }) =>
                  `text-decoration-none p-2 d-block rounded ${
                    isActive ? "bg-primary text-white" : "text-white"
                  }`
                }
              >
                Withdraw
              </NavLink>

              <NavLink
                to="/transactions/transfer"
                className={({ isActive }) =>
                  `text-decoration-none p-2 d-block rounded ${
                    isActive ? "bg-primary text-white" : "text-white"
                  }`
                }
              >
                Transfer
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <hr />

      {/* Logout */}
      <button className="btn btn-danger w-100" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
