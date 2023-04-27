import {DATA_PATH} from "./config";
import {isDir, isDirContainsFile} from "../utils/FileUtil";

const fs = window.require('fs');
const {join} = window.require('path');

export class NoteFinder {
    static findNotePath(noteId, nowUser) {
        let userDataPath = join(DATA_PATH, nowUser);
        let dir = fs.readdirSync(userDataPath)
            .filter(name => isDir(join(userDataPath, name)))
            .find(dir => isDirContainsFile(join(userDataPath, nowUser), noteId));

        return join(userDataPath, dir, noteId);
    }
}