const fs = window.require('fs');
const {join} = window.require('path');
const {app} = window.require('@electron/remote');

const appPath = app.getAppPath();
const dataPath = join(appPath, 'data')

export class NoteManager {
    static createNote(payload) {
        let vaultPath = join(dataPath, payload.vaultId);
        let notePath = join(vaultPath, payload.noteId);
        fs.writeFile()
    }

    static updateNote(payload) {

    }

    static getNote(payload) {

    }
}