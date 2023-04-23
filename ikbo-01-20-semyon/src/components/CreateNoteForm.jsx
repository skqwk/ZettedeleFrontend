import React, {useEffect, useMemo, useState} from 'react';
import Modal from "./UI/modal/Modal";
import NoteFormV2 from "./NoteFormV2";
import {createNoteEvent, removeNoteEvent} from "../store/vaultReducer";
import {useDispatch} from "react-redux";
import {useProfile} from "../hooks/useProfile";
import {useNote} from "../hooks/useNote";
import {NoteManager} from "../core/NoteManager";

const CreateNoteForm = ({vaultId, newNoteId, ...props}) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const nowUser = useProfile();
    const note = useNote(vaultId, newNoteId);

    const close = () => {
        NoteManager.flushUpdates(newNoteId);
        setVisible(false);
    }

    useEffect(() => {
        if (newNoteId !== null) {
            let payload = {vaultId, noteId: newNoteId, nowUser};

            console.log('Payload in createNoteForm');
            console.log(payload);

            dispatch(createNoteEvent(payload))
            setVisible(true);
        }
    }, [newNoteId])

    const remove = () => {
        let payload = {vaultId, noteId: newNoteId, nowUser};
        dispatch(removeNoteEvent(payload))
        NoteManager.flushUpdates(newNoteId);
        setVisible(false);
        console.log('Remove note');
    }

    //
    // const deleteNote = () => {
    //     if (formNote.id) {
    //         dispatch(removeNoteEvent({noteId: formNote.id, vaultId: formNote.vaultId}));
    //     }
    //     setVisible(false);
    // }

    return (
        <div>
            <Modal visible={visible} close={close} contentBackground={'white'}>
                {visible && <NoteFormV2
                    address={{vaultId, noteId: newNoteId}}
                    remove={remove}
                    visible={visible}
                    setVisible={setVisible}
                    formNote={note}/>}
            </Modal>
        </div>
    );
};

export default CreateNoteForm;