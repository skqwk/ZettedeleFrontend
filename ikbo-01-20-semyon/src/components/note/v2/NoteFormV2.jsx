import React from 'react';
import Input from "../../UI/input/Input";
import RoundButton from "../../UI/roundbutton/RoundButton";
import ColorBox from "../../UI/colorbox/ColorBox";
import {useDispatch} from "react-redux";
import Paragraph from "../../UI/paragraph/Paragraph";
import Divider from "../../UI/divider/Divider";
import {updateNoteEvent} from "../../../store/vaultReducer";
import {getParagraphs} from "../../../core/getParagraphs";
import {useProfile} from "../../../hooks/useProfile";

const NoteFormV2 = ({address, formNote, remove}) => {
    const dispatch = useDispatch();
    const paragraphs = getParagraphs(formNote);
    const nowUser = useProfile();
    const colors = ['white', '#F59475', '#F9C975', '#E4F693', '#B388F9', '#13E8FB'];

    const defineColor = (note) => {
        return note.color
            ? note.color
            : colors[0];
    }

    const chooseColor = (color) => {
        console.log("Choose color");
        dispatch(updateNoteEvent({...formNote, updatedData: {color}, ...address, nowUser}));
    }

    const setTitle = (title) => {
        console.log("Set title");
        dispatch(updateNoteEvent({...formNote, updatedData: {title}, ...address, nowUser}));
    }

    return (
        <div style={{
            padding: '20px',
            width: '700px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: formNote.color,
            transition: '0.3s'
        }}>
            <Input placeholder="Заголовок"
                   onChange={e => setTitle(e.target.value)}
                   value={formNote.title}/>
            <Divider address={address} prev={null} next={formNote.head}/>
            {paragraphs.map(paragraph =>
                <Paragraph
                    style={{backgroundColor: defineColor(formNote)}}
                    paragraph={paragraph}
                    key={paragraph.id}
                    address={address}/>
            )
            }
            <div style={{display: 'flex', alignItems: "center"}}>
                <RoundButton onClick={() => remove()}><span role="img" aria-label="delete">🗑️</span></RoundButton>
                <div style={{display: 'flex', alignItems: "center"}}>
                    {colors.map((color, id) =>
                        <ColorBox chosen={formNote.color === color}
                                  key={id}
                                  color={color}
                                  onClick={() => chooseColor(color)}
                        />)}
                </div>
            </div>
        </div>
    );
};

export default NoteFormV2;