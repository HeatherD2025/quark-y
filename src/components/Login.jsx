import { useLoginMutation } from "../api/userApi";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/slices/userSlice";
import { useState } from "react";
import { setToken } from "../utils/tokenService";
import { removeToken } from "../utils/tokenService";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [login, {isLoading}] = useLoginMutation();
    const [form, setForm] = useState({ username: '', password: ''});
    const [apiError, setApiError] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const result = await login(form).unwrap();
        setToken(result.token);
        dispatch(loginSuccess(result));
        setForm({ username: '', password: '' });
        setApiError(null);
    } catch (err) {
        const message = err.data?.message || err?.error || 'Login failed',
        dispatch(loginFailure(message));
        setApiError(message);
    }
};

    return (
        <form onSubmit = {handleSubmit}>
            <input 
              type='text' 
              placeholder='username'
              value={ form.username } 
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input 
              type='password' 
              placeholder='password' 
              value={ form.password }
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type='submit' disabled={isLoading}>Log In</button>
            {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
        </form>
    );
};

export default LoginForm;