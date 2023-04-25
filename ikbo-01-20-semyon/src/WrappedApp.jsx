import React, {useEffect} from 'react';
import {useProfile} from "./hooks/useProfile";
import SelectProfileForm from "./components/SelectProfileForm";
import RoutedApp from "./RoutedApp";

const WrappedApp = () => {
    const nowUser = useProfile();

    useEffect(() => {

    }, [nowUser])

    return (
        <div className="App">
            {nowUser
                ? <RoutedApp/>
                : <SelectProfileForm/>
            }
        </div>
    );
};

export default WrappedApp;