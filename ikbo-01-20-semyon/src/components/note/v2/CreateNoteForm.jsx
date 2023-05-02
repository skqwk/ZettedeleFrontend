import React, {useEffect, useState} from 'react';
import Modal from "../../UI/modal/Modal";
import NoteFormV2 from "./NoteFormV2";
import {createNoteEvent, removeNoteEvent} from "../../../store/vaultReducer";
import {useDispatch} from "react-redux";
import {useProfile} from "../../../hooks/useProfile";
import {useNote} from "../../../hooks/useNote";
import {NoteManager} from "../../../core/NoteManager";
import {v4} from 'uuid';
import {FlushUpdater} from "../../../core/filesystem/FlushUpdater";

const CreateNoteForm = ({vaultId, isOpenCreateForm, setOpenCreateForm, setNoteId, ...props}) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const nowUser = useProfile();
    const [newNoteId, setNewNoteId] = useState(null);
    const note = useNote(vaultId, newNoteId);

    const close = () => {
        FlushUpdater.flushUpdates(newNoteId, vaultId, nowUser);
        setVisible(false);
        setOpenCreateForm(false);
    }

    useEffect(() => {
        if (isOpenCreateForm) {
            let noteId = v4();
            let payload = {vaultId, noteId, nowUser};

            console.log('Payload in createNoteForm');
            console.log(payload);

            dispatch(createNoteEvent(payload))
            setNewNoteId(noteId);
            setVisible(true);
        }
    }, [isOpenCreateForm])

    const remove = () => {
        setVisible(false);
        setOpenCreateForm(false);
        let payload = {vaultId, noteId: newNoteId, nowUser};
        dispatch(removeNoteEvent(payload))
        FlushUpdater.flushUpdates(newNoteId, vaultId, nowUser);
        console.log('Remove note');
    }

    return (
        <div>
            {visible && <Modal visible={visible} close={close} backgroundColor={note.color}>
                <NoteFormV2
                    setNoteId={setNoteId}
                    address={{vaultId, noteId: newNoteId}}
                    remove={remove}
                    visible={visible}
                    setVisible={setVisible}
                    formNote={note}/>
            </Modal>
            }
        </div>
    );
};

export default CreateNoteForm;