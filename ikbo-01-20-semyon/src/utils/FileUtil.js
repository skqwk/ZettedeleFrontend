import {fromJson} from "./JsonUtil";
import {DATA_PATH} from "../core/config/index";
import {VAULT_STATE_FILE} from "../core/VaultManager";

const fs = window.require('fs');
const {join} = window.require('path');

export const isDir = (path) => {
    return fs.statSync(path).isDirectory();
}

export const isFile = (path) => {
    return fs.statSync(path).isFile();
}

export const readEventsFromFile = (path) => {
    let content = fs.readFileSync(path, 'utf8');
    let lines = content.split(/\r?\n/);
    return lines
        .filter(line => line)
        .map(line => {
            return fromJson(line);
        });
}

export const loadAllEvents = (nowUser) => {
    let userDataPath = join(DATA_PATH, nowUser);
    let allEvents = fs.readdirSync(userDataPath)
        .map(file => join(userDataPath, file))
        .filter(path => isDir(path))
        .map(vaultPath => readEventsFromVault(vaultPath))

    console.log(allEvents);
    return allEvents;
}

export const readEventsFromVault = (vaultPath) => {
    let vaultEvents = readEventsFromFile(join(vaultPath, VAULT_STATE_FILE));

    let noteEvents = fs.readdirSync(vaultPath)
        .map(file => join(vaultPath, file))
        .filter(path => isFile(path))
        .map(filePath => readEventsFromFile(filePath));

    return vaultEvents.concat(noteEvents);
}

export const isDirContainsFile = (dirPath, file) => {
    return fs.readdirSync(dirPath)
        .includes(file);
}