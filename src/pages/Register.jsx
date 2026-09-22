import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      navigate("/login");

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);

    }
  };

  return (

    <main className="auth-container">
      <div className="auth-aside">
        <span className="auth-mark">&lt;/&gt;</span>
        <p className="hero-kicker">START BUILDING BETTER</p>
        <h1>Your next review starts here.</h1>
        <p>Create a workspace for faster feedback, cleaner code, and sharper decisions.</p>
      </div>

      <form
        className="auth-card"
        onSubmit={registerUser}
      >

        <div className="auth-heading">
          <p className="history-eyebrow">GET STARTED</p>
          <h2>Create account</h2>
          <p>Set up your personal code review workspace.</p>
        </div>

        <label htmlFor="register-name">Full name</label>
        <input
          id="register-name"
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />

        <label htmlFor="register-email">Email address</label>
        <input
          id="register-email"
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <label htmlFor="register-confirm-password">Confirm password</label>
        <input
          id="register-confirm-password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        {errorMessage && <p className="form-message error-message" role="alert">{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting}>

          {isSubmitting ? "Creating account..." : "Create account"}

        </button>

        <p>

          Already have an account?

          <Link to="/login">

            Login

          </Link>

        </p>

      </form>

    </main>

  );

}

export default Register;