import React, { useContext, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthContext/AuthContext";
import useTitle from "../Components/usetTitle";

const Login = () => {
    useTitle("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // capture original route

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    signInUser(email, password)
      .then(() => {
        navigate(from, { replace: true }); // redirect to the page user wanted
      })
      .catch((err) => {
        setError(err.message || "Login failed. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    setError("");
    setLoading(true);

    signInWithGoogle()
      .then(() => {
        navigate(from, { replace: true }); // redirect after google login
      })
      .catch((err) => {
        setError(err.message || "Google login failed. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold">Login now!</h1>
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleLogin}>
              <fieldset>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <a className="link link-hover text-sm mb-2">Forgot password?</a>
                <button
                  type="submit"
                  className="btn btn-neutral mt-2 w-full"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </fieldset>
            </form>

            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <NavLink to="/register" className="link link-primary font-bold">
                Register here
              </NavLink>
            </p>

            <p className="text-center font-bold text-red-500 my-2">or</p>

            <button
              onClick={handleGoogleLogin}
              className="btn w-full bg-white text-black border"
              disabled={loading}
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
