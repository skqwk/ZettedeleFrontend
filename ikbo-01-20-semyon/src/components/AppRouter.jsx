import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {adminRoutes, defaultRoutes, excludedRoutes, routes} from "../router/index";
import {useSelector} from "react-redux";
import {useNavbarRoutes} from "../hooks/useNavbarRoutes";

const AppRouter = () => {
    const [navbarRoutes, setNavbarRoutes] = useState([]);
    useNavbarRoutes(setNavbarRoutes);

    const extractRoute = (route) => {
        return (
            <Route path={route.to}
                   element={<route.element/>}
                   key={route.to}
            />
        )
    }

    return (
        <Routes>
            {navbarRoutes.map(route => extractRoute(route))}
            {excludedRoutes.map(route => extractRoute(route))}
        </Routes>
    );
};

export default AppRouter;