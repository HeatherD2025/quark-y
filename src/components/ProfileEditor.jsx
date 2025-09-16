import {
  useEditProfileMutation,
  useGetMeQuery,
} from "../features/user/userApi";
import { useState, useEffect } from "react";

const ProfileEditor = () => {
  const { data: user } = useGetMeQuery();
  const [editProfile, { isLoading, error }] = useEditProfileMutation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProfile(updatedData).unwrap();
      // PUT SUCCESS MESSAGE HERE
    } catch (error) {
      console.error("Failed to update Profile", error);
    }
  };


  return (
   <>
    <form onSubmit={handleSubmit}>
        <input name="username" value={formData.username} onChange={handleChange} />
        <input name="email" value={formData.email} onChange={handleChange} />
        <input name="avatar" value={formData.avatar} onChange={handleChange} />
        <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
        </button>
        {error && <p>Error updating Profile</p>}
    </form>
   </>
  );
};

export default ProfileEditor;
