import {HLC} from "./clock/HLC";
import {ParagraphRGA} from "./ParagraphRGA";
import {Mapper} from "./Mapper";
import {isDir, isFile, readEventsFromFile} from "../utils/FileUtil";
import {toJson} from "../utils/JsonUtil";
import {VAULT_STATE_FILE} from "./VaultManager";
import {VaultRFA} from "./VaultRFA";

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
            UPDATE_FIELDS: {},
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
        let createdAt = new Date().toLocaleDateString();
        let createNoteMessage =
            {event: 'CREATE_NOTE', happenAt: HLC.timestamp(), parentId: payload.vaultId, payload: {id, createdAt}}
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
            {event: 'REMOVE_NOTE', happenAt: HLC.timestamp(), parentId: payload.vaultId, payload: {}}

        this.updateEvents.NOTE_PATH = notePath;
        this.updateEvents.REMOVE_NOTE[id] = removeNoteMessage;
    }

    static flushUpdates(noteId) {
        let notePath = this.updateEvents.NOTE_PATH;

        // Если заметка не удалялась
        if (Object.keys(this.updateEvents.REMOVE_NOTE).length === 0) {
            // Если заметка создана впервые - создаем файл
            if (Object.keys(this.updateEvents.CREATE_NOTE).length !== 0) {
                let createNoteMessage = this.updateEvents.CREATE_NOTE[noteId];
                fs.writeFileSync(notePath, toJson(createNoteMessage));
            }

            let fieldUpdates = this.updateEvents.UPDATE_NOTE.UPDATE_FIELDS;
            let creates = this.updateEvents.UPDATE_NOTE.CREATE_PARAGRAPH;
            let updates = this.updateEvents.UPDATE_NOTE.UPDATE_PARAGRAPH;
            let removes = this.updateEvents.UPDATE_NOTE.REMOVE_PARAGRAPH;

            // TODO: Оптимизация записей в файл
            // optimizeUpdates(creates, updates, removes);

            let fieldUpdateEvents = this.extractValueByKey(fieldUpdates);
            let createEvents = this.extractValueByKey(creates);
            let updateEvents = this.extractValueByKey(updates);
            let removeEvents = this.extractValueByKey(removes);

            let events = [...createEvents, ...updateEvents, ...removeEvents, ...fieldUpdateEvents];
            console.log('EVENTS FOR FLUSH');
            console.log(events);
            let sortedEvents = this.sortEvents(events);
            sortedEvents.forEach(event => fs.appendFileSync(notePath, toJson(event)));

        } else {
            // Если заметка была создана в эту же сессию - ничего делать не нужно
            if (Object.keys(this.updateEvents.CREATE_NOTE).length !== 0) return;

            // Если была удалена - можно опустить все обновления
            // и записать только информацию об удалении
            fs.appendFileSync(notePath, toJson({
                event: 'REMOVE_NOTE',
                happenAt: HLC.timestamp(),
                payload: {}
            }));
        }
        this.updateEvents = {...this.emptyUpdateEvents};
    }

    static extractValueByKey = (events) => Object.keys(events).map(key => events[key]);

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

        if (payload.event === 'UPDATE_FIELDS') {
            let field = Object.keys(payload.body)[0];
            let value = Object.values(payload.body)[0];
            this.updateEvents.UPDATE_NOTE.UPDATE_FIELDS[field] = {
                event: 'UPDATE_NOTE',
                happenAt,
                parentId: payload.vaultId,
                payload: {[field]: value}
            }
        } else {
            this.updateEvents.UPDATE_NOTE[payload.event][payload.body.id] = {
                parentId: payload.noteId,
                event: payload.event,
                happenAt,
                payload: eventPayload
            }
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
            case 'UPDATE_FIELDS':
                return {...payload.body}
            default:
                throw new Error(`Unexpected event ${event}`);
        }
    }

    static loadNotesInMemory(nowUser) {
        console.log(`Now user = ${nowUser}`);

        let userDataPath = join(dataPath, nowUser);
        console.log(userDataPath);
        let vaults = fs.readdirSync(userDataPath)
            .filter(file => isDir(join(userDataPath, file)))
            .map(dir => this.createVault(join(userDataPath, dir), dir));

        console.log(vaults);
        return vaults;
    }

    static createVault(path, name) {
        let vaultStateFilePath = join(path, VAULT_STATE_FILE);
        let events = readEventsFromFile(vaultStateFilePath);
        let sortedEvents = this.sortEvents(events);

        let vault = this.processEvents(sortedEvents, VaultRFA, {})
        vault.notes = []
        if (!vault.deleted) {
            vault.notes = fs.readdirSync(path)
                .filter(file => isFile(join(path, file)))
                .filter(file => file !== VAULT_STATE_FILE)
                .map(file => this.createNoteFromFile(join(path, file), file));
        }
        return vault;
    }

    static createNoteFromFile(path, name) {
        let events = readEventsFromFile(path)

        let sortedEvents = this.sortEvents(events);

        console.log(sortedEvents);

        let note = {id: '', name: '', paragraphs: {}};
        let rgaNote = this.processEvents(sortedEvents, ParagraphRGA, note);
        return Mapper.rgaNoteToDomainNote(rgaNote);
    }

    static sortEvents = (events) => events
        .sort((e1, e2) => e1.happenAt.localeCompare(e2.happenAt));


    static processEvents(events, RADT, initState) {
        events.forEach(event => {
            RADT.applyEvent(event, initState);
        })
        return initState;
    }

}