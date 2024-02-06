import { useEffect, useState } from "react";
import Users from "../components/Users";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="my-4">Payment App</h1>
        <div>
          <h4>
            Hello, User
            <span className="bg-secondary px-2 rounded-full">U</span>
          </h4>
        </div>
      </div>
      <hr />
      <h3>Your Balance: $5000</h3>
      <Users />
    </div>
  );
};
export default Dashboard;
