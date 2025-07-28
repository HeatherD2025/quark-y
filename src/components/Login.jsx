import { useLoginMutation } from "../api/userApi";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/slices/userSlice";
import { useState } from "react";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [login, {isLoading}] = useLoginMutation();
    const [form, setForm] = useState({ username: '', password: ''});
    const [apiError, setApiError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const result = await login(form).unwrap();
          dispatch(loginSuccess(result));
        } catch (err) {
          dispatch(loginFailure(err.data?.message || 'Login failed'));
          setApiError(err.data?.message || 'Invalid username or password')
        }
    };

    return (
        <form onSubmit = {handleSubmit}>
            <input type='text' placeholder='username' onChange={(e) => setForm({ ...form, username: e.target.value })}>Username</input>
            <input type='text' placeholder='password' onChange={(e) => setForm({ ...form, password: e.target.value })}>Password</input>
            <button type='submit' disabled={isLoading}>Log In</button>
            {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
        </form>
    );
};

export default LoginForm;