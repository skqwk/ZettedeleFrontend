import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {routes} from "../router";

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(route =>
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element/>}
                />
            )}
            <Route path="/error" element={<Error/>}/>
            <Route path="/*" element={<Navigate to="/error"/>}/>
        </Routes>
    );
};

export default AppRouter;