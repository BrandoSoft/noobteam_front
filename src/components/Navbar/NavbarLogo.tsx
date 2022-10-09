import React from 'react';
import './Navbar.scss'

const NavbarLogo = () => {
    return (
        <div className="navLogo">
            <p className="navLogo__text">
                Always<span className="navLogo__text navLogo__text--secondary">Noob</span>Team
            </p>
        </div>
    );
};

export default NavbarLogo;