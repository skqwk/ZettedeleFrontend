import React from 'react';
import Sidebar from "../paragraph/sidebar/Sidebar";
import SidebarButton from "../paragraph/sidebar/SidebarButton";
import {useProfile} from "../../../hooks/useProfile";
import {FlushUpdater} from "../../../core/filesystem/FlushUpdater";

const NoteItem = ({link, remove, setNoteId, parentNote, vaultId}) => {
    const nowUser = useProfile();

    const openLink = (noteId) => {
        console.log(`Open link note with id = ${noteId}`);
        FlushUpdater.flushUpdates(parentNote, vaultId, nowUser);
        setNoteId(noteId);
    }

    return (
        <div style={{position: 'relative', padding: '5px'}}>
            <a href="#" onClick={() => openLink(link.id)} style={{color: "blue", fontSize: "18px"}}>
                {link.title}
            </a>
            <Sidebar>
                <SidebarButton onClick={() => remove(link.id)}/>
            </Sidebar>
        </div>
    );
};

export default NoteItem;