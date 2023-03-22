import React, {useEffect} from 'react';
import Input from "./UI/input/Input";
import RoundButton from "./UI/roundbutton/RoundButton";
import TextArea from "./UI/textarea/TextArea";
import ColorBox from "./UI/colorbox/ColorBox";

const NoteForm = ({save, remove, visible, setVisible, formNote, setFormNote}) => {

    const clearForm = () => {
        setFormNote({title: '', content: '', color: 'white'});
    }

    useEffect(() => {
        if (!visible) {
            if (!isFormEmpty(formNote)) {
                enrichFormNote(formNote);
                save(formNote);
            }
            clearForm();
        }
    }, [visible])

    const enrichFormNote = (formNote) => {
        formNote.id = formNote.id
            ? formNote.id
            : Date.now()
        formNote.date = new Date().toLocaleDateString();
    }
    const isFormEmpty = (formNote) => {
        return formNote.content.trim().length === 0
            && formNote.title.trim().length === 0;
    }

    const deleteNote = () => {
        if (formNote.id) {
            console.log("remove note");
            remove(formNote.id);
        }
        clearForm();
        setVisible(false);
    }

    const defineColor = (note) => {
        return note.color
            ? note.color
            : colors[0];
    }

    const colors = ['#F59475', '#F9C975', '#E4F693', '#B388F9', '#13E8FB', 'white'];

    const chooseColor = (color) => {
        console.log("Choose color");
        setFormNote({...formNote, color: color});
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: defineColor(formNote),
            transition: '0.3s'
        }}>
            <Input placeholder="Заголовок"
                   onChange={e => setFormNote({...formNote, title: e.target.value})}
                   value={formNote.title}/>
            <TextArea placeholder="Напишите, о чем вы думаете..."
                      onChange={e => setFormNote({...formNote, content: e.target.value})}
                      value={formNote.content}
                      rows="10"
                      cols="50"/>
            <div style={{display: 'flex', alignItems: "center"}}>
                <RoundButton onClick={deleteNote}><span role="img" aria-label="delete">🗑️</span></RoundButton>
                <div style={{display: 'flex', alignItems: "center"}}>
                    {colors.map((color, id) =>
                        <ColorBox chosen={formNote.color === color}
                                  key={id}
                                  color={color}
                                  onClick={e => chooseColor(color)}
                        />)}
                </div>
            </div>
        </div>
    );
};

export default NoteForm;