import { useRegisterMutation } from "../features/user/userApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/tokenService";
// import AvatarSelection from "./AvatarSelection";
import AvatarCarousel from "./AvatarCarousel";

const RegistrationForm = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({ 
    username: "", 
    email: "", 
    password: "", 
    avatar: "" 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

  const validPassword = (password) => {
    const minLength = password.length >= 8;
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return minLength && hasCapital && hasNumber;
  };

   if (!validPassword(form.password)) {
      setApiError('Password must be 8+ characters, contain one capital letter and one number');
      return;
   } 
   try {
      const result = await register(form).unwrap();
      setToken(result.token);
      navigate("/Account");
    } catch (err) {
      const message = err.data?.message || err?.error || 'Registration failed';
      setApiError(message);
    }
  };

  return (
    <form 
     onSubmit={handleSubmit} 
     className="flex flex-col align-items-center"
     style={{
      margin: "5rem 12rem 0rem 12rem ",
     }}
    >
      <input
        type="text"
        placeholder="username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        className="form-control me-2 my-3"
        required
      />
      <input
        type="text"
        placeholder="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="form-control me-2 my-3"
        required
      />
      <input
        type="current-password"
        placeholder="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="form-control me-2 my-3"
        required
      />
      <div className="carouselWrapper" style={{width: "15rem", height: "15rem",}}>
          <AvatarCarousel form={form} handleChange={(selectedAvatar) => 
            setForm({...form, avatar: selectedAvatar})
          }/>
      </div>

        {/* <AvatarSelection  form={form} handleChange={(e) => {
          setForm({...form, avatar: e.target.value})
        }}/> */}
      <button type="submit" disabled={isLoading}>{ isLoading ? 'Registering...' : 'Submit' }</button>
      {apiError && (
        <div style={{ color: "red", marginLeft: "10px" }}>{apiError}</div>
      )}
    </form>
  );
};

export default RegistrationForm;
