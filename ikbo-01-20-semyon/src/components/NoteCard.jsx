import React from 'react';

const NoteCard = ({note}) => {

    const colors = ['#F59475', '#F9C975', '#E4F693', '#B388F9', '#13E8FB'];

    return (
        <div className="note-card" style={{background: colors[note.id % colors.length]}}>
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <p className='note-date'>{note.date}</p>
        </div>
    );
};

export default NoteCard;