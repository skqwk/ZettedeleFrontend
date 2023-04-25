import React from 'react';
import NoteCard from "./NoteCard";

const NoteList = ({notes, remove, setVisible, setFormNote}) => {

    const openForm = (note) => {
        console.log(`Click on note ${note.id}`);
        setFormNote(note);
        setVisible(true);
    }

    return (
        <div className="note-list">
            {notes.map((note) =>
                <NoteCard onClick={() => openForm(note)}
                          remove={remove}
                          key={note.id}
                          note={note}/>
            )}
        </div>
    );
};

export default NoteList;