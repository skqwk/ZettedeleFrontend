import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {excludedRoutes} from "../router/index";
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