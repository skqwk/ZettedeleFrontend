import {DATA_PATH} from "../config";
import {isDir, isFile, readEventsFromFile} from "../../utils/FileUtil";
import {VAULT_STATE_FILE} from "../VaultManager";
import {VaultRFA} from "../VaultRFA";
import {ParagraphRGA} from "../ParagraphRGA";
import {Mapper} from "../Mapper";
const fs = window.require('fs');
const {join} = window.require('path');

export class NoteFileLoader {

    static loadNotesInMemory(nowUser) {
        console.log(`Now user = ${nowUser}`);

        let userDataPath = join(DATA_PATH, nowUser);
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