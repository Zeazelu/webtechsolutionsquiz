import React from "react";
import './Header.css';
import Logo from '../../assets/webtech.png';

const Header = () => (
    <div className="header__container">
        <img className='header__logo' src={Logo} alt='logo' />
    </div>
)

export default Header;