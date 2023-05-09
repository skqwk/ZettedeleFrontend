import React from 'react';
import {getParagraphs} from "../../../core/getParagraphs";

const NoteCardV2 = ({note, remove, ...props}) => {

    const content = getParagraphs(note)
        .map(paragraph => paragraph.content)
        .join(" ")
        .substring(0, 180)
        .concat("...");

    const removeNote = (e) => {
        e.stopPropagation();
        remove(note.id);
    }

    return (
        <div className="noteCard"
             style={{background: note.color}}
             {...props}>
            <h4>{note.title.substring(0, 40)}</h4>
            <p>{content}</p>
            <div className="noteCardControl">
                <p className='noteDate'>{note.createdAt}</p>
                <span role="img" aria-label="delete" onClick={removeNote}>🗑️</span>
            </div>
        </div>
    );
};

export default NoteCardV2;