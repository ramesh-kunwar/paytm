import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Link to="/signup">Signup</Link>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
