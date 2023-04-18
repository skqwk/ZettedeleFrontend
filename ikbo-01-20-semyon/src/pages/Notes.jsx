import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Modal from "../components/UI/modal/Modal";
import SearchBar from "../components/SearchBar";
import RoundButton from "../components/UI/roundbutton/RoundButton";
import Select from "../components/UI/select/Select";
import {useNotes} from "../hooks/useNotes";
import NoteListV2 from "../components/NoteListV2";
import NoteFormV2 from "../components/NoteFormV2";
import {createVaultEvent} from "../store/vaultReducer";

const Notes = () => {
    const [nowVault, setNowVault] = useState('study');
    const [nowNote, setNowNote] = useState('note1');
    const nowUser = useSelector(state => state.user.name);
    const getNoteByVaultIdAndNoteId = (vaults, vaultId, noteId) => {
        console.log(vaults);

        let note = vaults
            .find(v => v.id === vaultId)
            .notes
            .find(n => n.id === noteId);

        console.log(note);
        return note;
    }
    const dispatch = useDispatch();
    const formNote = useSelector(state => getNoteByVaultIdAndNoteId(state.vault.vaults, nowVault, nowNote))




    const [visible, setVisible] = useState(true);
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