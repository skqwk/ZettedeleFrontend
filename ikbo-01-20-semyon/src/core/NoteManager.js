import {HLC} from "./clock/HLC";

export class NoteManager {
    static updateEvents = {
        NOTE_PATH: '',
        CREATE_NOTE: {},
        ADD_LINK_NOTE: {},
        REMOVE_LINK_NOTE: {},
        UPDATE_NOTE: {
            UPDATE_FIELDS: {},
            CREATE_PARAGRAPH: {},
            REMOVE_PARAGRAPH: {},
            UPDATE_PARAGRAPH: {}
        },
        REMOVE_NOTE: {},
    };

    static clearUpdateEvents = () => {
        this.updateEvents = {
            NOTE_PATH: '',
            CREATE_NOTE: {},
            ADD_LINK_NOTE: {},
            REMOVE_LINK_NOTE: {},
            UPDATE_NOTE: {
                UPDATE_FIELDS: {},
                CREATE_PARAGRAPH: {},
                REMOVE_PARAGRAPH: {},
                UPDATE_PARAGRAPH: {}
            },
            REMOVE_NOTE: {},
        };
    }

    static createNote(payload) {
        console.log('CREATE NOTE');
        console.log(payload);

        let id = payload.noteId;
        let createdAt = new Date().toLocaleDateString();
        let createNoteMessage =
            {event: 'CREATE_NOTE', happenAt: HLC.timestamp(), parentId: payload.vaultId, payload: {id, createdAt}}
        this.clearUpdateEvents();
        this.updateEvents.CREATE_NOTE[id] = createNoteMessage;
    }

    static removeNote(payload) {
        console.log('REMOVE NOTE');
        console.log(payload);

        let id = payload.noteId;
        let removeNoteMessage =
            {event: 'REMOVE_NOTE', happenAt: HLC.timestamp(), parentId: payload.vaultId, id, payload: {}}

        this.updateEvents.REMOVE_NOTE[id] = removeNoteMessage;
    }


    static updateNote(payload) {
        console.log('UPDATE NOTE IN NOTE MANAGER');

        let eventPayload = this.createPayloadDependsOnEvent(payload.event, payload.body);

        // У нового параграфа по умолчанию идентификатор - значение timestamp, поэтому
        // у него happenAt == id
        let happenAt = payload.event === 'CREATE_PARAGRAPH'
            ? payload.body.id
            : HLC.timestamp();

        console.log(this.updateEvents.UPDATE_NOTE);
        console.log(this.updateEvents.UPDATE_NOTE[payload.event]);

        if (payload.event === 'UPDATE_FIELDS') {
            let field = Object.keys(payload.body)[0];
            let value = Object.values(payload.body)[0];
            this.updateEvents.UPDATE_NOTE.UPDATE_FIELDS[field] = {
                event: 'UPDATE_NOTE',
                happenAt,
                parentId: payload.vaultId,
                id: payload.noteId,
                payload: {[field]: value}
            }
        } else {
            this.updateEvents.UPDATE_NOTE[payload.event][payload.body.id] = {
                event: payload.event,
                happenAt,
                parentId: payload.noteId,
                payload: eventPayload
            }
        }

        console.log(this.updateEvents);
    }

    static addLinkNote(payload) {
        console.log(payload);
        this.updateEvents.ADD_LINK_NOTE[payload.link] =
            {
                event: "ADD_LINK_NOTE",
                happenAt: HLC.timestamp(),
                payload: {link: payload.link},
                id: payload.noteId,
                parentId: payload.vaultId
            }
    }

    static removeLinkNote(payload) {
        console.log(payload);
        this.updateEvents.REMOVE_LINK_NOTE[payload.link] =
            {
                event: "REMOVE_LINK_NOTE",
                happenAt: HLC.timestamp(),
                payload: {link: payload.link},
                id: payload.noteId,
                parentId: payload.vaultId
            }
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
}