import React, {useEffect} from 'react';
import NoteCardV2 from "./NoteCardV2";

const NoteListV2 = ({notes, setNoteId, address}) => {

    const openForm = (id) => {
        console.log(`Click on note ${id}`);
        setNoteId(id);
    }

    useEffect(() => {
        console.log('Notes in NoteListV2');
        console.log(notes);
    }, [])

    return (
        <div className="note-list">
            {notes.map((note) =>
                <NoteCardV2 onClick={e => openForm(note.id)}
                            address={address}
                            key={note.id}
                            note={note}/>
            )}
        </div>
    );
};

export default NoteListV2;