import React, { useContext, useParams, useNavigate } from "react";
import { userContext } from "../components/ContextProvider";
import { useGetMeQuery } from "../features/user/userApi";
import ProfileEditor from "../components/ProfileEditor";
import "../styles/account.css";

export default function Account() {
  const { authenticated, username, handleLogout } = useContext(userContext);
  const { userId } = useParams();
  const navigate = useNavigate();
  const { data: user, error, isLoading } = useGetMeQuery(userId);
  const [updatedUserProfile] = ProfileEditor();

  // allow post editing, deletion

  return (
    <>
      <div className="accountPageContainer">
        <div className="backgroundContainer">
          <div className="mainInfoContainer">
            <div className="userAccountBoxHeader">{username || "User"}</div>
          </div>
        </div>
      </div>
    </>
  );
}
