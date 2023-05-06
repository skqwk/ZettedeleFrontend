import {NoteManager} from "../core/NoteManager";
import {HLC} from "../core/clock/HLC";
import {VaultManager} from "../core/VaultManager";
import {EventService} from "../API/EventService";
import {NoteWebLoader} from "../core/web/NoteWebLoader";

// Инициализируем стартовое состояние из NoteManager
// NoteManager.initState()
const defaultState = {
    vaults: []
}

const CREATE_VAULT = 'CREATE_VAULT';
const UPDATE_VAULT = 'UPDATE_VAULT';
const REMOVE_VAULT = 'REMOVE_VAULT';

const CREATE_NOTE = 'CREATE_NOTE';
const REMOVE_NOTE = 'REMOVE_NOTE';
const UPDATE_NOTE = 'UPDATE_NOTE';
const UPDATE_FIELDS = 'UPDATE_FIELDS';
const ADD_LINK_NOTE = 'ADD_LINK_NOTE';
const REMOVE_LINK_NOTE = 'REMOVE_LINK_NOTE';

const CREATE_PARAGRAPH = 'CREATE_PARAGRAPH';
const REMOVE_PARAGRAPH = 'REMOVE_PARAGRAPH';
const UPDATE_PARAGRAPH = 'UPDATE_PARAGRAPH';
const LOAD_NOTES = 'LOAD_NOTES';


export const createVaultEvent = (payload) => ({type: CREATE_VAULT, payload})
export const updateVaultEvent = (payload) => ({type: UPDATE_VAULT, payload})
export const removeVaultEvent = (payload) => ({type: REMOVE_VAULT, payload})

export const createNoteEvent = (payload) => ({type: CREATE_NOTE, payload})
export const updateNoteEvent = (payload) => ({type: UPDATE_NOTE, payload})
export const removeNoteEvent = (payload) => ({type: REMOVE_NOTE, payload})
export const createParagraphEvent = (payload) => ({type: CREATE_PARAGRAPH, payload})
export const removeParagraphEvent = (payload) => ({type: REMOVE_PARAGRAPH, payload})
export const updateParagraphEvent = (payload) => ({type: UPDATE_PARAGRAPH, payload})
export const addNoteLinkEvent = (payload) => ({type: ADD_LINK_NOTE, payload});
export const removeNoteLinkEvent = (payload) => ({type: REMOVE_LINK_NOTE, payload});

export const loadNotesEvent = (payload) => ({type: LOAD_NOTES, payload});

export const vaultReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CREATE_VAULT:
            return createVaultUseCase(state, action.payload);
        case UPDATE_VAULT:
            return updateVaultUseCase(state, action.payload);
        case REMOVE_VAULT:
            return removeVaultUseCase(state, action.payload);
        case CREATE_NOTE:
            return createNoteUseCase(state, action.payload);
        case REMOVE_NOTE:
            return removeNoteUseCase(state, action.payload);
        case UPDATE_NOTE:
            return updateNoteUseCase(state, action.payload);
        case CREATE_PARAGRAPH:
            return createParagraphUseCase(state, action.payload);
        case REMOVE_PARAGRAPH:
            return removeParagraphUseCase(state, action.payload);
        case UPDATE_PARAGRAPH:
            return updateParagraphUseCase(state, action.payload);
        case LOAD_NOTES:
            return loadNotesUseCase(state, action.payload);
        case ADD_LINK_NOTE:
            return addLinkNoteUseCase(state, action.payload);
        case REMOVE_LINK_NOTE:
            return removeLinkNoteUseCase(state, action.payload);
        default:
            return state;
    }
}

const createVaultUseCase = (state, payload) => {
    console.log("Create vault");
    VaultManager.createVault(payload, payload.authToken)
    let newVault = {id: payload.vaultId, createdAt: '', name: payload.name, notes: []};
    console.log(newVault);
    console.log({
        vaults: [...state.vaults, newVault]
    });
    return {
        vaults: [...state.vaults, newVault]
    }
}

const removeVaultUseCase = (state, payload) => {
    console.log("Remove vault");
    VaultManager.removeVault(payload, payload.authToken)
    return {
        vaults: [...state.vaults.filter(v => v.id !== payload.vaultId)]
    }
}

const updateVaultUseCase = (state, payload) => {
    console.log("Update vault");

    let oldVault = getVault(state.vaults, payload);
    let newVault = {...oldVault, ...payload.updatedData}
    VaultManager.updateVault({
        ...payload,
        event: UPDATE_VAULT,
        body: {
            ...payload.updatedData
        },
    }, payload.authToken);

    return {
        vaults: [...state.vaults.filter(v => v.id !== payload.vaultId), newVault]
    }
}

const createNoteUseCase = (state, payload) => {
    NoteManager.createNote(payload)
    let newNote = {deleted: false, id: payload.noteId, paragraphs: {}, color: 'white', title: '', links: new Set()};
    console.log(state.vaults);
    let newVaults = putUpdatedNoteIntoVaults(newNote, state.vaults, payload);
    console.log({vaults: newVaults});
    return {...state, vaults: newVaults};
}

const updateNoteUseCase = (state, payload) => {
    console.log("Update note");
    let oldNote = getNote(state.vaults, payload);
    let newNote = {...oldNote, ...payload.updatedData}
    NoteManager.updateNote({
        ...payload,
        event: UPDATE_FIELDS,
        body: {
            ...payload.updatedData
        },
    })

    let newVaults = putUpdatedNoteIntoVaults(newNote, state.vaults, payload);
    console.log({vaults: newVaults});
    return {vaults: newVaults};
}

