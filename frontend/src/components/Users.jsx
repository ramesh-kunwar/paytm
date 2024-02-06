import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [firstNameFilter, setFirstNameFilter] = useState("");
  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/api/v1/auth/bulk?firstName=" + firstNameFilter
      )
      .then((res) => {
        setUsers(res?.data?.user);
      });
  }, [firstNameFilter]);

  const sendMoney = (user) => {
    console.log(user);
    navigate(`/sendmoney?id=${user?._id}&firstName=${user?.firstName}`);
  };
  return (
    <div>
      <h3 className="mt-5">Users</h3>

      <div className="mt-4">
        <input
          onChange={(e) => setFirstNameFilter(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Search Users..."
        />
      </div>

      <div className="mt-4">
        {users.map((user) => {
          return (
            <div key={user?._id}>
              <div className="my-3 d-flex justify-content-between align-items-center ">
                <p>
                  {user?.firstName} {user?.lastName}
                </p>
                <button
                  onClick={() => sendMoney(user)}
                  className="btn btn-success"
                >
                  Send Money
                </button>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Users;
