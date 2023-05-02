import React, {useEffect, useState} from 'react';
import Modal from "../../UI/modal/Modal";
import NoteFormV2 from "./NoteFormV2";
import {useNote} from "../../../hooks/useNote";
import {removeNoteEvent} from "../../../store/vaultReducer";
import {useDispatch} from "react-redux";
import {useProfile} from "../../../hooks/useProfile";
import {FlushUpdater} from "../../../core/filesystem/FlushUpdater";

const EditNoteForm = ({vaultId, noteId, setNoteId, ...props}) => {
    const [visible, setVisible] = useState(false);
    const formNote = useNote(vaultId, noteId);
    const dispatch = useDispatch();
    const nowUser = useProfile();

    const close = () => {
        FlushUpdater.flushUpdates(noteId, vaultId, nowUser);
        setVisible(false);
        setNoteId(null);
    }

    useEffect(() => {
        if (noteId !== null) {
            setVisible(true);
        }
    }, [noteId])

    const remove = () => {
        setVisible(false);
        let payload = {vaultId, noteId: noteId, nowUser};
        dispatch(removeNoteEvent(payload))
        FlushUpdater.flushUpdates(noteId, vaultId, nowUser);
        console.log('Remove note');
    }


    return (
        <div>
            {visible && <Modal visible={visible} close={close} backgroundColor={formNote.color}>
                <NoteFormV2
                    address={{vaultId, noteId}}
                    setNoteId={setNoteId}
                    remove={remove}
                    formNote={formNote}/>
            </Modal>
            }
        </div>
    );
};

export default EditNoteForm;