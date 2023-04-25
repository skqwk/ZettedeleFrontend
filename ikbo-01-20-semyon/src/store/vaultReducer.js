import {NoteManager} from "../core/NoteManager";
import {HLC} from "../core/HLC";
import {VaultManager} from "../core/VaultManager";

// Инициализируем стартовое состояние из NoteManager
// NoteManager.initState()
const defaultState = {
    vaults: [
        {
            id: 'work', name: 'work', notes: [
                {
                    id: 'note1', name: 'Новая заметка', head: '9101', paragraphs: {
                        '1234': {id: '1234', content: '123', next: null},
                        '5678': {id: '5678', content: '567', next: '1234'},
                        '9101': {id: '9101', content: '890', next: '5678'},
                    }
                }

            ],
        },
        {
            id: 'study', name: 'study', notes: [
                {
                    id: 'note1', name: 'Event Driven Architecture', head: '2023-04-19T04:25:42.558Z', paragraphs: {
                        '2023-04-19T04:25:42.558Z':
                            {
                                id: '2023-04-19T04:25:42.558Z',
                                content: 'Для проектирования архитектуры приложения для заметок по EDA (Event-Driven Architecture) следует учитывать следующие принципы:',
                                next: '2023-04-19T04:26:42.558Z'
                            },
                        '2023-04-19T04:26:42.558Z':
                            {
                                id: '2023-04-19T04:26:42.558Z',
                                content: '1. Определить основные события, которые должны происходить в приложении, такие как создание, изменение или удаление заметок.',
                                next: '2023-04-19T04:27:42.558Z'
                            },
                        '2023-04-19T04:27:42.558Z':
                            {
                                id: '2023-04-19T04:27:42.558Z',
                                content: '2. Разработать модель событий, которая описывает состояние системы и как она реагирует на события.',
                                next: '2023-04-19T04:28:42.558Z'
                            },
                        '2023-04-19T04:28:42.558Z':
                            {
                                id: '2023-04-19T04:28:42.558Z',
                                content: '3. Разделить приложение на слои, такие как слой приложения, слой бизнес-логики и слой инфраструктуры.',
                                next: null
                            },
                    }
                }

            ]
        }
    ]
}


const CREATE_VAULT = 'CREATE_VAULT';
const UPDATE_VAULT = 'UPDATE_VAULT';
const REMOVE_VAULT = 'REMOVE_VAULT';

const SAVE_NOTE = 'SAVE_NOTE';
const CREATE_NOTE = 'CREATE_NOTE';
const REMOVE_NOTE = 'REMOVE_NOTE';
const UPDATE_NOTE = 'UPDATE_NOTE';
const UPDATE_FIELDS = 'UPDATE_FIELDS';

const CREATE_PARAGRAPH = 'CREATE_PARAGRAPH';
const REMOVE_PARAGRAPH = 'REMOVE_PARAGRAPH';
const UPDATE_PARAGRAPH = 'UPDATE_PARAGRAPH';
const LOAD_NOTES = 'LOAD_NOTES';


export const createVaultEvent = (payload) => ({type: CREATE_VAULT, payload})
export const updateVaultEvent = (payload) => ({type: UPDATE_VAULT, payload})
export const removeVaultEvent = (payload) => ({type: REMOVE_VAULT, payload})

export const saveNoteEvent = () => ({type: SAVE_NOTE})
export const createNoteEvent = (payload) => ({type: CREATE_NOTE, payload})
export const updateNoteEvent = (payload) => ({type: UPDATE_NOTE, payload})
export const removeNoteEvent = (payload) => ({type: REMOVE_NOTE, payload})
export const createParagraphEvent = (payload) => ({type: CREATE_PARAGRAPH, payload})
export const removeParagraphEvent = (payload) => ({type: REMOVE_PARAGRAPH, payload})
export const updateParagraphEvent = (payload) => ({type: UPDATE_PARAGRAPH, payload})

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
        default:
            return state;
    }
}

const createVaultUseCase = (state, payload) => {
    console.log("Create vault");
    VaultManager.createVault(payload)
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
    VaultManager.removeVault(payload)
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
    });

    return {
        vaults: [...state.vaults.filter(v => v.id !== payload.vaultId), newVault]
    }
}

const createNoteUseCase = (state, payload) => {
    NoteManager.createNote(payload)
    let newNote = {deleted: false, id: payload.noteId, paragraphs: {}, color: 'white', title: ''};
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


const removeNoteUseCase = (state, payload) => {
    console.log(`Remove note with id = ${payload.noteId} from vault with id = ${payload.vaultId}`);
    let vault = getVault(state.vaults, payload);
    vault.notes = [...vault.notes.filter(n => n.id !== payload.noteId)];
    NoteManager.removeNote(payload);
    return {vaults: [...state.vaults.filter(v => v.id !== payload.vaultId), vault]};
}


const loadNotesUseCase = (state, payload) => {
    let vaults = NoteManager.loadNotesInMemory(payload.username);

    return {...state, vaults: vaults};
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
