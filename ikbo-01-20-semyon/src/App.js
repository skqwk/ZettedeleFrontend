import './App.css';
import React from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import AppRouter from "./AppRouter";
import Navbar from "./Navbar";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Link to="/about" style={{ textDecoration: 'none' }}>
                    <h1>Zettedele</h1>
                </Link>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
}
export default App;
