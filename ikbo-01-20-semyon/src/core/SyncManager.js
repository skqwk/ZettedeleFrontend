import {v4} from 'uuid';
import {HLC} from "./clock/HLC";
import {SyncService} from "../API/SyncService";
import {VectorVersionCalculator} from "./VectorVersionCalculator";
import {DATA_PATH} from "./config";
import {loadAllEvents} from "../utils/FileUtil";
import {HybridTimestamp} from "./clock/HybridTimestamp";
import {EventFinder} from "./EventFinder";
import {EventApplier} from "./EventApplier";

const fs = window.require('fs');
const {join} = window.require('path');

const CONFIG_FILE_NAME = 'config.json';
const VECTOR_VERSION_FILE_NAME = 'vector-version.json';


export class SyncManager {
    static nodeId;
    static nowUser;

    static init(nowUser) {
        this.nowUser = nowUser;
        let config = {};
        let configPath = join(DATA_PATH, nowUser, CONFIG_FILE_NAME);
        if (fs.existsSync(configPath)) {
            let buffer = fs.readFileSync(configPath);
            config = JSON.parse(buffer);
            if (!config.nodeId) {
                config.nodeId = v4();
                this.writeFile(configPath, config)
            }
        } else {
            config = {nodeId: v4()};
            this.writeFile(configPath, config);
        }
        this.nodeId = config;
        return config;
    }

    static sync(authToken) {
        let vectorVersion = this.loadVectorVersion();
        SyncService.getEvents(vectorVersion, authToken)
            .then(rs => {
                // Вычисляем чего не хватает на сервере и отправляем
                let serverVectorVersion = rs.data.vectorVersion;
                let diff = this.calculateDiff(vectorVersion, serverVectorVersion);
                let missingEvents = this.loadMissingEvents(diff);
                SyncService.sendEvents(missingEvents)
                    .then(rs => {
                        console.log(rs);
                    });

                // Применяем изменения полученные с сервера
                let serverEvents = rs.data.events;
                this.applyServerEvents(serverEvents)

                // Обновляем вектор версий
                let mergedVector = this.mergeVectorVersion(vectorVersion, serverVectorVersion);
                let vectorVersionPath = join(DATA_PATH, this.nowUser, VECTOR_VERSION_FILE_NAME);
                this.writeFile(vectorVersionPath, mergedVector);
            })
    }

    static loadVectorVersion() {
        let vectorVersionPath = join(DATA_PATH, this.nowUser, VECTOR_VERSION_FILE_NAME);
        let vectorVersion = {};
        if (fs.existsSync(vectorVersionPath)) {
            let buffer = fs.readFileSync(vectorVersionPath);
            vectorVersion = JSON.parse(buffer);
            vectorVersion[this.nodeId] = HLC.timestamp();
        } else {
            vectorVersion[this.nodeId] = HLC.timestamp();
        }
        this.writeFile(vectorVersionPath, vectorVersion)
        return vectorVersion;
    }

    static calculateDiff(vectorVersion, serverVectorVersion) {
        return VectorVersionCalculator.calculateDiff(vectorVersion, serverVectorVersion);
    }

    static loadMissingEvents(diffVectorVersion) {
        let allEvents = loadAllEvents(this.nowUser);
        return Object.values(diffVectorVersion)
            .map(timestamp => EventFinder.findAllNodeEventsLaterThan(timestamp, allEvents));
    }


    static applyServerEvents(serverEvents) {
        serverEvents
            .sort((e1, e2) => e1.happenAt.localeCompare(e2.happenAt))
            .forEach(e => {
                let remoteTimestamp = HybridTimestamp.parse(e.happenAt);
                HLC.singleton.tick(remoteTimestamp);
                EventApplier.apply(e, this.nowUser);
            }
        )
    }

    static mergeVectorVersion(vectorVersion, serverVectorVersion) {
        return VectorVersionCalculator.calculateMerge(vectorVersion, serverVectorVersion);
    }

    static writeFile(filePath, data) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

}