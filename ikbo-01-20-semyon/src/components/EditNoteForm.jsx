import React, {useEffect, useState} from 'react';
import Modal from "./UI/modal/Modal";
import NoteFormV2 from "./NoteFormV2";
import {useNote} from "../hooks/useNote";
import {removeNoteEvent} from "../store/vaultReducer";
import {NoteManager} from "../core/NoteManager";
import {useDispatch} from "react-redux";
import {useProfile} from "../hooks/useProfile";

const EditNoteForm = ({vaultId, noteId, setNoteId, ...props}) => {
    const [visible, setVisible] = useState(false);
    const formNote = useNote(vaultId, noteId);
    const dispatch = useDispatch();
    const nowUser = useProfile();

    const close = () => {
        NoteManager.flushUpdates(noteId);
        setVisible(false);
        setNoteId(null);
    }

    useEffect(() => {
        if (noteId !== null) {
            setVisible(true);
        }
    }, [noteId])

    const remove = () => {
        let payload = {vaultId, noteId: noteId, nowUser};
        dispatch(removeNoteEvent(payload))
        NoteManager.flushUpdates(noteId);
        console.log('Remove note');
    }


    return (
        <div>
            <Modal visible={visible} close={close} backgroundColor={'white'}>
                {visible && <NoteFormV2
                    address={{vaultId, noteId}}
                    remove={remove}
                    formNote={formNote}/>}
            </Modal>
        </div>
    );
};

export default EditNoteForm;