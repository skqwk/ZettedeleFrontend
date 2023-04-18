import React, {useEffect, useRef, useState} from 'react';
import classes from "./Paragraph.module.css";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import {useDispatch, useSelector} from "react-redux";
import {createParagraphEvent, removeParagraphEvent, updateParagraphEvent} from "../store/vaultReducer";
import useAutosizeTextAreaInit from "../hooks/useAutosizeTextAreaInit";

const Paragraph = ({paragraph, address, ...props}) => {
    const dispatch = useDispatch();
    const nowUser = useSelector(state => state.user.name);

    const textAreaRef = useRef(null);

    // Для установки начальной высоты области для ввода текста
    useAutosizeTextArea(textAreaRef.current, paragraph.content);
    useEffect(() => useAutosizeTextAreaInit(textAreaRef.current), [])

    const updateContent = (e) => {
        let text = e.target.value;
        if (text.length === 0) {
            dispatch(removeParagraphEvent({...address, id: paragraph.id}));
        }
        dispatch(updateParagraphEvent({...address, id: paragraph.id, content: text, nowUser}))
    }

    return (
        <div>
            <textarea
                ref={textAreaRef}
                onChange={updateContent}
                value={paragraph.content}
                className={classes.paragraph} {...props}>

            </textarea>
            <div className={classes.dividerContainer}>
                <div className={classes.divider}/>
                <div className={classes.add}
                     onClick={e => dispatch(createParagraphEvent({...address, id: paragraph.id, next: paragraph.next}))}
                >+</div>
                <div className={classes.divider}/>
            </div>

        </div>
    );
};

export default Paragraph;