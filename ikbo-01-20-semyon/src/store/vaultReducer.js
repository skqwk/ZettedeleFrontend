import {v4} from 'uuid';

const defaultState = {
    vaults: [
        {
            id: '1234', name: 'Работа', notes: [
                {
                    id: '1234', name: 'Новая заметка', head: '9101', paragraphs: {
                        '1234': {id: '1234', content: '123', next: null},
                        '5678': {id: '5678', content: '567', next: '1234'},
                        '9101': {id: '9101', content: '890', next: '5678'},
                    }
                }

            ]
        }
    ]
}


const CREATE_VAULT = 'CREATE_VAULT';
const SAVE_NOTE = 'SAVE_NOTE';
const CREATE_NOTE = 'CREATE_NOTE';
const REMOVE_NOTE = 'REMOVE_NOTE';
const CREATE_PARAGRAPH = 'CREATE_PARAGRAPH';
const REMOVE_PARAGRAPH = 'REMOVE_PARAGRAPH';
const UPDATE_PARAGRAPH = 'UPDATE_PARAGRAPH';

export const createVaultEvent = () => ({type: CREATE_VAULT})
export const saveNoteEvent = () => ({type: SAVE_NOTE})
export const createNoteEvent = () => ({type: CREATE_NOTE})
export const removeNoteEvent = (payload) => ({type: REMOVE_NOTE, payload})
export const createParagraphEvent = (payload) => ({type: CREATE_PARAGRAPH, payload})
export const removeParagraphEvent = (payload) => ({type: REMOVE_PARAGRAPH, payload})
export const updateParagraphEvent = (payload) => ({type: UPDATE_PARAGRAPH, payload})

export const vaultReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CREATE_VAULT:
            return createVaultUseCase(state);
        case CREATE_NOTE:
            return createNoteUseCase(state);
        case REMOVE_NOTE:
            return removeNoteUseCase(state, action.payload);
        case CREATE_PARAGRAPH:
            return createParagraphUseCase(state, action.payload);
        case REMOVE_PARAGRAPH:
            return removeParagraphUseCase(state, action.payload);
        case UPDATE_PARAGRAPH:
            return updateParagraphUseCase(state, action.payload);
        default:
            return state;
    }
}

const createVaultUseCase = (state) => {
    console.log("Create vault");
    return {
        ...state,
        vaults: [...state.vaults,
            {id: '', createdAt: ''}]
    }
}
const createNoteUseCase = (state) => {
    console.log("Create note");
    return state;
}

const createParagraphUseCase = (state, payload) => {
    console.log("Create paragraph");

    let newVault = getVault(state.vaults, payload);
    let prevParagraph = getParagraph(state.vaults, payload);
    let newNote = getNote(state.vaults, payload);

    let newParagraph = {id: v4(), content: '', next: payload.next}
    prevParagraph.next = newParagraph.id;

    newNote.paragraphs[prevParagraph.id] = prevParagraph;
    newNote.paragraphs[newParagraph.id] = newParagraph;

    newVault.notes = [...newVault.notes.filter(n => n.id !== payload.noteId), newNote];

    let newVaults = [...state.vaults.filter(v => v.id !== payload.vaultId), newVault]

    console.log(payload);
    console.log(newVaults);
    return {vaults: newVaults};
}

const removeParagraphUseCase = (state, payload) => {
    console.log("Remove paragraph");
    let paragraph = getParagraph(state.vaults, payload);
    let newNote = getNote(state.vaults, payload);

    if (newNote.head === payload.id) {
        newNote.head = newNote.paragraphs[payload.id].next;
    } else {
        let prevParagraph = findPrevParagraph(newNote.head, newNote.paragraphs, payload.id);
        prevParagraph.next = paragraph.next;
        newNote.paragraphs[prevParagraph.id] = prevParagraph;
    }

    delete newNote.paragraphs[payload.id];

    let newVault = getVault(state.vaults, payload);
    newVault.notes = [...newVault.notes.filter(n => n.id !== payload.noteId), newNote];

    let newVaults = [...state.vaults.filter(v => v.id !== payload.vaultId), newVault]

    console.log(paragraph);
    console.log(payload);
    console.log(newVaults);
    return {vaults: newVaults};
}

const updateParagraphUseCase = (state, payload) => {
    console.log("Update paragraph");
    let paragraph = getParagraph(state.vaults, payload);
    paragraph.content = payload.content;

    let newNote = getNote(state.vaults, payload);
    newNote.paragraphs[payload.id] = paragraph;

    let newVault = getVault(state.vaults, payload);
    newVault.notes = [...newVault.notes.filter(n => n.id !== payload.noteId), newNote];

    let newVaults = [...state.vaults.filter(v => v.id !== payload.vaultId), newVault]

    console.log(paragraph);
    console.log(payload);
    console.log(newVaults);
    return {vaults: newVaults};
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

const getVault = (vaults, address) => ({...vaults.find(v => v.id === address.vaultId)});
const getNote = (vaults, address) => ({...getVault(vaults, address).notes.find(n => n.id === address.noteId)});
const getParagraph = (vaults, address) => ({...getNote(vaults, address).paragraphs[address.id]});

const removeNoteUseCase = (state, payload) => {
    console.log(`Remove note with id = ${payload.noteId} from vault with id = ${payload.vaultId}`);
    return state;
}
