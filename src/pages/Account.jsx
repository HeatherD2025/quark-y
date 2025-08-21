import React, { useContext } from "react";
import { userContext } from "../components/ContextProvider";

const Account = () => {

    const { authenticated, username, handleLogout } = useContext(userContext);
    // allow account editing, deletion
    // allow post editing, deletion

    return (
        <>
         <div className="accountPageContainer">
          <h2>{username || "User"}</h2>
           
         </div>
        </>
    )
}

export default Account;