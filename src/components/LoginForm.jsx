import { useLoginMutation } from "../features/user/userApi";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/tokenService";

const LoginForm = () => {
  // const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [apiError, setApiError] = useState(null);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account", { replace: true });
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(form).unwrap();
      setToken(result.token);
      // resetting form and error
      setForm({ username: "", password: "" });
      setApiError(null);

    } catch (err) {
      const message = err.data?.message || err?.error || "Login failed";
      setApiError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center">
      <input
        type="text"
        placeholder="username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        className="form-control me-2"
        required
        autoComplete="username"
      />
      <input
        type="password"
        placeholder="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="form-control me-2"
        required
        autoComplete="current-password"
      />

      <button type="submit" disabled={isLoading}>
        { isLoading ? 'Logging in...' : 'Login' }
      </button>
      {apiError && (
        <div style={{ color: "red", marginLeft: "10px" }}>{apiError}</div>
      )}
    </form>
  );
};

export default LoginForm;
