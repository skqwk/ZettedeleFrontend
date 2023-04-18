import './styles/App.css';
import React from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {Provider} from "react-redux";
import {store} from "./store";


const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <Link to="/about" style={{textDecoration: 'none'}}>
                        <h1>Zettedele</h1>
                    </Link>
                    <Navbar/>
                    <AppRouter/>
                </BrowserRouter>
            </div>
        </Provider>
    );
}
export default App;
