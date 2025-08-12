import { useLoginMutation } from "../api/userApi";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure, logout } from "../redux/slices/userSlice";
import React, { useState } from "react";
import { setToken } from "../utils/tokenService";
import ReactiveButton from "reactive-button";

const LoginForm = ({ setIsLoggedIn, setUserEmail }) => {
    const dispatch = useDispatch();
    const [login, {isLoading}] = useLoginMutation();
    const [form, setForm] = useState({ username: '', password: ''});
    const [apiError, setApiError] = useState(null);
   
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const result = await login(form).unwrap();
        console.log('login result:', result)
        // saving token to local storage
        setToken(result.token);
        dispatch(loginSuccess(result));

        // updating my login state
        setIsLoggedIn(true);
        setUserEmail(result.user?.email || form.username);

        setForm({ username: '', password: '' });
        setApiError(null);
    } catch (err) {
        const message = err.data?.message || err?.error || 'Login failed';
        dispatch(loginFailure(message));
        setApiError(message);
    }
};

    return (
        <form onSubmit={handleSubmit} className="d-flex align-items-center">
            <input 
              type='text' 
              placeholder='username'
              value={ form.username } 
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="form-control me-2"
              required
            />
            <input 
              type='current-password' 
              placeholder='password' 
              value={ form.password }
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-control me-2"
              required
            />

            <ReactiveButton
              type="submit"
              rounded
              idleText={"Login"}
              loadingText={"Logging in..."}
              successText={"Logged in"}
              errorText={"Error logging in"}
              style={{
              width: "80px",
              fontSize: "12px",
              }}
              buttonState={isLoading? 'loading': 'idle'}
            />

            {apiError && (
        <div style={{ color: 'red', marginLeft: '10px' }}>{apiError}</div>
      )}
    </form>
  );
};

export default LoginForm;