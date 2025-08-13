import React,  { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRegisterMutation } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../utils/tokenService";
import { registerSuccess, loginFailure } from '../redux/slices/userSlice'

const registerNewUser = () => {
    const dispatch = useDispatch();
    const [register, {isLoading, error}] = useRegisterMutation();
    const navigate = useNavigate();

      // stores data from login form
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [apiError, setApiError] = useState(null);
    const [passwordError, setPasswordError] = useState('')

    const handleChange = async (e) => {
        const {name, value} = e.target;

    if (name === "password") {
        validatePassword(value);
    }

    setForm((prev) => ({
        ...prev,
        [name]: value,
    }));
    };

      // Password validation 
    const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    let error = "";
    if (!minLength) error = "Password must be at least 8 characters";
    else if (!hasCapital)
      error = "Password must contain at least one capital letter";
    else if (!hasNumber) error = "Password must contain at least one number";

    setPasswordError(error);
    return !error;
  };
       
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    // const { username, email, password } = form;

    // if (!validatePassword(password)) return;

    // try {
    //   const result = await register({ username, email, password }).unwrap();
    
    //   // saving token to local storage
    //   setToken(result.token);

    //   console.log(token, 'token stored');
    
    //   // updating redux store
    //   dispatch(registerSuccess(result));

    //   console.log('registration success')
    
    //   // resetting form and error
    //   setForm({ username: '', email: '', password: '' });
    //   setApiError(null);
    
    //   navigate('/Account');
    
    //     } catch (err) {
    //         const message = err.data?.message || err?.error || 'Registration failed';
    //         dispatch(loginFailure(message));
    //         setApiError(message);
    //     }
    // };

    const handleSubmit = async (e) => {
      e.preventDefault();

  try {
    const result = await register(form).unwrap();
    console.log("Registration success:", result);

    setToken(result.token);
    dispatch(registerSuccess(result));
    navigate("/Account");
  } catch (err) {
    console.error("Registration failed:", err);
    setApiError(err.data?.message || err.message || "Registration failed");
    dispatch(loginFailure(err.message));
  }
};

  return (
    <>
    <div 
      className="registerFormContainer" 
      style={{
        display: 'flex',
        justifyContent: "space-around"
      }}>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="Form.ControlInput1">
            <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="username"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Form.ControlInput2">
            <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email"
                placeholder="name@example.com"
                name="email"
                value={form.email}
                onChange={handleChange}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Form.ControlInput3">
            <Form.Label>Password</Form.Label>
              <Form.Control 
                type="current-password"
                placeholder="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              {passwordError && (
                <Form.Text className='text-danger'>{passwordError}</Form.Text>
              )}
        </Form.Group>
              {apiError && (
                <div style={{ color: "red", marginBottom: "1rem" }}>{apiError}</div>
              )}

        <Button type='submit'>Submit</Button>
        </Form>
    </div>
    </>
  );
}

export default registerNewUser;