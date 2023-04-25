import React, {useState} from 'react';
import Modal from "./UI/modal/Modal";
import {ProfileManager} from "../core/ProfileManager";
import Header from "./UI/header/Header";
import Select from "./UI/select/Select";
import Button from "./UI/button/Button";
import {useDispatch} from "react-redux";
import {checkoutProfileAction} from "../store/profileReducer";

const SelectProfileForm = () => {

    const profiles = ProfileManager.getProfiles();
    const [profile, setProfile] = useState('');
    const dispatch = useDispatch();
    const selectProfile = () => {
        dispatch(checkoutProfileAction({name: profile}));
    }

    return (
        <Modal visible={true}>
            <div style={{minWidth: "500px"}}>
                <Header size={18}>ВЫБОР ПРОФИЛЯ</Header>
                <Select
                    value={profile}
                    options={profiles}
                    onChange={setProfile}
                    defaultValue="Выбор профиля"/>
                <Button disabled={profile === ''} onClick={() => selectProfile()}>
                    ЗАГРУЗИТЬ ПРОФИЛЬ
                </Button>
            </div>

        </Modal>
    );
};

export default SelectProfileForm;