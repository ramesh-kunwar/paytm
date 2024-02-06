import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="">
      <Navbar />
      <div className="bg-secondary"></div>
    </div>
  );
}

export default App;
