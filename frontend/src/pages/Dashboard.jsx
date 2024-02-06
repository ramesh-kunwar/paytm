import { useEffect, useState } from "react";
import Users from "../components/Users";
import axios from "axios";
const Dashboard = () => {
  const [user, setUser] = useState("");
  const [balance, setBalance] = useState();
  console.log(user);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/auth/userDetails", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setUser(res?.data?.user))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBalance(res?.data?.balance?.balance);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="my-4">Payment App</h1>
        <div>
          <h4>
            Hello, {user.firstName}
            <span className="bg-secondary px-2 rounded-full">U</span>
          </h4>
        </div>
      </div>
      <hr />
      <h3>Your Balance: ${balance?.toFixed(2)}</h3>
      <Users />
    </div>
  );
};
export default Dashboard;
