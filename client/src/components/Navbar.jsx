import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon">♻️</span> ReLoop
        </Link>

        <button 
          className={`mobile-menu-btn ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/jobs" onClick={closeMenu}>Jobs</NavLink>
          <NavLink to="/businesses" onClick={closeMenu}>Businesses</NavLink>
          <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
          <NavLink to="/collaborate" onClick={closeMenu}>Collaborate</NavLink>
          <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
          <NavLink to="/login" className="nav-login-btn" onClick={closeMenu}>Login</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;