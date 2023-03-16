import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "./Profile";
import About from "./About";
import Search from "./Search";
import Vaults from "./Vaults";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/about" element={<About/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/vaults" element={<Vaults/>}/>
            <Route path="/*" element={<Navigate to="/about"/>}/>
        </Routes>
    );
};

export default AppRouter;