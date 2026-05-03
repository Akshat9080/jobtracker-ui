import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const name = localStorage.getItem("name");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="navbar">
        <h2 style={{ color: "white", margin: 0 }}>JobTracker</h2>
        <div>
          <span style={{ color: "white", marginRight: "15px" }}>Welcome {name}</span>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
  )
}

export default Navbar