import React from 'react';
import NoteCard from "./NoteCard";

const NoteList = ({notes}) => {
    const remove = () => {
        console.log("Call remove note")
    }

    return (
        <div className="note-list">
            {notes.map((note) =>
                    <NoteCard remove={remove} key={note.id} note={note}/>
            )}
        </div>
    );
};

export default NoteList;