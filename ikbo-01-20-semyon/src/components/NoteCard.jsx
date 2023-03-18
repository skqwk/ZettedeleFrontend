import React, {useState} from 'react';
import Modal from "./UI/modal/Modal";
import NoteForm from "./NoteForm";

const NoteCard = ({note, remove,}) => {

    const colors = ['#F59475', '#F9C975', '#E4F693', '#B388F9', '#13E8FB'];
    const [visible, setVisible] = useState(false);

    const showForm = (e) => {
        setVisible(true);
    }

    return (
        <div className="noteCard"
             style={{background: colors[note.id % colors.length]}}
             onClick={showForm}>
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <div className="noteCardControl">
                <p className='noteDate'>{note.date}</p>
                <span role="img" aria-label="delete" onClick={e => remove(note.id)}>🗑️</span>
            </div>
        </div>
    );
};

export default NoteCard;