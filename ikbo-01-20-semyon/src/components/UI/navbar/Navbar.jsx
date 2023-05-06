import React, {useState} from 'react';
import classes from './Navbar.module.css';
import {Link} from "react-router-dom";
import {useNavbarRoutes} from "../../../hooks/useNavbarRoutes";

const Navbar = () => {
    const [navbarRoutes, setNavbarRoutes] = useState([]);
    useNavbarRoutes(setNavbarRoutes);

    const getClasses = (to) => {
        let path = window.location.pathname;
        let className = classes.navbarItem;
        if (path === to) {
            className += ` ${classes.active}`;
        }
        return className;
    }

    return (
        <ul className={classes.navbar}>
            {navbarRoutes.map(route =>
                <li className={getClasses(route.to)} key={route.to}>
                    <Link to={route.to}>{route.name}</Link>
                </li>
            )
            }
        </ul>
    );
};

export default Navbar;