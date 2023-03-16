import React from 'react';
import './App.css';
import {Link} from "react-router-dom";
const Navbar = () => {
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/profile">Профиль</Link>
            </li>

            <li className="navbar-item">
                <Link to="/vaults">Хранилища</Link>
            </li>

            <li className="navbar-item">
                <Link to="/search">Поиск</Link>
            </li>
        </ul>
    );
};

export default Navbar;