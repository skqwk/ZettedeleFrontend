import React from 'react';
import {getParagraphs} from "../core/getParagraphs";

const NoteCardV2 = ({note, remove, ...props}) => {

    const colors = ['#F59475', '#F9C975', '#E4F693', '#B388F9', '#13E8FB'];

    const content = getParagraphs(note)
        .map(paragraph => paragraph.content)
        .join(" ")
        .substring(0, 200)
        .concat("...");

    const removeNote = (e) => {
        e.stopPropagation();
        remove(note.id);
    }

    const defineColor = (note) => {
        return note.color
            ? note.color
            : colors[note.id % colors.length];
    }

    return (
        <div className="noteCard"
             style={{background: defineColor(note)}}
             {...props}>
            <h4>{note.name}</h4>
            <p>{content}</p>
            <div className="noteCardControl">
                <p className='noteDate'>{note.date}</p>
                <span role="img" aria-label="delete" onClick={removeNote}>🗑️</span>
            </div>
        </div>
    );
};

export default NoteCardV2;