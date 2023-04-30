import React, {useState} from 'react';
import Modal from "../../UI/modal/Modal";
import Input from "../../UI/input/Input";
import Button from "../../UI/button/Button";
import {useDispatch} from "react-redux";
import {useProfile} from "../../../hooks/useProfile";
import {createVaultEvent} from "../../../store/vaultReducer";
import {v4} from 'uuid';
import {isBlank} from "../../../utils/ValidationUtil";

const CreateVaultForm = ({visible, setVisible}) => {
    const dispatch = useDispatch();
    const nowUser = useProfile();
    const [name, setName] = useState('');

    const close = () => {
        setName('');
        setVisible(false);
    }

    const createVault = () => {
        dispatch(createVaultEvent({vaultId: v4(), name, nowUser}))
        setVisible(false);
    }



    return (
        <div>
            <Modal visible={visible} close={close}>
                <Input inputName="НАЗВАНИЕ ХРАНИЛИЩА" value={name} onChange={e => setName(e.target.value)}/>
                <Button disabled={isBlank(name)} onClick={() => createVault()}>СОЗДАТЬ ХРАНИЛИЩЕ</Button>
            </Modal>
        </div>
    );
};

export default CreateVaultForm;