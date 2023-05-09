import {HybridTimestamp} from "../clock/HybridTimestamp";
import {HLC} from "../clock/HLC";
import {VaultRFA} from "../VaultRFA";
import {ParagraphRGA} from "../ParagraphRGA";
import {Mapper} from "../Mapper";

export class NoteWebLoader {
    static applyServerEvents(serverEvents) {
        let groupedEvents = {};
        serverEvents
            .sort((e1, e2) => e1.happenAt.localeCompare(e2.happenAt))
            .forEach(e => {
                    let remoteTimestamp = HybridTimestamp.parse(e.happenAt);
                    if (HLC.singleton === null) {
                        console.log("INIT HLC");
                        HLC.init(remoteTimestamp.nodeId);
                    }
                    HLC.singleton.tick(remoteTimestamp);
                }
            )

        // Фиксим недоработки :(
        // У нек-х event'ов ID в payload'e
        serverEvents.forEach(e => {
            if (e.id === null) {
                e.id = e.payload.id
            }
        });

        // Получаем события, сгруппированные по отношению к отдельным сущностям
        // Не трогаем пока что события параграфов
        serverEvents
            .filter(e => !e.event.includes("_PARAGRAPH"))
            .forEach(e => {
                    if (!groupedEvents[e.id]) {
                        groupedEvents[e.id] = [e]
                    } else {
                        groupedEvents[e.id].push(e);
                    }
                }
            )

        // Теперь события параграфов добавляем к событиям заметок
        serverEvents
            .filter(e => e.event.includes("_PARAGRAPH"))
            .forEach(e => {
                groupedEvents[e.parentId].push(e);
            })

        // Проверяем, что ничего не потеряли
        let amount = 0;
        Object.values(groupedEvents)
            .forEach(events => amount += events.length);
        if (amount !== serverEvents.length) {
            throw Error();
        }

        console.log("GROUPED EVENTS");
        console.log(groupedEvents);

        let preProcessedEvents = {}
        Object.keys(groupedEvents).forEach(id => {
            let eventType = groupedEvents[id][0].event;
            if (eventType.includes("_VAULT")) {
                preProcessedEvents[id] = {
                    vaultEvents: groupedEvents[id],
                    notesEvents: []
                }
            }
        })

        console.log("AFTER ADDING VAULTS");
        console.log(preProcessedEvents);

        Object.keys(groupedEvents).forEach(id => {
            let eventType = groupedEvents[id][0].event;
            if (eventType.includes("_NOTE")) {
                let vaultId = groupedEvents[id][0].parentId;
                preProcessedEvents[vaultId].notesEvents.push(groupedEvents[id]);
            }
        })

        console.log("PREPROCESSED EVENTS");
        console.log(preProcessedEvents);

        let vaults = Object.keys(preProcessedEvents)
            .map(vaultId => this.createVault(preProcessedEvents[vaultId]))

        console.log(vaults);
        return vaults;
    }

    static createVault(eventsInVault) {
        const {vaultEvents, notesEvents} = eventsInVault;
        const sortedVaultEvents = this.sortEvents(vaultEvents);

        let vault = this.processEvents(sortedVaultEvents, VaultRFA, {})
        vault.notes = []
        if (!vault.deleted) {
            vault.notes = notesEvents
                .map(noteEvents => this.createNote(noteEvents));
        }
        return vault;
    }

    static createNote(events) {
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