import React from 'react';
import Input from "../../UI/input/Input";
import {useDispatch} from "react-redux";
import Paragraph from "../../UI/paragraph/Paragraph";
import Divider from "../../UI/divider/Divider";
import {createParagraphEvent, updateNoteEvent} from "../../../store/vaultReducer";
import {getParagraphs} from "../../../core/getParagraphs";
import {useProfile} from "../../../hooks/useProfile";
import NoteFormLink from "./NoteFormLink";
import NoteToolBar from "./NoteToolBar";
import {colors} from "../../../core/ui/colors";

const NoteFormV2 = ({address, formNote, remove, setNoteId}) => {
    const dispatch = useDispatch();
    const paragraphs = getParagraphs(formNote);
    const nowUser = useProfile();

    const defineColor = (note) => {
        return note.color
            ? note.color
            : colors.white;
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
            <Divider click={() => dispatch(createParagraphEvent({
                ...address, prev: null, next: formNote.head, nowUser
            }))}/>
            {paragraphs.map(paragraph =>
                <Paragraph
                    style={{backgroundColor: defineColor(formNote)}}
                    paragraph={paragraph}
                    key={paragraph.id}
                    address={address}/>
            )
            }
            <NoteFormLink links={formNote.links} address={address} setNoteId={setNoteId}/>
            <NoteToolBar remove={remove} chooseColor={chooseColor} formNoteColor={formNote.color}/>
        </div>
    );
};

export default NoteFormV2;