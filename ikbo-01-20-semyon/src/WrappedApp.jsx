import React, {useEffect} from 'react';
import {useProfile} from "./hooks/useProfile";
import RoutedApp from "./RoutedApp";
import {useSelector} from "react-redux";

const WrappedApp = () => {
    const nowUser = useProfile();
    const isAuth = useSelector(state => state.auth.isAuth);
    return (
        <div className="App">
            {isAuth
                ? <RoutedApp/>
                : <RoutedApp/>
            }
        </div>
    );
};

export default WrappedApp;