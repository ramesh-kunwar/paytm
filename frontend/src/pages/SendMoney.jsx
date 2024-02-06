import Heading from "../components/Heading";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const SendMoney = () => {
  let location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const id = searchParams.get("id");
  const name = searchParams.get("firstName");

  const sendMoney = async () => {
    await axios
      .post(
        "http://localhost:4000/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(() => alert("Transfer successful"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="mt-5">
        <Heading>Send Money</Heading>
      </div>
      <div className="mt-4">
        <h2>
          {" "}
          <span className="bg-primary text-white rounded-circle px-3 py-2">
            {name[0].toUpperCase()}
          </span>{" "}
          {name}
        </h2>
        <hr />
        <h6>Amount (in Rs)</h6>
        <input
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="form-control my-3"
        />
        <button onClick={sendMoney} className="btn btn-success col-12">
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};
export default SendMoney;
