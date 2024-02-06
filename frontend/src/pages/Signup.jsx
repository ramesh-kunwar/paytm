import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    await axios
      .post("http://localhost:4000/api/v1/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((res) => {
        alert("User registered successfully");
        localStorage.setItem("token", res?.data?.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.message);
      });
  };
  return (
    <div>
      <div className="container mt-5">
        <Heading>Signup</Heading>
        <SubHeading>Enter your information to create an account.</SubHeading>

        <div className="mt-2">
          <label className="fw-bold">First Name</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="John"
          />
        </div>
        <div className="mt-2">
          <label className="fw-bold">Last Name</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Doe"
          />
        </div>
        <div className="mt-2">
          <label className="fw-bold">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="john@gmail.com"
          />
        </div>
        <div className="mt-2">
          <label className="fw-bold">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder=""
          />
        </div>

        <div className="mt-2">
          <button onClick={registerUser} className="btn btn-primary col-12">
            Signup
          </button>
        </div>
        <div className="mt-3">
          <p>
            Already have an account ? <Link to="/signin">Signin</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
