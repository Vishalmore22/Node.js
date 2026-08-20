import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  // Not logged in
  if (!token || !userData) {
    return <Navigate to="/" replace />;
  }

  let user;

  try {
    user = JSON.parse(userData);
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/" replace />;
  }

  // Role restriction
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Admin → dashboard
    if (user.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    // Other roles → customers
    return <Navigate to="/customers" replace />;
  }

  return children;
};

export default ProtectedRoute;
