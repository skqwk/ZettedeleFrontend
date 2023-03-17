import React from 'react';
import {Route, Routes} from "react-router-dom";
import {excludedRoutes, routes} from "../router/index";

const AppRouter = () => {

    function extractRoute(route) {
        return (
            <Route path={route.to}
                   element={<route.element/>}
                   key={route.to}
            />
        )
    }

    return (
        <Routes>
            {routes.map(route => extractRoute(route))}
            {excludedRoutes.map(route => extractRoute(route))}
        </Routes>
    );
};

export default AppRouter;