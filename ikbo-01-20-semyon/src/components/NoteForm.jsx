import React, {useEffect, useState} from 'react';
import Input from "./UI/input/Input";
import RoundButton from "./UI/roundbutton/RoundButton";

const NoteForm = ({create, visible, setVisible}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const clearForm = () => {
        setContent('');
        setTitle('');
    }

    useEffect(() => {
        if (!visible) {
            if (title.trim() && content.trim()) {
                create({title, content, id: Date.now(), date: new Date().toLocaleDateString()});
                clearForm();
            }
        }
    }, [visible])

    const deleteNote = () => {
        clearForm();
        setVisible(false);
    }

    return (
        <div>
            <Input placeholder="Заголовок" onChange={e => setTitle(e.target.value)} value={title}/>
            <Input placeholder="Контент" onChange={e => setContent(e.target.value)} value={content}/>
            <RoundButton onClick={deleteNote}><span role="img" aria-label="delete">🗑️</span></RoundButton>
        </div>
    );
};

export default NoteForm;