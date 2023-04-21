import {useSelector} from "react-redux";

export const useNote = (vaultId, noteId) => {
    return useSelector(state => getNoteByVaultIdAndNoteId(state.vault.vaults, vaultId, noteId));
}

const getNoteByVaultIdAndNoteId = (vaults, vaultId, noteId) => {
    return vaults.find(v => v.id === vaultId)
        .notes.find(n => n.id === noteId);
}
