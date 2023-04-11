const fs = window.require('fs');
const pathModule = window.require('path');
const {app} = window.require('@electron/remote');

export const appPath = app.getAppPath();

export const getFiles = (path) => {
    console.log(path);

    return fs
        .readdirSync(path)
        .map(file => createStats(path, file))
        .sort((a, b) => sortFiles(a, b));
}

const createStats = (path, file) => {
    const stats = fs.statSync(pathModule.join(path, file));
    return ({
        name: file,
        directory: stats.isDirectory(),
        size: stats.isFile() ? formatSize(stats.size ?? 0) : null
    });
}

const formatSize = size => {
    let i = Math.floor(Math.log(size) / Math.log(1024))
    return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        ' ' +
        ['B', 'kB', 'MB', 'GB', 'TB'][i]
    )
}

const sortFiles = (a, b) => {
    if (a.directory === b.directory) {
        return a.name.localeCompare(b.name);
    }
    return a.directory ? -1 : 1;
}