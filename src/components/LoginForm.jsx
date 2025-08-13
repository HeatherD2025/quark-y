import { useLoginMutation } from "../api/userApi";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/slices/userSlice";
import React, { useState } from "react";
import { setToken } from "../utils/tokenService";
import MyReactiveButton from "./myReactiveButton";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const dispatch = useDispatch();
    const [login, {isLoading}] = useLoginMutation();
    const [form, setForm] = useState({ username: '', password: ''});
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();
   
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const result = await login(form).unwrap();
        console.log('login result:', result)

        // saving token to local storage
        setToken(result.token);

        // updating redux store
        dispatch(loginSuccess(result));

        // resetting form and error
        setForm({ username: '', password: '' });
        setApiError(null);

        navigate('/Account');

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

            <MyReactiveButton onClick={handleSubmit}>Login</MyReactiveButton>
            {apiError && (
        <div style={{ color: 'red', marginLeft: '10px' }}>{apiError}</div>
      )}
    </form>
  );
};

export default LoginForm;