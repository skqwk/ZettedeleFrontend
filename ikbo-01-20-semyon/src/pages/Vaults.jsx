import React, {useEffect, useState} from 'react';
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import Select from "../components/UI/select/Select";
import RoundButton from "../components/UI/roundbutton/RoundButton";
import {useNotes} from "../hooks/useNotes";
import {vaults} from "../utils/constants";
import {useVaults} from "../hooks/useVaults";
import Modal from "../components/UI/modal/Modal";
import NoteForm from "../components/NoteForm";

const Vaults = () => {
    const [nowVault, setNowVault] = useState('');
    const [query, setQuery] = useState('');
    const [notes, setNotes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [formNote, setFormNote] = useState({content: '', title: '', color: 'white'})
    const searchedNotes = useNotes(notes, query);
    useVaults(nowVault, vaults, setNotes);

    const onlyVaults = Object.values(vaults).map(v => ({'name': v.name, 'value': v.value}));

    useEffect(() => {
        if (nowVault.trim()) {
            setDisabled(false);
        }
    }, [nowVault])

    const createNewVault = (e) => {
        console.log("Create new vault");
    }

    const openNoteForm = () => {
        setVisible(true);
    }

    const saveNote = (note) => {
        let updatedNotes = [...notes];
        let noteIndex = updatedNotes.findIndex(n => n.id === note.id);
        if (noteIndex > -1) {
            console.log("Update note", note);
            updatedNotes[noteIndex] = note;
        } else {
            console.log("New note", note);
            updatedNotes = [...notes, note];
        }
        setNotes(updatedNotes);
    }

    useEffect(() => {
        console.log("Notes were updated");
    }, [notes])

    const removeNote = (id) => {
        let filteredNotes = notes.filter(note => note.id !== id);
        setNotes(filteredNotes);
    }

    return (<div>
        <Modal visible={visible} setVisible={setVisible} contentBackground={formNote.color}>
            <NoteForm save={saveNote}
                      remove={removeNote}
                      visible={visible}
                      setVisible={setVisible}
                      setFormNote={setFormNote}
                      formNote={formNote}/>
        </Modal>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
            <SearchBar query={query} setQuery={setQuery}/>
            <RoundButton disabled={disabled} onClick={openNoteForm}>
                <span role="img" aria-label="pen">✎</span></RoundButton>
            <Select
                defaultValue="Выбор хранилища"
                value={nowVault}
                onChange={setNowVault}
                options={onlyVaults}/>
            <RoundButton onClick={createNewVault}>+</RoundButton>
        </div>
        <NoteList setFormNote={setFormNote}
                  setVisible={setVisible}
                  notes={searchedNotes}
                  remove={removeNote}
                  save={saveNote}/>
    </div>);
};

export default Vaults;