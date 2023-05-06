import {HLC} from "./clock/HLC";
import {EventService} from "../API/EventService";


export const VAULT_STATE_FILE = 'vault.state';

export class VaultManager {
    static createVault(payload, authToken) {
        // let vaultPath = join(DATA_PATH, payload.nowUser, payload.vaultId);
        // let vaultPathState = this.getVaultPathState(payload);

        let createVaultMessage = {
            event: 'CREATE_VAULT',
            happenAt: HLC.timestamp(),
            payload: {
                id: payload.vaultId,
                name: payload.name
            }
        }

        EventService.sendAllEvents([createVaultMessage], authToken)
            .then(rs => console.log(rs));

        // fs.mkdirSync(vaultPath);
        // fs.writeFileSync(vaultPathState, toJson(createVaultMessage));
    }

    static removeVault(payload, authToken) {
        // let vaultPathState = this.getVaultPathState(payload);

        let removeVaultMessage = {
            event: 'REMOVE_VAULT',
            happenAt: HLC.timestamp(),
            id: payload.vaultId,
            payload: {}
        }

        EventService.sendAllEvents([removeVaultMessage], authToken)
            .then(rs => console.log(rs));

        // fs.appendFileSync(vaultPathState, toJson(removeVaultMessage));
    }

    static updateVault(payload, authToken) {
        // let vaultPathState = this.getVaultPathState(payload);

        let updateVaultMessage = {
            event: 'UPDATE_VAULT',
            happenAt: HLC.timestamp(),
            id: payload.vaultId,
            payload: payload.body
        }


        EventService.sendAllEvents([updateVaultMessage], authToken)
            .then(rs => console.log(rs));

        // fs.appendFileSync(vaultPathState, toJson(updateVaultMessage));
    }

    // static getVaultPathState(payload) {
    //     let nowUser = payload.nowUser;
    //     let vaultPath = join(DATA_PATH, nowUser, payload.vaultId)
    //     return join(vaultPath, VAULT_STATE_FILE);
    // }
}