import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useProfile} from "../../../hooks/useProfile";
import {removeVaultEvent, updateVaultEvent} from "../../../store/vaultReducer";
import Modal from "../../UI/modal/Modal";
import Input from "../../UI/input/Input";
import Button from "../../UI/button/Button";
import {diff} from "../../../utils/DiffUtil";
import Hint from "../../UI/hint/Hint";

const EditVaultForm = ({vault, visible, setVisible, setVaultId}) => {
    const dispatch = useDispatch();
    const nowUser = useProfile();
    const [formVault, setFormVault] = useState(vault);

    useEffect(() => {
        setFormVault(vault);
    }, [vault])

    const close = () => {
        if (!isBlank(formVault.name)) {
            let updatedData = diff(vault, formVault);
            console.log(updatedData);
            if (Object.keys(updatedData).length !== 0) {
                dispatch(updateVaultEvent({vaultId: vault.id, nowUser, updatedData}))
            }
            setVisible(false);
        }
    }

    const removeVault = () => {
        setVaultId('');
        setVisible(false);
        dispatch(removeVaultEvent({vaultId: vault.id, nowUser}));
    }

    const isBlank = (str) => {
        return !/\S/.test(str)
    }

    return (
        <div>
            <Modal visible={visible} close={close}>
                {isBlank(formVault.name) && <Hint>Имя не должно быть пустым</Hint>}
                <Input inputName="НАЗВАНИЕ ХРАНИЛИЩА" value={formVault.name}
                       onChange={e => setFormVault({...formVault, name: e.target.value})}/>
                <Button onClick={() => removeVault()} type='warning'>УДАЛИТЬ ХРАНИЛИЩЕ</Button>
            </Modal>
        </div>
    );
};

export default EditVaultForm;