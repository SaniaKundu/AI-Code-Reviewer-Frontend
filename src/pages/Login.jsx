import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = async (e) => {

    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {

      const response = await axios.post(

        `${import.meta.env.VITE_API_URL}/auth/login`,

        {

          email,

          password

        }

      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "name",
        response.data.user.name
      );

      navigate("/dashboard");

    }

    catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Check your details and try again.");
    } finally {
      setIsSubmitting(false);

    }

  };

  return (

    <main className="auth-container">
      <div className="auth-aside">
        <span className="auth-mark">&lt;/&gt;</span>
        <p className="hero-kicker">WELCOME BACK</p>
        <h1>Keep your code moving forward.</h1>
        <p>Access your workspace and continue turning good code into great software.</p>
      </div>

      <form
        className="auth-card"
        onSubmit={loginUser}
      >

        <div className="auth-heading">
          <p className="history-eyebrow">YOUR WORKSPACE</p>
          <h2>Sign in</h2>
          <p>Enter your details to continue.</p>
        </div>

        <label htmlFor="login-email">Email address</label>
        <input
          id="login-email"

          type="email"

          placeholder="Email address"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          required
          autoComplete="email"

        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          required
          autoComplete="current-password"

        />

        {errorMessage && <p className="form-message error-message" role="alert">{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting}>

          {isSubmitting ? "Signing in..." : "Sign in"}

        </button>

        <p>

          Don't have an account?

          <Link to="/register">

            Register

          </Link>

        </p>

      </form>

    </main>

  );

}

export default Login;