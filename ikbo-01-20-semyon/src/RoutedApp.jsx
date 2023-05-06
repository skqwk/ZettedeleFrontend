import React from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/AppRouter";

const RoutedApp = () => {
    return (
        <BrowserRouter>
            <Link to="/about" style={{textDecoration: 'none'}}>
                <h1>Zettedele</h1>
            </Link>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    );
};

export default RoutedApp;