import React, {useEffect, useState} from 'react';
import {useVault} from "../../../hooks/useVault";
import classes from './NoteMenu.module.css';
import Input from "../input/Input";

const NoteMenu = ({links, visible, vaultId, noteId, setLinkedNote}) => {

    const vault = useVault(vaultId);
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setFilteredNotes(notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase())))
    }, [search])


    useEffect(() => {
        console.log(vault);
        let foundedNotes = vault.notes.filter(note => note.deleted === false && !links.has(note.id) && note.id !== noteId);
        setNotes(foundedNotes);
        setFilteredNotes(foundedNotes);
    }, [vault])

    const formatTitle = (title) => {
        let newTitle = title.substring(0, 45);
        if (title.length > 44) {
            title.concat("...");
        }
        return newTitle;
    }

    return (
        visible &&
        <div>
            <Input inputName="ПОИСК ЗАМЕТКИ ДЛЯ ДОБАВЛЕНИЯ ССЫЛКИ" onChange={e => setSearch(e.target.value)} value={search}/>
            <div className={classes.menu}>
                {filteredNotes.map(note =>
                    <div key={note.id} className={classes.menuItem} onClick={() => setLinkedNote(note.id)}>
                        {formatTitle(note.title)}
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default NoteMenu;