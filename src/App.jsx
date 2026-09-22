import { Routes, Route, Navigate, Link } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/dashboard" /> : <Register />}
        />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/history"
          element={token ? <History /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={
            <main className="not-found">
              <p className="history-eyebrow">404 ERROR</p>
              <h1>Page not found</h1>
              <p>This page does not exist or may have moved.</p>
              <Link className="hero-primary" to={token ? "/dashboard" : "/"}>Return to {token ? "dashboard" : "home"} <span>→</span></Link>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;