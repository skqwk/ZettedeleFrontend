import {isDir} from "../utils/FileUtil";
import {DATA_PATH} from "./config/index";

const fs = window.require('fs');
const {join} = window.require('path');

export class ProfileManager {

    static getProfiles() {
        return fs.readdirSync(DATA_PATH)
            .filter(file => isDir(join(DATA_PATH, file)))
            .map(dir => this.createProfileFromDir(dir));
    }

    static createProfileFromDir(dir) {
        return {name: dir, value: dir};
    }
}