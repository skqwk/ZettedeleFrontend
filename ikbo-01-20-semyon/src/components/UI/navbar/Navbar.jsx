import React, {useState} from 'react';
import classes from './Navbar.module.css';
import {Link} from "react-router-dom";
import {useNavbarRoutes} from "../../../hooks/useNavbarRoutes";

const Navbar = () => {
    const [navbarRoutes, setNavbarRoutes] = useState([]);
    useNavbarRoutes(setNavbarRoutes);

    return (
        <ul className={classes.navbar}>
            {navbarRoutes.map(route =>
                <li className={classes.navbarItem} key={route.to}>
                    <Link to={route.to}>{route.name}</Link>
                </li>
            )
            }
        </ul>
    );
};

export default Navbar;