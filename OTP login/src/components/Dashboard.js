import React from "react";
import { auth } from "./firebase.js";

const Dashboard = () => {
  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <p>Hello user this is your dashboard</p>
      <p>User: {auth.currentUser?.phoneNumber}</p>
    </div>
  );
};

export default Dashboard;
