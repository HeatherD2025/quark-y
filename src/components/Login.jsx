import { useLoginMutation } from "../api/userApi";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure, logout } from "../redux/slices/userSlice";
import { useState } from "react";
import React from "react";
import { getToken, setToken, removeToken } from "../utils/tokenService";
import ReactiveButton from "reactive-button";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [login, {isLoading}] = useLoginMutation();
    const [form, setForm] = useState({ username: '', password: ''});
    const [apiError, setApiError] = useState(null);

    const handleLogout = () => {
        removeToken(setToken);
        navigate('/home');
    };


    
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const result = await login(form).unwrap();
        setToken(result.token);
        dispatch(loginSuccess(result));
        setForm({ username: '', password: '' });
        setApiError(null);
    } catch (err) {
        const message = err.data?.message || err?.error || 'Login failed';
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
              type='current-password' 
              placeholder='password' 
              value={ form.password }
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
                            <span
                  style={{
                    marginRight: "15px",
                    border: "solid var(--bs-body-bg)",
                  }}
                >
                  {logout ? (
                    <ReactiveButton
                      rounded
                      idleText={"LOGOUT"}
                      type="button"
                      variant="secondary"
                      style={{
                        width: "80px",
                        backgroundColor: "#558e89",
                        fontSize: "12px",
                      }}
                      // className=""
                      onClick={handleLogout}
                      navigate="/"
                    >
                      {loginSuccess}
                    </ReactiveButton>
                  ) : (
                    <ReactiveButton
                      rounded
                      idleText={"LOGIN"}
                      type="button"
                      variant="secondary"
                      style={{
                        marginRight: "5px",
                        backgroundColor: "#558e89",
                        fontSize: "12px",
                      }}
                      className="navbar-right"
                      onClick={handleLogout} // TODO make sure this is fine, I dont think its fine
                    >
                      {isLoggedIn}
                    </ReactiveButton>
                  )}
                </span>
            {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
        </form>
    );
};



export default LoginForm;