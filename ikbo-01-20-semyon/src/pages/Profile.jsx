import React from 'react';
import Switch from "../components/UI/switch/Switch";
import {useDispatch, useSelector} from "react-redux";
import {offlineAction, onlineAction} from "../store/connectionReducer";
import Button from "../components/UI/button/Button";
import Header from "../components/UI/header/Header";
import Hint from "../components/UI/hint/Hint";
import AuthForm from "../components/AuthForm";
import ProfileForm from "../components/ProfileForm";
import Input from "../components/UI/input/Input";
import {useProfile} from "../hooks/useProfile";
import {resetProfileAction} from "../store/profileReducer";

const Profile = () => {
    const dispatch = useDispatch();
    const offline = useSelector(state => state.connection.offline);
    const isAuth = useSelector(state => state.auth.isAuth);
    const nowProfile = useProfile();

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

    const resetProfile = () => {
        dispatch(resetProfileAction());
    }

    return (
        <div className="profile">
            <div style={{width: "60%", alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                <Header size={18}>ТЕКУЩИЙ ПРОФИЛЬ</Header>
                <Input inputName="НАЗВАНИЕ ПРОФИЛЯ" readOnly value={nowProfile}/>
                <Button onClick={() => resetProfile()}>СМЕНИТЬ ПРОФИЛЬ</Button>
                <Header size={18}>АККАУНТ</Header>
                {isAuth
                    ? <ProfileForm/>
                    : <AuthForm/>
                }
                <Header size={18}>НАСТРОЙКА</Header>
                {!isAuth && <Hint>Авторизуйтесь, чтобы синхронизировать заметки</Hint>}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <Switch switchName="ИНТЕРНЕТ" onToggle={toggle} checked={!offline}/>
                    <Button onClick={() => syncNotes()} disabled={!isAuth || offline}>СИНХРОНИЗИРОВАТЬ</Button>
                    {/*<RoundButton onClick={e => dispatch(loadNotesEvent({username: nowUser}))}>⟳</RoundButton>*/}
                </div>
            </div>
        </div>
    );
};

export default Profile;