import {useSelector} from "react-redux";

const emptyNote = {
    id: '',
    name: '',
    color: 'white',
    paragraphs: {}
}

export const useNote = (vaultId, noteId) => {
    return useSelector(state => getNoteByVaultIdAndNoteId(state.vault.vaults, vaultId, noteId));
}

const getNoteByVaultIdAndNoteId = (vaults, vaultId, noteId) => {
    let note = emptyNote;
    if (noteId !== null) {
        note = vaults.find(v => v.id === vaultId)
            .notes.find(n => n.id === noteId);
    }
    console.log(noteId);
    console.log(note);
    return note;
}
