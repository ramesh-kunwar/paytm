// import { Link } from "react-router-dom";
import * as React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul className="d-flex gap-3">
        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>
        <li>
          <Link to={"/signin"}>Signin</Link>
        </li>
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
