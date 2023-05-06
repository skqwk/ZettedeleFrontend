import React from 'react';
import Input from "../components/UI/input/Input";
import Switch from "../components/UI/switch/Switch";
import {useDispatch, useSelector} from "react-redux";
import {offlineAction, onlineAction} from "../store/connectionReducer";
import {loadNotesEvent} from "../store/vaultReducer";
import RoundButton from "../components/UI/roundbutton/RoundButton";
import {useProfile} from "../hooks/useProfile";
import {EventService} from "../API/EventService";
import {NoteWebLoader} from "../core/web/NoteWebLoader";

const Setup = () => {
    const dispatch = useDispatch();
    const offline = useSelector(state => state.connection.offline);
    const nowUser = useProfile();
    const auth = useSelector(state => state.auth);

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

    const loadNotes = () => {
        EventService.getAllEvents(auth.authToken)
            .then(rs => {
                console.log("Get all events!")
                console.log(rs.data)
                let vaults = NoteWebLoader.applyServerEvents(rs.data);
                dispatch(loadNotesEvent({vaults}));
            })
    }

    return (
        <div className="setup">
            <div style={{width: "60%"}}>
                <Switch switchName="ИНТЕРНЕТ" onToggle={toggle} checked={!offline}/>
                <Input inputName="ДОМЕН" readOnly value={setup.domain}/>
                <Input inputName="СЕРВЕР" readOnly value={setup.server}/>
                <RoundButton onClick={() => loadNotes()}>
                    ⟳
                </RoundButton>
            </div>
        </div>
    );
};

export default Setup;