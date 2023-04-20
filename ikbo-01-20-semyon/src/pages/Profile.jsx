import React, {useState} from 'react';
import Switch from "../components/UI/switch/Switch";
import {useDispatch, useSelector} from "react-redux";
import {useProfile} from "../hooks/useProfile";
import {offlineAction, onlineAction} from "../store/connectionReducer";
import Button from "../components/UI/button/Button";
import Header from "../components/UI/header/Header";
import Hint from "../components/UI/hint/Hint";
import Modal from "../components/UI/modal/Modal";
import Input from "../components/UI/input/Input";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import {logoutAction} from "../store/authReducer";
import AuthForm from "../components/AuthForm";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
    const dispatch = useDispatch();
    const offline = useSelector(state => state.connection.offline);
    const nowUser = useProfile();
    const isAuth = useSelector(state => state.auth.isAuth);

    const setup = {
        domain: 'RU',
        server: '192.168.10.11'
    }

    const toggle = (e) => {
        const checked = e.target.checked;
        if (checked) {
            dispatch(onlineAction())
        } else {
            dispatch(offlineAction())
        }
    }

    const syncNotes = () => {
        console.log('Sync notes');
    }

    return (
        <div className="profile">
            <Header size={18}>ДАННЫЕ ПРОФИЛЯ</Header>
            <div style={{width: "60%", alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                {isAuth
                    ? <ProfileForm/>
                    : <AuthForm/>
                }
                <Header size={18}>НАСТРОЙКА</Header>
                {!isAuth && <Hint>Авторизуйтесь, чтобы синхронизировать заметки</Hint>}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <Switch switchName="ИНТЕРНЕТ" onToggle={toggle} checked={!offline}/>
                    <Button onClick={e => syncNotes()} disabled={!isAuth || offline}>СИНХРОНИЗИРОВАТЬ</Button>
                    {/*<RoundButton onClick={e => dispatch(loadNotesEvent({username: nowUser}))}>⟳</RoundButton>*/}
                </div>
            </div>
        </div>
    );
};

export default Profile;