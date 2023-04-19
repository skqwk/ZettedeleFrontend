import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Modal from "../components/UI/modal/Modal";
import NoteFormV2 from "../components/NoteFormV2";
import {useNote} from "../hooks/useNote";

const Notes = () => {
    const [nowVault, setNowVault] = useState('study');
    const [nowNote, setNowNote] = useState('note1');
    const [visible, setVisible] = useState(true);
    const formNote = useNote(nowVault, nowNote);
    const dispatch = useDispatch();
    // const [formNote, setFormNote] = useState({content: '', title: '', color: 'white'})

    const openNoteForm = () => {
        setVisible(true);
    }

    return (
        <div>
            <Modal visible={visible} setVisible={setVisible} contentBackground={formNote.color}>
                <NoteFormV2
                    address={{noteId: nowNote, vaultId: nowVault}}
                    visible={visible}
                    setVisible={setVisible}
                    formNote={formNote}/>
            </Modal>
        </div>
    );
};
export default Notes;