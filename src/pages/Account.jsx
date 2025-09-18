import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../features/user/userApi";
import ProfileEditor from "../components/ProfileEditor";
import "../styles/account.css";

export default function Account() {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { userId } = useSelector((state) => state.auth.userId);
  // const [updatedUserProfile] = ProfileEditor();

  // allow post editing, deletion

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const { data: user, error, isLoading } = useGetMeQuery();

  if (isLoading) return <div>Loading your profile...</div>;
  if (error) return <div>Error loading your profile</div>

  return (
    <>
      <div className="accountPageContainer">
        <div className="backgroundContainer">
          <div className="mainInfoContainer">
            <div className="userAccountBoxHeader">{username || "User"}</div>
                 <ProfileEditor user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
