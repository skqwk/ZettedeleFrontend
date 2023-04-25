import {fromJson} from "./JsonUtil";

const fs = window.require('fs');

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