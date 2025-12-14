import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Home from "./page/Home"
import Navbar from "./components/Navbar"
import Register from "./page/Register";
import Login from "./page/Login";
import type { RootState } from "./app/store";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "./app/auth/authSlice";
import { toast } from "react-toastify";



function App() {

  const location = useLocation();

  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  const user = useSelector((state : RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  function handleLogout(){
    dispatch(logOut());
    navigate("/login");
    toast.success("You have been logged out");
  }

  return (
     <div className="min-h-screen">

        {!hideNavbar && <Navbar user={user} onLogout={handleLogout} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
     </div>
  )
}

export default App
