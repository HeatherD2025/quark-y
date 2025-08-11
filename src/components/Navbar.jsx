import { Link,  useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { getToken } from "../utils/tokenService";


const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <ul>
                <li action onClick={() => navigate('/')}>Home</li>
                <li action onClick={() => navigate('/NewsPage')}>News</li>
                <li action onClick={() => navigate('/Account')}>Profile</li>
                {/* <li action onClick={() => navigate('/')}>Community Board</li> */}
                <li action onClick={() => navigate('/Register')}>Register</li>
            </ul>
        </nav>
    )

}

export default Navbar;