import React, { useContext } from "react";
import { userContext } from "../components/ContextProvider";
import { useGetMeQuery } from "../api/userApi";
import "../styles/account.css";

export default function Account() {

    const { authenticated, username, handleLogout } = useContext(userContext);
    // allow account editing, deletion
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