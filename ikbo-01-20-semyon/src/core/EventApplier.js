import {NoteFinder} from "./NoteFinder";
import {DATA_PATH} from "./config";
import {VAULT_STATE_FILE} from "./VaultManager";
import {toJson} from "../utils/JsonUtil";
import {containsKey} from "../utils/DiffUtil";

const fs = window.require('fs');
const {join} = window.require('path');

export class EventApplier {
    static apply(event, nowUser) {
        let eventType = event.event;
        let userDataPath = join(DATA_PATH, nowUser);
        if (eventType.includes("_PARAGRAPH")) {
            this.applyParagraphEvent(event, nowUser);
        } else {
            if (eventType.includes("CREATE_")) {
                this.applyCreateEvent(event, nowUser);
            } else {
                let path = userDataPath;
                if (eventType.includes("_NOTE")) {
                    let vaultId = event.parentId;
                    path = join(path, vaultId, event.id);
                } else {
                    path = join(path, event.id, VAULT_STATE_FILE);
                }
                fs.appendFileSync(path, toJson(event));
            }
        }

    }

    static applyParagraphEvent(event, nowUser) {
        let noteId = event.parentId;
        let notePath = NoteFinder.findNotePath(noteId, nowUser);
        fs.appendFileSync(notePath, toJson(event))
    }

    static applyCreateEvent(event, nowUser) {
        let basePath = join(DATA_PATH, nowUser);
        let path = basePath;
        console.log(event);
        console.log(path);
        if (containsKey('parentId', event)) {
            let vaultId = event.parentId;
            path = join(basePath, vaultId, event.payload.id);
        } else {
            fs.mkdirSync(join(basePath, event.payload.id));
            path = join(basePath, event.payload.id, VAULT_STATE_FILE);
        }
        fs.writeFileSync(path, toJson(event));
    }
}