const addLinkNoteUseCase = (state, payload) => {
    console.log("Add note link use case");
    console.log(payload);

    let oldNote = getNote(state.vaults, payload);
    let newLinks = oldNote.links;
    newLinks.add(payload.link)
    let newNote = {...oldNote, ...payload.updatedData, links: newLinks}
    NoteManager.addLinkNote(payload)

    let newVaults = putUpdatedNoteIntoVaults(newNote, state.vaults, payload);
    return {vaults: newVaults};
}

const removeLinkNoteUseCase = (state, payload) => {
    console.log("Remove note link use case");
    console.log(payload);

    let oldNote = getNote(state.vaults, payload);
    let newLinks = oldNote.links;
    newLinks.delete(payload.link)
    let newNote = {...oldNote, ...payload.updatedData, links: newLinks}
    NoteManager.removeLinkNote(payload)

    let newVaults = putUpdatedNoteIntoVaults(newNote, state.vaults, payload);
    return {vaults: newVaults};
}


const removeNoteUseCase = (state, payload) => {
    console.log(`Remove note with id = ${payload.noteId} from vault with id = ${payload.vaultId}`);
    let vault = getVault(state.vaults, payload);
    vault.notes = [...vault.notes.filter(n => n.id !== payload.noteId)];
    NoteManager.removeNote(payload);
    return {vaults: [...state.vaults.filter(v => v.id !== payload.vaultId), vault]};
}


const loadNotesUseCase = (state, payload) => {
    return {...state, vaults: payload.vaults};
}

const createParagraphUseCase = (state, payload) => {
    console.log("CreateParagraphUseCase");
    let newParagraph = {id: HLC.timestamp(), content: '', prev: payload.prev, next: payload.next};
    let oldNote = getNote(state.vaults, payload);
    let newNote = {...oldNote};
    console.log(newParagraph);
    if (newParagraph.prev === null) {
        newNote.head = newParagraph.id;
    } else {
        let prevParagraph = getParagraph(state.vaults, payload, newParagraph.prev);
        prevParagraph.next = newParagraph.id;
        newNote.paragraphs[prevParagraph.id] = prevParagraph;
    }
    newNote.paragraphs[newParagraph.id] = newParagraph;

    let newVaults = putUpdatedNoteIntoVaults(newNote, state.vaults, payload);

    NoteManager.updateNote({
        ...payload,
        event: CREATE_PARAGRAPH,
        body: {
            content: newParagraph.content,
            id: newParagraph.id,
            prev: newParagraph.prev,
            next: newParagraph.next
        },
    })

    return {vaults: newVaults};
}

const removeParagraphUseCase = (state, payload) => {
    console.log("Remove paragraph");
    let paragraph = getParagraph(state.vaults, payload, payload.id);
    let oldNote = getNote(state.vaults, payload);
    let newNote = {...oldNote};

    if (newNote.head === payload.id) {
        newNote.head = newNote.paragraphs[payload.id].next;
    } else {
        let prevParagraph = findPrevParagraph(newNote.head, newNote.paragraphs, payload.id);
        prevParagraph.next = paragraph.next;
        newNote.paragraphs[prevParagraph.id] = prevParagraph;
    }

    delete newNote.paragraphs[payload.id];

    let newVaults = putUpdatedNoteIntoVaults(newNote, state.vaults, payload);

    NoteManager.updateNote({
        ...payload,
        event: REMOVE_PARAGRAPH,
        body: {id: paragraph.id},
    })

    return {vaults: newVaults};
}

const updateParagraphUseCase = (state, payload) => {
    console.log("Update paragraph");
    let paragraph = getParagraph(state.vaults, payload, payload.id);
    paragraph.content = payload.content;

    let newNote = getNote(state.vaults, payload);
    newNote.paragraphs[payload.id] = paragraph;

    let newVaults = putUpdatedNoteIntoVaults(newNote, state.vaults, payload);

    NoteManager.updateNote({
        ...payload,
        event: UPDATE_PARAGRAPH,
        body: {content: paragraph.content, id: paragraph.id},
    })
    console.log({vaults: newVaults});
    return {vaults: newVaults};
}

const putUpdatedNoteIntoVaults = (newNote, vaults, payload) => {

    let vault = getVault(vaults, payload);
    console.log('putUpdatedNoteIntoVaults');
    console.log(vault);

    if (vault.notes.length === 0) {
        vault.notes = [newNote];
    } else {
        vault.notes = [...vault.notes.filter(n => n.id !== payload.noteId), newNote];
    }
    console.log(vault);
    return [...vaults.filter(v => v.id !== payload.vaultId), vault];
}

const findPrevParagraph = (head, paragraphs, id) => {
    let nowParagraph = paragraphs[head];

    while (nowParagraph && nowParagraph.next !== id) {
        nowParagraph = nowParagraph.next
            ? paragraphs[nowParagraph.next]
            : null
    }
    return nowParagraph;
}

const getVault = (vaults, address) => vaults.find(v => v.id === address.vaultId);
const getNote = (vaults, address) => getVault(vaults, address).notes.find(n => n.id === address.noteId);
const getParagraph = (vaults, address, paragraphId) => ({...getNote(vaults, address).paragraphs[paragraphId]});
