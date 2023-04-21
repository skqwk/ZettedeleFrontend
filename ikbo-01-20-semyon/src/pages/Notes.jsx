import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Modal from "../components/UI/modal/Modal";
import NoteFormV2 from "../components/NoteFormV2";
import {useNote} from "../hooks/useNote";
import {loadNotesEvent} from "../store/vaultReducer";
import SearchBar from "../components/SearchBar";
import RoundButton from "../components/UI/roundbutton/RoundButton";
import Select from "../components/UI/select/Select";
import {useVault} from "../hooks/useVault";

const Notes = () => {
    const [nowVault, setNowVault] = useState('study');
    const [nowNote, setNowNote] = useState('note1');
    const [visible, setVisible] = useState(true);
    const formNote = useNote(nowVault, nowNote);
    const vault = useVault(nowVault);
    const onlyVaults = useSelector(state => state.vault.vaults.map(v => ({value: v.id, name: v.name})))
    const dispatch = useDispatch();
    const nowUser = useSelector(state => state.profile.name);
    // const [formNote, setFormNote] = useState({content: '', title: '', color: 'white'})

    const [query, setQuery] = useState('');

    const createNewVault = () => {
        console.log("Create new Vault");
    }

    const openNoteForm = () => {
        setVisible(true);
    }

    useEffect(() => {
        dispatch(loadNotesEvent({username: nowUser}));
    }, [])

    return (
        <div>
            <Modal visible={visible} setVisible={setVisible} contentBackground={formNote.color}>
                <NoteFormV2
                    address={{noteId: nowNote, vaultId: nowVault}}
                    visible={visible}
                    setVisible={setVisible}
                    formNote={formNote}/>
            </Modal>

            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
                <SearchBar query={query} setQuery={setQuery}/>
                <RoundButton disabled={true} onClick={openNoteForm}>
                    <span role="img" aria-label="pen">✎</span></RoundButton>
                <Select
                    defaultValue="Выбор хранилища"
                    value={nowVault}
                    onChange={setNowVault}
                    options={onlyVaults}/>
                <RoundButton onClick={createNewVault}>+</RoundButton>
            </div>
        </div>
    );
};
export default Notes;