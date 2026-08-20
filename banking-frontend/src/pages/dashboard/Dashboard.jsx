import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getDashboardStats } from "../../services/dashboard.service";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  // Account status chart data
  const accountStatusData = [
    {
      name: "Active",
      value: stats.activeAccounts,
      color: "#198754",
    },
    {
      name: "Frozen",
      value: stats.frozenAccounts,
      color: "#ffc107",
    },
    {
      name: "Closed",
      value: stats.closedAccounts,
      color: "#dc3545",
    },
  ];

  // Transaction chart data
  const transactionData = [
    {
      name: "Deposits",
      amount: stats.totalDeposits,
    },
    {
      name: "Withdrawals",
      amount: stats.totalWithdrawals,
    },
    {
      name: "Transfers",
      amount: stats.totalTransfers,
    },
  ];

  return (
    <div className="container-fluid mt-4 px-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Banking Dashboard</h2>
        <p className="text-muted">Overview of your core banking system</p>
      </div>

      {/* ================= CARDS ================= */}

      <div className="row g-4">
        {/* Branches */}
        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Branches</h6>
              <h2 className="fw-bold">{stats.totalBranches}</h2>
            </div>
          </div>
        </div>

        {/* Employees */}
        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Employees</h6>
              <h2 className="fw-bold">{stats.totalEmployees}</h2>
            </div>
          </div>
        </div>

        {/* Customers */}
        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Customers</h6>
              <h2 className="fw-bold">{stats.totalCustomers}</h2>
            </div>
          </div>
        </div>

        {/* Accounts */}
        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Accounts</h6>
              <h2 className="fw-bold">{stats.totalAccounts}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ACCOUNT STATUS ================= */}

      <div className="row g-4 mt-2">
        {/* Active */}
        <div className="col-lg-4 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Active Accounts</h6>

              <h2 className="fw-bold">{stats.activeAccounts}</h2>
            </div>
          </div>
        </div>

        {/* Frozen */}
        <div className="col-lg-4 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Frozen Accounts</h6>

              <h2 className="fw-bold">{stats.frozenAccounts}</h2>
            </div>
          </div>
        </div>

        {/* Closed */}
        <div className="col-lg-4 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Closed Accounts</h6>

              <h2 className="fw-bold">{stats.closedAccounts}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* ================= GRAPHS ================= */}

      <div className="row g-4 mt-2">
        {/* Account Status Pie Chart */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Account Status</h5>

              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={accountStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                    {accountStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Transaction Bar Chart */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Transaction Summary</h5>

              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar dataKey="amount" name="Amount (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TRANSACTION INFORMATION ================= */}

      <div className="row g-4 mt-2 mb-4">
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Deposits</h6>

              <h2 className="fw-bold">₹{stats.totalDeposits}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Withdrawals</h6>

              <h2 className="fw-bold">₹{stats.totalWithdrawals}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Today's Transactions</h6>

              <h2 className="fw-bold">{stats.todayTransactions}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
