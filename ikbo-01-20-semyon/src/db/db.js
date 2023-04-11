const fs = window.require('fs');
const {app} = window.require('@electron/remote');
const {join} = window.require('path');

const appPath = app.getAppPath();
const DATA_FOLDER = 'data';
export const dataPath = join(appPath, DATA_FOLDER);
export class Db {
    static createNote(note) {
        let fileName = `${note.id}.txt`;
        let path = join(dataPath, fileName);
        fs.writeFileSync(path, note.content);
        console.log('Created new note');
    }

    static getAllNotes() {
        return fs.readdirSync(dataPath);
    }

}
