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
        let updatedNotes = notes;
        let noteIndex = updatedNotes.findIndex(n => n.id === note.id);
        if (noteIndex > -1) {
            updatedNotes[noteIndex] = note;
        } else {
            console.log("New note", note);
            updatedNotes = [...notes, note];
        }
        setNotes(updatedNotes);
        vaults[nowVault].notes = updatedNotes;
    }

    const removeNote = (id) => {
        let filteredNotes = notes.filter(note => note.id !== id);
        setNotes(filteredNotes);
    }

    return (<div>
        <Modal visible={visible} setVisible={setVisible}>
            <NoteForm save={saveNote}
                      visible={visible}
                      setVisible={setVisible}
                      note={{content: '', title: ''}}/>
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
        <NoteList notes={searchedNotes}
                  remove={removeNote}
                  save={saveNote}/>
    </div>);
};

export default Vaults;