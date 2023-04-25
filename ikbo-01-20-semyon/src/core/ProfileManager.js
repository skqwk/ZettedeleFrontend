import {isDir} from "../utils/FileUtil";

const fs = window.require('fs');
const {join} = window.require('path');
const {app} = window.require('@electron/remote');

const appPath = app.getAppPath();
const dataPath = join(appPath, 'data', 'users');

export class ProfileManager {

    static getProfiles() {
        return fs.readdirSync(dataPath)
            .filter(file => isDir(join(dataPath, file)))
            .map(dir => this.createProfileFromDir(dir));
    }

    static createProfileFromDir(dir) {
        return {name: dir, value: dir};
    }
}