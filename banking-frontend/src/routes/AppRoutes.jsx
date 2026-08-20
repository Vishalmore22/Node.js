import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

import ProtectedRoute from "../components/ProtectedRoute";
import ProtectedLayout from "../components/ProtectedLayout";

import CustomerList from "../pages/customers/CustomerList";
import CustomerForm from "../pages/customers/CustomerForm";
import EditCustomer from "../pages/customers/EditCustomer";
import ViewCustomer from "../pages/customers/ViewCustomer";

import AccountList from "../pages/accounts/AccountList";
import AccountForm from "../pages/accounts/AccountForm";
import ViewAccount from "../pages/accounts/ViewAccount";

import Deposit from "../pages/transactions/Deposit";
import Withdraw from "../pages/transactions/Withdraw";
import Transfer from "../pages/transactions/Transfer";
import TransactionHistory from "../pages/transactions/TransactionHistory";
import MiniStatement from "../pages/transactions/MiniStatement";

import EmployeeList from "../pages/employees/EmployeeList";
import EmployeeForm from "../pages/employees/EmployeeForm";
import ViewEmployee from "../pages/employees/ViewEmployee";
import EditEmployee from "../pages/employees/EditEmployee";

import BranchList from "../pages/branches/BranchList";
import BranchForm from "../pages/branches/BranchForm";
import ViewBranch from "../pages/branches/ViewBranch";
import EditBranch from "../pages/branches/EditBranch";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard - Admin only */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Customers */}
          <Route path="/customers" element={<CustomerList />} />

          <Route path="/customers/create" element={<CustomerForm />} />

          <Route path="/customers/edit/:id" element={<EditCustomer />} />

          <Route path="/customers/view/:id" element={<ViewCustomer />} />

          {/* Accounts */}
          <Route path="/accounts" element={<AccountList />} />

          <Route path="/accounts/create" element={<AccountForm />} />

          <Route path="/accounts/:accountNumber" element={<ViewAccount />} />

          {/* Transactions */}
          <Route path="/transactions/deposit" element={<Deposit />} />

          <Route path="/transactions/withdraw" element={<Withdraw />} />

          <Route path="/transactions/transfer" element={<Transfer />} />

          <Route
            path="/transactions/account/:accountNumber"
            element={<TransactionHistory />}
          />

          <Route
            path="/transactions/account/:accountNumber/mini-statement"
            element={<MiniStatement />}
          />

          {/* Employees */}

          <Route
            path="/employees"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "branch_manager", "branch_employee"]}
              >
                <EmployeeList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees/create"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EmployeeForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees/view/:id"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "branch_manager", "branch_employee"]}
              >
                <ViewEmployee />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditEmployee />
              </ProtectedRoute>
            }
          />

          {/* Branches */}

          <Route
            path="/branches"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "branch_manager", "branch_employee"]}
              >
                <BranchList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/branches/create"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <BranchForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/branches/view/:id"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "branch_manager", "branch_employee"]}
              >
                <ViewBranch />
              </ProtectedRoute>
            }
          />

          <Route
            path="/branches/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditBranch />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
