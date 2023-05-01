import React from 'react';
import Sidebar from "../paragraph/sidebar/Sidebar";
import SidebarButton from "../paragraph/sidebar/SidebarButton";
import {NoteManager} from "../../../core/NoteManager";

const NoteItem = ({link, remove, setNoteId, parentNote}) => {
    const openLink = (noteId) => {
        console.log(`Open link note with id = ${noteId}`);
        NoteManager.flushUpdates(parentNote);
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