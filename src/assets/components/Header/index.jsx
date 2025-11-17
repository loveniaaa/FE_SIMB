import React, { useState, useEffect } from "react";
import "../../../App.css"; // Import CSS untuk styling
import { LogoUK1 } from "../../img";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleHeader = () => {
    setIsHeaderOpen(!isHeaderOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const isActive = (path) => location.pathname === path ? "active-link" : "";

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <>
      <header id="header" className={`header d-flex align-items-center fixed-top ${isHeaderOpen ? "open" : ""}`}>
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <Link to="/home" className="logo d-flex align-items-center me-auto">
            <img src={LogoUK1} alt="Logo UK" />
            <h1 className="sitename">Scholarship Management System</h1>
          </Link>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><Link to="/home" className={isActive("/home")}>Home</Link></li>
              <li><a href="#services" className={isActive("#services")}>About</a></li>
              <li><Link to="/mahasiswa/dashboard" className={isActive("/mahasiswa/dashboard")}>Dashboard</Link></li>
              {user && (
                <li>
                  <p className="mb-0 fw-semibold">
                    Hi, {user.user?.first_name || "-"}
                  </p>
                </li>
              )}
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list" onClick={toggleHeader} />
          </nav>

          {isLoggedIn ? (
            <div className="profile-menu position-relative">
              <button className="btn flex-md-shrink-0 profile-button" onClick={toggleProfile}>
                <i className="bi bi-person-circle" style={{ fontSize: "2rem", marginRight: "8px" }}></i>
              </button>
              {isProfileOpen && (
                <div
                  className="profile-dropdown position-absolute bg-white shadow rounded p-2"
                  style={{ top: '100%', right: 0, zIndex: 1000, width: "200px" }}
                >
                  <p className="profile-name mb-2 fw-bold">
                    {user.user?.first_name || "-"}
                  </p>
                  <Link to="/mahasiswa/profile" className="d-block mb-2">Profile</Link>
                  <Link to="/login" onClick={handleLogout} className="d-block text-danger">Logout</Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-getstarted flex-md-shrink-0">
              Log In
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
