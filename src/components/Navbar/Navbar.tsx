import React from 'react';
import {NavLink} from "react-router-dom";
import {LoginForm} from "../Forms/LoginForm";
import './Navbar.scss'
import NavbarMenu from "./NavbarMenu";
import NavbarLogo from "./NavbarLogo";

export const Navbar = () => {
    return (
        <div className='navbar'>
            <NavbarLogo/>
            <NavbarMenu/>
            <LoginForm/>
        </div>
    );
};
