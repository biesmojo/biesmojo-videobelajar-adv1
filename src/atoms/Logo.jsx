import React from "react";
import { Link } from "react-router-dom";
import LogoImage from "../assets/images/LogoBelajar.png";

function Logo() {
    return (
        <Link to="/">
            <img src={LogoImage} alt="logo" />
        </Link>
    );
};

export default Logo;