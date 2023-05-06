import './styles/App.css';
import React from 'react';
import {Provider} from "react-redux";
import {store} from "./store";
import WrappedApp from "./WrappedApp";


const App = () => {
    return (
        <Provider store={store}>
            <WrappedApp/>
        </Provider>
    );
}
export default App;
