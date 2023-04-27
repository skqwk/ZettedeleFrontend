const {join} = window.require('path');
const {app} = window.require('@electron/remote');

export const APP_PATH = app.getAppPath();
export const DATA_PATH = join(APP_PATH, 'data', 'users');