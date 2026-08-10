import { useEffect, useState } from "react";
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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h6>Total Branches</h6>
              <h2>{stats.totalBranches}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h6>Total Employees</h6>
              <h2>{stats.totalEmployees}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h6>Total Customers</h6>
              <h2>{stats.totalCustomers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h6>Total Accounts</h6>
              <h2>{stats.totalAccounts}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h6>Active Accounts</h6>
              <h2>{stats.activeAccounts}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h6>Inactive Accounts</h6>
              <h2>{stats.inactiveAccounts}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h6>Total Deposits</h6>
              <h2>₹{stats.totalDeposits}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h6>Total Withdrawals</h6>
              <h2>₹{stats.totalWithdrawals}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h6>Total Transfers</h6>
              <h2>₹{stats.totalTransfers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h6>Today's Transactions</h6>
              <h2>{stats.todayTransactions}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
