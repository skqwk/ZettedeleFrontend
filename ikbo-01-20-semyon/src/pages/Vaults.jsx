import React, {useState} from 'react';
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import Select from "../components/UI/select/Select";
import RoundButton from "../components/UI/roundbutton/RoundButton";
import {useNotes} from "../hooks/useNotes";
import {vaults} from "../utils/constants";
import {useVaults} from "../hooks/useVaults";

const Vaults = () => {
    const [nowVault, setNowVault] = useState('');
    const [query, setQuery] = useState('');
    const [notes, setNotes] = useState([]);
    const searchedNotes = useNotes(notes, query);
    useVaults(nowVault, vaults, setNotes);

    const onlyVaults = Object.values(vaults).map(v => ({'name': v.name, 'value': v.value}));

    const createNewVault = (e) => {
        console.log("Create new vault");
    }

    const createNewNote = (e) => {
        console.log("Create new note");
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
                <SearchBar query={query} setQuery={setQuery}/>
                <RoundButton onClick={createNewNote}><span role="img" aria-label="pen">✎</span></RoundButton>
                <Select
                    defaultValue="Выбор хранилища"
                    value={nowVault}
                    onChange={setNowVault}
                    options={onlyVaults}/>
                <RoundButton onClick={createNewVault}>+</RoundButton>
            </div>
            <NoteList notes={searchedNotes}/>
        </div>
    );
};

export default Vaults;