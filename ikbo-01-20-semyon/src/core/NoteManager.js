import {HLC} from "./HLC";

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

        let updateNoteMessage =
            {event: payload.event, happenAt: HLC.timestamp(), payload: payload.body};

        fs.appendFileSync(notePath,  this.toJson(updateNoteMessage));
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
            .map(line => JSON.parse(line));


        let sortedEvents = events
            .sort((e1, e2) => e1.happenAt.localeCompare(e2.happenAt));

        console.log(sortedEvents);

        let note = this.processEvents(sortedEvents);
        console.log('AFTER PROCESS EVENTS');
        console.log(note);
        return note;
    }


    static processEvents(events) {
        let note = {id: '', name: '', paragraphs: {}};
        events.forEach(event => {
            console.log(event);
            this.eventMap[event.event]({...event.payload, happenAt: event.happenAt}, note);
        })
        return note;
    }

    static createParagraphOperation = (payload, note) => {
        console.log('createParagraphOperation');
        let paragraph = {
            insertKey: payload.happenAt,
            deleteKey: payload.happenAt
        };

        let prevParagraph;

        if (payload.insertKey !== null) {
            prevParagraph = note.paragraphs[payload.insertKey];
        }

        if (payload.insertKey === null) {
            console.log(note.head);
            if (note.head === null || note.head.localeCompare(paragraph.insertKey) < 0) {
                if (note.head !== null) {
                    paragraph.next = note.head;
                }
                note.head = paragraph.insertKey;
                paragraph.content = '';
                note.paragraphs[paragraph.insertKey] = paragraph;
                return;
            } else {
                prevParagraph = note.paragraphs[note.head];
            }
        }

        while(prevParagraph.next !== null &&
        paragraph.insertKey.compareTo(note.paragraphs[prevParagraph.next].insertKey < 0)) {
            prevParagraph = prevParagraph.next;
        }

        paragraph.next = prevParagraph.next;
        prevParagraph.next = paragraph.insertKey;
        note.paragraphs[paragraph.insertKey] = paragraph;
    }

    static updateParagraphOperation = (payload, note) => {
        console.log('updateParagraphOperation');
        let paragraph = note.paragraphs[payload.insertKey];
        if (paragraph.content === null) {
            return;
        }

        if (payload.happenAt.localeCompare(paragraph.deleteKey) < 0) {
            return;
        }

        paragraph.content = payload.content;
        paragraph.deleteKey = payload.happenAt;
    }

    static createNoteOperation = (payload, note) => {
        console.log('createNoteOperation');
        note.name = payload.name;
        note.id = payload.id;
        note.head = null;
    }



    static eventMap = {
        'UPDATE_PARAGRAPH': this.updateParagraphOperation,
        'CREATE_NOTE': this.createNoteOperation,
        'CREATE_PARAGRAPH': this.createParagraphOperation,
    }

    static getNote(payload) {

    }

    static toJson(message) {
        return `${JSON.stringify(message)}\n`
    }
}