import React from 'react';

const NoteCard = ({note, remove, ...props}) => {

    const colors = ['#F59475', '#F9C975', '#E4F693', '#B388F9', '#13E8FB'];

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
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <div className="noteCardControl">
                <p className='noteDate'>{note.date}</p>
                <span role="img" aria-label="delete" onClick={removeNote}>🗑️</span>
            </div>
        </div>
    );
};

export default NoteCard;