import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Deshbordhome from "./components/dashboardComponents/Deshbordhome";
import History from "./components/dashboardComponents/History";
import PrivateRoute from "./utils/protectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/home"
          element={<PrivateRoute element={<Deshbordhome />} />}
        />
        <Route
          path="/history"
          element={<PrivateRoute element={<History />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
