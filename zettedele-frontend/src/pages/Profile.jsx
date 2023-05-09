import React, {useEffect, useState} from 'react';
import Switch from "../components/UI/switch/Switch";
import {useDispatch, useSelector} from "react-redux";
import Header from "../components/UI/header/Header";
import Hint from "../components/UI/hint/Hint";
import AuthForm from "../components/AuthForm";
import ProfileForm from "../components/ProfileForm";
import {useProfile} from "../hooks/useProfile";
import {UserService} from "../API/UserService";
import {isVisible} from "@testing-library/user-event/dist/utils";
// import {SyncManager} from "../core/SyncManager";

const Profile = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        <div className="profile">
            <div style={{width: "60%", alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                {!isAuth && <Hint>Авторизуйтесь, чтобы иметь возможность просматривать заметки</Hint>}
                <Header size={18}>АККАУНТ</Header>
                {isAuth
                    ? <ProfileForm/>
                    : <AuthForm/>
                }
            </div>
        </div>
    );
};

export default Profile;