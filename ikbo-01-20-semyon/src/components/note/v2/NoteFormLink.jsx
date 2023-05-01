import React, {useEffect, useState} from 'react';
import Header from "../../UI/header/Header";
import Divider from "../../UI/divider/Divider";
import NoteMenu from "../../UI/notemenu/NoteMenu";
import Modal from "../../UI/modal/Modal";
import {useDispatch} from "react-redux";
import {addNoteLinkEvent, removeNoteLinkEvent} from "../../../store/vaultReducer";
import Sidebar from "../../UI/paragraph/sidebar/Sidebar";
import SidebarButton from "../../UI/paragraph/sidebar/SidebarButton";
import {useVault} from "../../../hooks/useVault";
import {useNote} from "../../../hooks/useNote";
import NoteItem from "../../UI/notemenu/NoteItem";
import {useProfile} from "../../../hooks/useProfile";

const NoteFormLink = ({links, address}) => {
    const [visibleNoteMenu, setVisibleNoteMenu] = useState(false);
    const [linkedNote, setLinkedNote] = useState(null);
    const dispatch = useDispatch();
    const sharedLinks = useVault(address.vaultId).notes
        .filter(n => !n.deleted && links.has(n.id))
    const nowUser = useProfile();

    useEffect(() => {
        if (linkedNote) {
            setVisibleNoteMenu(false);
            dispatch(addNoteLinkEvent({...address, link: linkedNote, nowUser}));
        }
    }, [linkedNote])
    const openNoteMenu = () => {
        console.log("Add link");
        setVisibleNoteMenu(true);
    }

    const remove = (link) => {
        dispatch(removeNoteLinkEvent({...address, link, nowUser}));
    }

    return (
        <div style={{display: 'flex', flexDirection: "column"}}>
            <Header size={18} mt={"30px"} mb={"5px"}>ССЫЛКИ</Header>
            <div style={{display: 'flex', flexDirection: "column"}}>
                {
                    sharedLinks.map(
                        link =>
                        <NoteItem link={link} remove={remove}/>
                    )
                }
            </div>
            <Divider click={openNoteMenu}/>
            <Modal visible={visibleNoteMenu} close={() => setVisibleNoteMenu(false)}>
                <NoteMenu
                    links={links}
                    visible={visibleNoteMenu}
                    vaultId={address.vaultId}
                    noteId={address.noteId}
                    setLinkedNote={setLinkedNote}
                />
            </Modal>
        </div>
    );
};

export default NoteFormLink;