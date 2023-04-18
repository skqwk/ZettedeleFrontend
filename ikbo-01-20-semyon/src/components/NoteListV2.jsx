import React from 'react';
import NoteCard from "./NoteCard";

const NoteListV2 = ({notes, setVisible, setFormNote, parentData}) => {

    const openForm = (note) => {
        console.log(`Click on note ${note.id}`);
        setFormNote(note);
        setVisible(true);
    }

    return (
        <div className="note-list">
            {notes.map((note) =>
                <NoteCard onClick={e => openForm(note)}
                          parentData={parentData}
                          key={note.id}
                          note={note}/>
            )}
        </div>
    );
};

export default NoteListV2;