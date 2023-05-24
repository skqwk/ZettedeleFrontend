import React, {useEffect} from 'react';
import RoutedApp from "./RoutedApp";
import {useDispatch, useSelector} from "react-redux";
import {loginAction} from "./store/authReducer";
import {HLC} from "./core/clock/HLC";

const WrappedApp = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(process.env);
        let authToken = localStorage.getItem("authToken");
        let role = localStorage.getItem("role");
        let nodeId = localStorage.getItem("nodeId");

        if (authToken && role && nodeId) {
            dispatch(loginAction({role, authToken}));
            HLC.init(nodeId);
        }

    }, [])

    return (
        <div className="App">
            <RoutedApp/>
        </div>
    );
};

export default WrappedApp;