import {toJson} from "../../utils/JsonUtil";
import {NoteManager} from "../NoteManager";
import {DATA_PATH} from "../config";
export class FlushUpdater {


    static flushUpdates(noteId, vaultId, nowUser) {
        let notePath = ""; // join(DATA_PATH, nowUser, vaultId, noteId);

        console.log(notePath);
        console.log(NoteManager.updateEvents);
        // Если заметка не удалялась
        if (Object.keys(NoteManager.updateEvents.REMOVE_NOTE).length === 0) {
            // Если заметка создана впервые - создаем файл
            if (Object.keys(NoteManager.updateEvents.CREATE_NOTE).length !== 0) {
                let createNoteMessage = NoteManager.updateEvents.CREATE_NOTE[noteId];
                // fs.writeFileSync(notePath, toJson(createNoteMessage));
            }

            let fieldUpdates = NoteManager.updateEvents.UPDATE_NOTE.UPDATE_FIELDS;
            let creates = NoteManager.updateEvents.UPDATE_NOTE.CREATE_PARAGRAPH;
            let updates = NoteManager.updateEvents.UPDATE_NOTE.UPDATE_PARAGRAPH;
            let removes = NoteManager.updateEvents.UPDATE_NOTE.REMOVE_PARAGRAPH;

            let addLinks = NoteManager.updateEvents.ADD_LINK_NOTE;
            let removeLinks = NoteManager.updateEvents.REMOVE_LINK_NOTE;

            let addLinkEvents = Object.keys(addLinks)
                .filter(id => !(id in removeLinks))
                .map(id => addLinks[id]);

            let removeLinkEvents = Object.keys(removeLinks)
                .filter(id => !(id in addLinks))
                .map(id => removeLinks[id]);

            // TODO: Оптимизация записей в файл
            // optimizeUpdates(creates, updates, removes);

            let fieldUpdateEvents = this.extractValueByKey(fieldUpdates);
            let createEvents = this.extractValueByKey(creates);
            let updateEvents = this.extractValueByKey(updates);
            let removeEvents = this.extractValueByKey(removes);

            let events = [
                ...createEvents, ...updateEvents,
                ...removeEvents, ...fieldUpdateEvents,
                ...addLinkEvents, ... removeLinkEvents
            ];

            console.log('EVENTS FOR FLUSH');
            console.log(events);
            let sortedEvents = this.sortEvents(events);
            // sortedEvents.forEach(event => fs.appendFileSync(notePath, toJson(event)));

        } else {
            // Если заметка была создана в эту же сессию - ничего делать не нужно
            if (Object.keys(NoteManager.updateEvents.CREATE_NOTE).length !== 0) return;

            // Если была удалена - можно опустить все обновления
            // и записать только информацию об удалении

            // fs.appendFileSync(notePath, toJson(NoteManager.updateEvents.REMOVE_NOTE[noteId]));
        }
        console.log(NoteManager.updateEvents);
        NoteManager.clearUpdateEvents();
        console.log(NoteManager.updateEvents);
    }

    static sortEvents = (events) => events
        .sort((e1, e2) => e1.happenAt.localeCompare(e2.happenAt));

    static extractValueByKey = (events) => Object.keys(events).map(key => events[key]);
}