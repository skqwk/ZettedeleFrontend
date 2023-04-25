import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadNotesEvent} from "../store/vaultReducer";
import SearchBar from "../components/SearchBar";
import RoundButton from "../components/UI/roundbutton/RoundButton";
import Select from "../components/UI/select/Select";
import {useVault} from "../hooks/useVault";
import NoteListV2 from "../components/note/v2/NoteListV2";
import EditNoteForm from "../components/note/v2/EditNoteForm";
import CreateNoteForm from "../components/note/v2/CreateNoteForm";
import {useProfile} from "../hooks/useProfile";
import CreateVaultForm from "../components/note/v2/CreateVaultForm";
import EditVaultForm from "../components/note/v2/EditVaultForm";


const Notes = () => {
    const [vaultId, setVaultId] = useState('');
    const [noteId, setNoteId] = useState(null);

    const [isOpenCreateNoteForm, setOpenCreateNoteForm] = useState(false);
    const [isOpenCreateVaultForm, setOpenCreateVaultForm] = useState(false);
    const [isOpenEditVaultForm, setOpenEditVaultForm] = useState(false);

    const vault = useVault(vaultId);
    const vaultNames = useSelector(state => state.vault.vaults
        .filter(v => !v.deleted)
        .map(v => ({value: v.id, name: v.name})))

    const dispatch = useDispatch();
    const nowUser = useProfile();

    const notes = vault.notes.filter(note => note.deleted === false);

    const [query, setQuery] = useState('');
    const address = {noteId, vaultId};


    useEffect(() => {
        dispatch(loadNotesEvent({username: nowUser}));
    }, [])
    const openCreateNewVault = () => {
        setOpenCreateVaultForm(true);
    }

    const openCreateNoteForm = () => {
        setOpenCreateNoteForm(true);
    }

    const openEditVaultForm = () => {
        setOpenEditVaultForm(true);
    }

    return (
        <div>

            <CreateNoteForm vaultId={vaultId} isOpenCreateForm={isOpenCreateNoteForm}
                            setOpenCreateForm={setOpenCreateNoteForm}/>
            <EditNoteForm vaultId={vaultId} noteId={noteId} setNoteId={setNoteId}/>

            <CreateVaultForm visible={isOpenCreateVaultForm} setVisible={setOpenCreateVaultForm}/>
            <EditVaultForm vault={vault} visible={isOpenEditVaultForm} setVisible={setOpenEditVaultForm}
                           setVaultId={setVaultId}/>

            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
                <SearchBar query={query} setQuery={setQuery}/>
                <RoundButton disabled={vaultId === ''} onClick={openCreateNoteForm}>
                    <span role="img" aria-label="pen">✎</span></RoundButton>
                <Select
                    defaultValue="Выбор хранилища"
                    value={vaultId}
                    onChange={setVaultId}
                    options={vaultNames}/>
                <RoundButton disabled={vaultId === ''} onClick={openEditVaultForm}>
                    <span role="img" aria-label="setup">⚙️</span></RoundButton>
                <RoundButton onClick={openCreateNewVault}>+</RoundButton>
            </div>

            <NoteListV2 notes={notes}
                        setNoteId={setNoteId}
                        address={address}
            />
        </div>
    );
};
export default Notes;