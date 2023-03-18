import React, {useEffect, useState} from 'react';
import Input from "./UI/input/Input";
import RoundButton from "./UI/roundbutton/RoundButton";
import TextArea from "./UI/textarea/TextArea";

const NoteForm = ({save, visible, setVisible, note}) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const clearForm = () => {
        setContent('');
        setTitle('');
    }

    useEffect(() => {
        if (!visible) {
            if (title.trim() || content.trim()) {
                let id = note.id ? note.id : Date.now();
                save({title, content, id, date: new Date().toLocaleDateString()});
                clearForm();
            }
        }
    }, [visible])

    const deleteNote = () => {
        clearForm();
        setVisible(false);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Input placeholder="Заголовок" onChange={e => setTitle(e.target.value)} value={title}/>
            <TextArea placeholder="Напишите, о чем вы думаете..."
                      onChange={e => setContent(e.target.value)}
                      value={content}
                      rows="10"
                      cols="50"/>
            <div>
                <RoundButton onClick={deleteNote}><span role="img" aria-label="delete">🗑️</span></RoundButton>
            </div>
        </div>
    );
};

export default NoteForm;