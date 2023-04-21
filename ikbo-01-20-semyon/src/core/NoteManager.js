import {HLC} from "./HLC";
import {ParagraphRGA} from "./ParagraphRGA";
import {Mapper} from "./Mapper";

const fs = window.require('fs');
const {join} = window.require('path');
const {app} = window.require('@electron/remote');

const appPath = app.getAppPath();
const dataPath = join(appPath, 'data', 'users');

export class NoteManager {
    static createNote(payload) {
        let nowUser = payload.nowUser;

        let vaultPath = join(dataPath, nowUser, payload.vaultId);
        let notePath = join(vaultPath, payload.noteId);

        let createNoteMessage =
            {event: 'CREATE_NOTE', happenAt: HLC.timestamp()}

        fs.writeFileSync(notePath, this.toJson(createNoteMessage));
    }

    static updateNote(payload) {
        console.log('UPDATE NOTE IN NOTE MANAGER');
        let nowUser = payload.nowUser;

        let vaultPath = join(dataPath, nowUser, payload.vaultId);
        let notePath = join(vaultPath, payload.noteId);

        let eventPayload = this.createPayloadDependsOnEvent(payload.event, payload.body);

        // У нового параграфа по умолчанию идентификатор - значение timestamp, поэтому
        // у него happenAt == id
        let happenAt = payload.event === 'CREATE_PARAGRAPH'
            ? payload.body.id
            : HLC.timestamp();

        fs.appendFileSync(notePath, this.toJson({
            event: payload.event,
            happenAt,
            payload: eventPayload
        }));
    }

    static createPayloadDependsOnEvent = (event, payload) => {
        switch (event) {
            case 'CREATE_PARAGRAPH':
                return {insertKey: payload.prev, content: payload.content};
            case 'UPDATE_PARAGRAPH':
                return {updateKey: payload.id, content: payload.content};
            case 'REMOVE_PARAGRAPH':
                return {deleteKey: payload.id};
        }
    }

    static loadNotesInMemory(nowUser) {
        console.log(`Now user = ${nowUser}`);

        let userDataPath = join(dataPath, nowUser);
        console.log(userDataPath);
        let vaults = fs.readdirSync(userDataPath)
            .filter(file => this.isDir(join(userDataPath, file)))
            .map(dir => this.createVault(join(userDataPath, dir), dir));

        console.log(vaults);
        return vaults;
    }

    static isDir(path) {
        return fs.statSync(path).isDirectory();
    }

    static isFile(path) {
        return fs.statSync(path).isFile();
    }

    static createVault(path, name) {
        let vault = {id: name, name: name};

        vault.notes = fs.readdirSync(path)
            .filter(file => this.isFile(join(path, file)))
            .map(file => this.createNoteFromFile(join(path, file), file));
        return vault;
    }

    static createNoteFromFile(path, name) {
        let content = fs.readFileSync(path, 'utf8');
        let lines = content.split(/\r?\n/);
        let events = lines
            .filter(line => line)
            .map(line => {
                console.log(line);
                return JSON.parse(line);
            });

        let sortedEvents = events
            .sort((e1, e2) => e1.happenAt.localeCompare(e2.happenAt));

        console.log(sortedEvents);

        let rgaNote = this.processEvents(sortedEvents);
        return Mapper.rgaNoteToDomainNote(rgaNote);
    }


    static processEvents(events) {
        let note = {id: '', name: '', paragraphs: {}};

        events.forEach(event => {
            ParagraphRGA.applyEvent(event, note);
        })
        return note;
    }

    static getNote(payload) {

    }

    static toJson(message) {
        return `\n${JSON.stringify(message)}\r`
    }
}