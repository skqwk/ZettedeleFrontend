import React, {useEffect, useRef} from 'react';
import classes from "./Paragraph.module.css";
import useAutosizeTextArea from "../../../hooks/useAutosizeTextArea";
import {useDispatch} from "react-redux";
import {removeParagraphEvent, updateParagraphEvent} from "../../../store/vaultReducer";
import useAutosizeTextAreaInit from "../../../hooks/useAutosizeTextAreaInit";
import Divider from "../divider/Divider";
import {useProfile} from "../../../hooks/useProfile";
import Sidebar from "./sidebar/Sidebar";
import SidebarButton from "./sidebar/SidebarButton";

const Paragraph = ({paragraph, address, ...props}) => {
    const dispatch = useDispatch();
    const nowUser = useProfile();

    const textAreaRef = useRef(null);

    // Для установки начальной высоты области для ввода текста
    useAutosizeTextArea(textAreaRef.current, paragraph.content);
    useEffect(() => useAutosizeTextAreaInit(textAreaRef.current), [])

    const updateContent = (e) => {
        dispatch(updateParagraphEvent({...address, id: paragraph.id, content: e.target.value, nowUser}));
    }

    const remove = () => {
        dispatch(removeParagraphEvent({...address, id: paragraph.id, nowUser}));
    }

    return (
        <div style={{position: 'relative'}}>
            <textarea
                ref={textAreaRef}
                onChange={updateContent}
                value={paragraph.content}
                className={classes.paragraph} {...props}>

            </textarea>
            <Sidebar>
                <SidebarButton onClick={e => remove()}/>
            </Sidebar>
            <Divider address={address} prev={paragraph.id} next={paragraph.next}/>
        </div>
    );
};

export default Paragraph;