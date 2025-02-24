import React from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await API.delete("/logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/url_monitors">
          URL Monitor
        </Link>

        <div>
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-light btn-sm rounded-pill px-3" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/signup" ? "active" : ""}`}
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );

};

export default Navbar;
