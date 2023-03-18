import React from 'react';
import NoteCard from "./NoteCard";

const NoteList = ({notes, remove, save}) => {

    return (
        <div className="note-list">
            {notes.map((note) =>
                    <NoteCard remove={remove} key={note.id} note={note} saveNote={save}/>
            )}
        </div>
    );
};

export default NoteList;