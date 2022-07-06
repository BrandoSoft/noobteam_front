import React from 'react';
import {NavLink} from "react-router-dom";
import {LoginForm} from "../Forms/LoginForm";
import './Navbar.scss'

export const Navbar = () => {
    return (
        <div className='navbar'>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/user'>User</NavLink></li>
            </ul>
            {

            }
            <LoginForm/>
        </div>
    );
};
