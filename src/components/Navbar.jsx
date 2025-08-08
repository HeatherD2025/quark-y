import { Link,  useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { getToken } from "../utils/tokenService";


const Navbar = () => {
    const navigate = useNavigate();
    // const token = getToken();

    // const [isLoggedIn, setIsLoggedIn] = useState('Login');
    // const [isLoading, setisLoading] = useState('false');

    // if (token) {
    //     const {id} = jwtDecode(token);
    //     userId = id;
    // }

    // useEffect(() => {
    //     if (token) {
    //         setIsLoggedIn('logout');
    //     } else {
    //         setIsLoggedIn('login');
    //     }
    // }, [token]);

    // const handleLogout = () => {
    //     deleteToken(token);
    //     navigate('/home');
    // };

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