import {HLC} from "./HLC";
import {ParagraphRGA} from "./ParagraphRGA";
import {Mapper} from "./Mapper";

const fs = window.require('fs');
const {join} = window.require('path');
const {app} = window.require('@electron/remote');

const appPath = app.getAppPath();
const dataPath = join(appPath, 'data', 'users');

export class NoteManager {
    static emptyUpdateEvents = {
        NOTE_PATH: '',
        CREATE_NOTE: {},
        UPDATE_NOTE: {
            CREATE_PARAGRAPH: {},
            REMOVE_PARAGRAPH: {},
            UPDATE_PARAGRAPH: {}
        },
        REMOVE_NOTE: {},
    };

    static updateEvents = this.emptyUpdateEvents;

    static createNote(payload) {
        console.log('CREATE NOTE');
        console.log(payload);
        let nowUser = payload.nowUser;

        let vaultPath = join(dataPath, nowUser, payload.vaultId);
        let notePath = join(vaultPath, payload.noteId);

        let id = payload.noteId;
        let createNoteMessage =
            {event: 'CREATE_NOTE', happenAt: HLC.timestamp(), payload: {name: '', systemName: id}}

        this.updateEvents = {...this.emptyUpdateEvents};
        this.updateEvents.NOTE_PATH = notePath;
        this.updateEvents.CREATE_NOTE[id] = createNoteMessage;
    }

    static removeNote(payload) {
        console.log('REMOVE NOTE');
        console.log(payload);
        let nowUser = payload.nowUser;

        let vaultPath = join(dataPath, nowUser, payload.vaultId);
        let notePath = join(vaultPath, payload.noteId);

        let id = payload.noteId;
        let removeNoteMessage =
            {event: 'REMOVE_NOTE', happenAt: HLC.timestamp(), payload: {}}

        this.updateEvents.NOTE_PATH = notePath;
        this.updateEvents.REMOVE_NOTE[id] = removeNoteMessage;
    }

    static flushUpdates(noteId) {
        let notePath = this.updateEvents.NOTE_PATH;

        // Если заметки не удалялась
        if (Object.keys(this.updateEvents.REMOVE_NOTE).length === 0) {
            // Если заметка создана впервые - создаем файл
            if (Object.keys(this.updateEvents.CREATE_NOTE).length !== 0) {
                let createNoteMessage = this.updateEvents.CREATE_NOTE[noteId];
                fs.writeFileSync(notePath, this.toJson(createNoteMessage));
            }

            let creates = this.updateEvents.UPDATE_NOTE.CREATE_PARAGRAPH;
            let updates = this.updateEvents.UPDATE_NOTE.UPDATE_PARAGRAPH;
            let removes = this.updateEvents.UPDATE_NOTE.REMOVE_PARAGRAPH;

            // TODO: Оптимизация записей в файл
            // optimizeUpdates(creates, updates, removes);

            let createEvents = this.extractValueById(creates);
            let updateEvents = this.extractValueById(updates);
            let removeEvents = this.extractValueById(removes);

            let events = [...createEvents, ...updateEvents, ...removeEvents];
            console.log('EVENTS FOR FLUSH');
            console.log(events);
            let sortedEvents = this.sortEvents(events);
            sortedEvents.forEach(event => fs.appendFileSync(notePath, this.toJson(event)));

        } else {
            // Если заметка была создана в эту же сессию - ничего делать не нужно
            if (Object.keys(this.updateEvents.CREATE_NOTE).length !== 0) return;

            // Если была удалена - можно опустить все обновления
            // и записать только информацию об удалении
            fs.appendFileSync(notePath, this.toJson({
                event: 'REMOVE_NOTE',
                happenAt: HLC.timestamp(),
                payload: {}
            }));
        }
        this.updateEvents = {...this.emptyUpdateEvents};
    }

    static extractValueById = (events) => Object.keys(events).map(id => events[id]);

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

        this.updateEvents.NOTE_PATH = notePath;
        console.log(this.updateEvents.UPDATE_NOTE);
        console.log(this.updateEvents.UPDATE_NOTE[payload.event]);

        this.updateEvents.UPDATE_NOTE[payload.event][payload.body.id] = {
            event: payload.event,
            happenAt,
            payload: eventPayload
        }

        console.log(this.updateEvents);
    }

    static createPayloadDependsOnEvent = (event, payload) => {
        switch (event) {
            case 'CREATE_PARAGRAPH':
                return {insertKey: payload.prev, content: payload.content};
            case 'UPDATE_PARAGRAPH':
                return {updateKey: payload.id, content: payload.content};
            case 'REMOVE_PARAGRAPH':
                return {deleteKey: payload.id};
            default:
                throw new Error(`Unexpected event ${event}`);
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
                // console.log(line);
                return JSON.parse(line);
            });

        let sortedEvents = this.sortEvents(events);

        console.log(sortedEvents);

        let rgaNote = this.processEvents(sortedEvents);
        return Mapper.rgaNoteToDomainNote(rgaNote);
    }

    static sortEvents = (events) => events
        .sort((e1, e2) => e1.happenAt.localeCompare(e2.happenAt));


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