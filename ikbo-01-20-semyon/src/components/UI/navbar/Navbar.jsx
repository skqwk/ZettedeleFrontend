import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import Button from "../button/Button";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = (e) => {
        e.preventDefault();
        setIsAuth(false);
    }

    return (
        <div className="navbar">
            <Button onClick={logout}>Выйти</Button>
            <div className="navbar__links">
                <Link to="/about">О сайте</Link>
                <Link to="/posts">Посты</Link>
            </div>
        </div>
    );
};

export default Navbar;