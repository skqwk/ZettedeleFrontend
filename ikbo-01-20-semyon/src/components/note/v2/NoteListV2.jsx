import React, {useEffect} from 'react';
import NoteCardV2 from "./NoteCardV2";
import {removeNoteEvent} from "../../../store/vaultReducer";
import {NoteManager} from "../../../core/NoteManager";
import {useProfile} from "../../../hooks/useProfile";
import {useDispatch} from "react-redux";
import {FlushUpdater} from "../../../core/filesystem/FlushUpdater";

const NoteListV2 = ({notes, setNoteId, address}) => {
    const dispatch = useDispatch();
    const nowUser = useProfile();

    const openForm = (id) => {
        setNoteId(id);
    }

    useEffect(() => {
        console.log('Note is NoteListV2');
        console.log(notes);
    }, [notes])

    const remove = (noteId) => {
        let payload = {vaultId: address.vaultId, noteId: noteId, nowUser};
        dispatch(removeNoteEvent(payload))
        FlushUpdater.flushUpdates(noteId, address.vaultId, nowUser);
    }

    return (
        <div className="note-list">
            {notes
                .map((note) =>
                    <NoteCardV2 onClick={() => openForm(note.id)}
                                key={note.id}
                                remove={remove}
                                note={note}/>
                )}
        </div>
    );
};

export default NoteListV2;