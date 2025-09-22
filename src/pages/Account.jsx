import React, { useEffect }from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../features/user/userApi";
import { avatarList } from "../assets/avatarData";
// import ProfileEditor from "../components/ProfileEditor";
import "../styles/account.css";

const Account = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authChecked = useSelector((state) => state.auth.accessToken)
  // const [updatedUserProfile] = ProfileEditor();
  const { data: user, error, isLoading } = useGetUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
     if (!isAuthenticated) {
      navigate("/login");
   }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;
  if (isLoading) return <div>Loading your profile...</div>;
  if (error) return <div>Error loading your profile</div>

  // Destructure user data
  const { username, email, avatarId } = user || {};

  const matchedAvatar = avatarList.find(avatar => avatar.id === avatarId);
  // fallback if matchedAvatar fails
  const avatarSource = matchedAvatar?.image || avatarList[0].image;

  return (
        <div className="accountPageContainer">
          <div className="backgroundContainer">
            <div className="mainInfoContainer">
              <div className="userAccountBoxHeader">{username || "User"}</div>
                
                <div className="avatarContainer">
                  <img 
                    src={avatarSource}
                    alt="User Avatar"
                    className="user-avatar"
                  />
                </div> 
                
                  {/* <ProfileEditor user={user} /> */}
            </div>
          </div>
        </div>
  );
};

export default Account;
