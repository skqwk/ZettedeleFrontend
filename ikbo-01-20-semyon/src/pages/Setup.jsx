import React from 'react';
import Input from "../components/UI/input/Input";
import Switch from "../components/UI/switch/Switch";
import {useDispatch, useSelector} from "react-redux";
import {offlineAction, onlineAction} from "../store/connectionReducer";
import {loadNotesEvent} from "../store/vaultReducer";
import RoundButton from "../components/UI/roundbutton/RoundButton";
import {NoteManager} from "../core/NoteManager";
import {useProfile} from "../hooks/useProfile";

const Setup = () => {
    const dispatch = useDispatch();
    const offline = useSelector(state => state.connection.offline);
    const nowUser = useProfile();

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

    return (
        <div className="setup">
            <div style={{width: "60%"}}>
                <Switch switchName="ИНТЕРНЕТ" onToggle={toggle} checked={!offline}/>
                <Input inputName="ДОМЕН" readOnly value={setup.domain}/>
                <Input inputName="СЕРВЕР" readOnly value={setup.server}/>
                <RoundButton onClick={e => dispatch(loadNotesEvent({username: nowUser}))}>⟳</RoundButton>
            </div>
        </div>
    );
};

export default Setup;