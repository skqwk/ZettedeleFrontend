import logo from './logo.png';
import './App.css';
import React from 'react';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Простое React-приложение
                </p>
            </header>
        </div>
    );
}
export default App;
