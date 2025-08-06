import { useState } from "react";
import { Link,  useNavigate } from 'react-router-dom';
import { getToken } from "../utils/tokenService";

export const navbar = (props) => {
    const navigate = useNavigate();
    const token = getToken();

}