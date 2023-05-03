import React, {useEffect, useState} from 'react';
import Button from "../components/UI/button/Button";
import NoteMenu from "../components/UI/notemenu/NoteMenu";
import Input from "../components/UI/input/Input";
import {useProfile} from "../hooks/useProfile";
import {loadNotesEvent} from "../store/vaultReducer";
import {useDispatch, useSelector} from "react-redux";
import {getCaretPosition} from "../utils/CarretPosition";
import TextArea from "../components/UI/textarea/TextArea";
import {EventService} from "../API/EventService";
import {NoteWebLoader} from "../core/web/NoteWebLoader";

const Test = () => {
    const [token, setToken] = useState('');
    const [visibleNoteMenu, setVisibleNoteMenu] = useState(false);
    const [vaultId, setVaultId] = useState('788d4f16-5cb7-4dec-8190-de8ab9296032');
    const [position, setPosition] = useState({x: 0, y: 0});
    const [linkedNote, setLinkedNote] = useState(null);
    const dispatch = useDispatch();
    const [caret, setCaret] = useState(0);
    const auth = useSelector(state => state.auth);

    const click = () => {
        console.log('Click!');
    }

    const setText = (e) => {
        let cursorPos = e.target.selectionStart;
        let lastChar = e.target.value[cursorPos - 1];
        if (lastChar === '@') {
            setVisibleNoteMenu(true);
        } else if (visibleNoteMenu) {
            setVisibleNoteMenu(false);
        }
        if (e.target.value.length > 0) {
            let caretPosition = getCaretPosition(document.activeElement)
            setPosition({...caretPosition});
        }
        console.log(e);
        setToken(e.target.value);
    }

    useEffect(() => {
        if (linkedNote) {
            let cursorPos = caret;
            console.log(cursorPos);
            let link = `{@note=${linkedNote}} `
            let before = token.slice(0, cursorPos - 1);
            console.log(before);

            let after = token.slice(cursorPos, -1);
            console.log(after);


            setToken(before + link + after);
            setVisibleNoteMenu(false);
            setLinkedNote(null);
        }
    }, [linkedNote])

    useEffect(() => {
        setCaret(document.activeElement.selectionStart);
    }, [document.activeElement.selectionStart])


    const nowUser = useProfile();


    useEffect(() => {
        EventService.getAllEvents(auth.authToken)
            .then(rs => {
                console.log("Get all events!")
                console.log(rs.data)
                let vaults = NoteWebLoader.applyServerEvents(rs.data);
                dispatch(loadNotesEvent({vaults}));
            })
    }, [])

    return (<div>
            <Input inputName="VAULT ID" value={vaultId} onChange={e => setVaultId(e.target.value)}/>
            <Input inputName="POINTS" value={`x = ${position.x}, y = ${position.y}`}/>
            <TextArea value={token} onChange={e => setText(e)}/>
            {visibleNoteMenu && <NoteMenu
                visible={visibleNoteMenu}
                vaultId={vaultId}
                position={position}
                setLinkedNote={setLinkedNote}
            />}
            <Button onClick={() => click()}>ОТПРАВИТЬ</Button>
        </div>);
};

export default Test;