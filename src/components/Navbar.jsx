import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  navigate("/login");
  window.location.reload();
};

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark" aria-hidden="true">&lt;/&gt;</span>
        <span className="logo">Reviewly</span>
      </Link>

      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span><span></span><span></span>
      </button>

      <div className={`nav-right ${isMenuOpen ? "is-open" : ""}`}>

        <Link className="nav-btn" to="/">
          Home
        </Link>

        {token ? (
          <>
            <Link className="nav-btn" to="/dashboard">
              Dashboard
            </Link>

            <Link className="nav-btn" to="/history">
              History
            </Link>

            <span className="profile">
              <span className="profile-avatar" aria-hidden="true">{name?.charAt(0).toUpperCase()}</span>
              <span>{name}</span>
            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-btn" to="/login">
              Login
            </Link>

            <Link
              className="nav-btn register-btn"
              to="/register"
            >
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;