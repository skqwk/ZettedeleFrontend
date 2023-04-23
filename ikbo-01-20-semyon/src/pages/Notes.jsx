import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadNotesEvent} from "../store/vaultReducer";
import SearchBar from "../components/SearchBar";
import RoundButton from "../components/UI/roundbutton/RoundButton";
import Select from "../components/UI/select/Select";
import {useVault} from "../hooks/useVault";
import NoteListV2 from "../components/NoteListV2";
import EditNoteForm from "../components/EditNoteForm";
import CreateNoteForm from "../components/CreateNoteForm";
import {useProfile} from "../hooks/useProfile";
import {v4} from 'uuid';


const Notes = () => {
    const [vaultId, setVaultId] = useState('study');
    const [noteId, setNoteId] = useState(null);

    const vault = useVault(vaultId);
    const vaultNames = useSelector(state => state.vault.vaults.map(v => ({value: v.id, name: v.name})))

    const dispatch = useDispatch();
    const nowUser = useProfile();

    const [query, setQuery] = useState('');
    const address = {noteId, vaultId};

    const createNewVault = () => {
        console.log("Create new Vault");
    }

    useEffect(() => {
        dispatch(loadNotesEvent({username: nowUser}));
    }, [])

    const [newNoteId, setNewNoteId] = useState(null);

    const openCreateNoteForm = () => {
        setNewNoteId(v4());
    }

    return (
        <div>
            <CreateNoteForm vaultId={vaultId} newNoteId={newNoteId}/>
            <EditNoteForm vaultId={vaultId} noteId={noteId} setNoteId={setNoteId}/>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
                <SearchBar query={query} setQuery={setQuery}/>
                <RoundButton disabled={false} onClick={openCreateNoteForm}>
                    <span role="img" aria-label="pen">✎</span></RoundButton>
                <Select
                    defaultValue="Выбор хранилища"
                    value={vaultId}
                    onChange={setVaultId}
                    options={vaultNames}/>
                <RoundButton onClick={createNewVault}>+</RoundButton>
            </div>

            <NoteListV2 notes={vault.notes.filter(note => note.deleted === false)}
                        setNoteId={setNoteId}
                        address={address}
            />
        </div>
    );
};
export default Notes;