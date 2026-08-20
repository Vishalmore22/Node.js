import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProtectedLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />

      <main className="flex-grow-1 p-4 bg-light" style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
