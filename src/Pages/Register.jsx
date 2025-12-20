import React, { useContext, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import useTitle from "../Components/usetTitle";

const Register = () => {
    useTitle("Register");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // photoUrl: "",
    password: "",
  });

  const [passwordErrors, setPasswordErrors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // redirect after registration
                                         
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push("Password must be at least 6 characters long");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter");
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") setPasswordErrors(validatePassword(value));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }




    
    const errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      setError("Please fix the password errors");
      setLoading(false);
      return;
    }

    createUser(email, password)
      .then(() => {
        navigate(from, { replace: true }); // redirect to original page
      })
      .catch((err) => {
        setError(err.message || "Registration failed. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignUp = () => {
    setError("");
    setLoading(true);

    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        const newUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };

        return fetch("https://utility-bill-sys-server.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        });
      })
      .then((res) => res.json())
      .then(() => {
        navigate(from, { replace: true }); 
      })
      .catch((err) => setError(err.message || "Google sign-up failed"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold">Register now!</h1>
            {error && <div className="alert alert-error"><span>{error}</span></div>}

            <form onSubmit={handleRegister}>
              <fieldset>
                <label className="label">Name *</label>
                <input type="text" name="name" className="input input-bordered"
                  value={formData.name} onChange={handleInputChange} required />

                <label className="label">Email *</label>
                <input type="email" name="email" className="input input-bordered"
                  value={formData.email} onChange={handleInputChange} required />

                <label className="label">Photo-URL</label>
                <input type="url" name="photoUrl" className="input input-bordered"
                  value={formData.photoUrl} onChange={handleInputChange} />

                <label className="label">Password *</label>
                <input type="password" name="password"
                  className={`input input-bordered ${passwordErrors.length > 0 ? "input-error" : ""}`}
                  value={formData.password} onChange={handleInputChange} required />

                {passwordErrors.length > 0 && (
                  <div className="text-error text-sm mt-2 space-y-1">
                    {passwordErrors.map((err, idx) => <p key={idx}>• {err}</p>)}
                  </div>
                )}

                <button type="submit" className="btn btn-neutral mt-4 w-full"
                  disabled={loading || passwordErrors.length > 0}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </fieldset>
            </form>

            <p className="text-sm text-center mt-2">
              Already have an account? <NavLink to="/login" className="link link-primary font-bold">Login here</NavLink>
            </p>

            <p className="text-red-500 font-bold text-center my-2">or</p>

            <button onClick={handleGoogleSignUp} className="btn w-full bg-white text-black border" disabled={loading}>
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
