import React, {useEffect, useState} from 'react';
import Input from "./UI/input/Input";
import RoundButton from "./UI/roundbutton/RoundButton";
import TextArea from "./UI/textarea/TextArea";
import ColorBox from "./UI/colorbox/ColorBox";
import {useDispatch, useSelector} from "react-redux";
import {createParagraphEvent, removeNoteEvent} from "../store/vaultReducer";
import Paragraph from "./Paragraph";
import classes from "./Paragraph.module.css";
import Divider from "./UI/divider/Divider";
import noteForm from "./NoteForm";

const NoteFormV2 = ({save, visible, setVisible, address}) => {
    const dispatch = useDispatch();
    const offline = useSelector(state => state.connection.offline);
    const nowUser = useSelector(state => state.user.name);

    const getNoteByVaultIdAndNoteId = (vaults, vaultId, noteId) => {
        let note = vaults
            .find(v => v.id === vaultId)
            .notes
            .find(n => n.id === noteId);

        console.log(note);
        return note;
    }
    const formNote = useSelector(state => getNoteByVaultIdAndNoteId(state.vault.vaults, address.vaultId, address.noteId));

    useEffect(() => {
        // console.log('Form note is changed!');
        // console.log(formNote);
    }, [formNote])

    //const formNote = useSelector(state => getNoteByVaultIdAndNoteId(state.vault.vaults, address.vaultId, address.noteId))

    // const clearForm = () => {
    //     setFormNote({title: '', content: '', color: 'white'});
    // }

    // useEffect(() => {
    //     if (!visible) {
    //         if (!isFormEmpty(formNote)) {
    //             enrichFormNote(formNote);
    //             dispatch(removeNoteEvent({noteId: formNote.id, vaultId: formNote.vaultId}));
    //             save(formNote);
    //         }
    //         clearForm();
    //     }
    // }, [visible])
    //
    // const enrichFormNote = (formNote) => {
    //     formNote.id = formNote.id
    //         ? formNote.id
    //         : Date.now()
    //     formNote.date = new Date().toLocaleDateString();
    // }
    // const isFormEmpty = (formNote) => {
    //     return formNote.content.trim().length === 0
    //         && formNote.title.trim().length === 0;
    // }
    //
    // const deleteNote = () => {
    //     if (formNote.id) {
    //         dispatch(removeNoteEvent({noteId: formNote.id, vaultId: formNote.vaultId}));
    //     }
    //     clearForm();
    //     setVisible(false);
    // }

    const defineColor = (note) => {
        return note.color
            ? note.color
            : colors[0];
    }

    const colors = ['white', '#F59475', '#F9C975', '#E4F693', '#B388F9', '#13E8FB', 'white'];

    // const chooseColor = (color) => {
    //     console.log("Choose color");
    //     setFormNote({...formNote, color: color});
    // }

    const getParagraphs = (formNote) => {
        const paragraphsMap = formNote.paragraphs;
        let nowParagraph = paragraphsMap[formNote.head];
        let paragraphs = [];
        while (nowParagraph) {
            paragraphs.push(nowParagraph);

            nowParagraph = nowParagraph.next
                ? paragraphsMap[nowParagraph.next]
                : null
        }
        return paragraphs;
    }

    const paragraphs = getParagraphs(formNote);

    return (
        <div style={{
            width: '600px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: defineColor(formNote),
            transition: '0.3s'
        }}>
            <Input placeholder="Заголовок"
                   // onChange={e => setFormNote({...formNote, title: e.target.value})}
                   value={formNote.name}/>
            <Divider address={address} prev={null} next={formNote.head}/>
            {paragraphs.map(paragraph =>
                <Paragraph
                    paragraph={paragraph}
                    key={paragraph.id}
                    address={address}/>
            )
            }
            <div style={{display: 'flex', alignItems: "center"}}>
                <RoundButton ><span role="img" aria-label="delete">🗑️</span></RoundButton>
                <div style={{display: 'flex', alignItems: "center"}}>
                    {colors.map((color, id) =>
                        <ColorBox chosen={formNote.color === color}
                                  key={id}
                                  color={color}
                                  // onClick={e => chooseColor(color)}
                        />)}
                </div>
            </div>
        </div>
    );
};

export default NoteFormV2;