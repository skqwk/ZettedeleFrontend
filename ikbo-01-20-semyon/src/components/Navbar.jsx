import React from 'react';
import '../styles/App.css';
import {Link} from "react-router-dom";
import {routes} from '../router'

const Navbar = () => {
    return (
        <ul className="navbar">
            {routes.map(route =>
                <li className="navbar-item" key={route.to}>
                    <Link to={route.to}>{route.name}</Link>
                </li>
            )
            }
        </ul>
    );
};

export default Navbar;