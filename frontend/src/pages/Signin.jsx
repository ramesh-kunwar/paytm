import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";

const Signin = () => {
  return (
    <div>
      <div className="container mt-5">
        <Heading>Signin</Heading>
        <SubHeading>Enter your credentials to access your account.</SubHeading>

        <div className="mt-2">
          <label className="fw-bold">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="john@gmail.com"
          />
        </div>
        <div className="mt-2">
          <label className="fw-bold">Password</label>
          <input type="password" className="form-control" placeholder="" />
        </div>

        <div className="mt-2">
          <button className="btn btn-primary col-12">Signup</button>
        </div>

        <div className="mt-3">
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signin;
