import {HLC} from "./clock/HLC";


export const VAULT_STATE_FILE = 'vault.state';

export class VaultManager {
    static createVault(payload) {
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

        // fs.mkdirSync(vaultPath);
        // fs.writeFileSync(vaultPathState, toJson(createVaultMessage));
    }

    static removeVault(payload) {
        // let vaultPathState = this.getVaultPathState(payload);

        let removeVaultMessage = {
            event: 'REMOVE_VAULT',
            happenAt: HLC.timestamp(),
            id: payload.vaultId,
            payload: {}
        }

        // fs.appendFileSync(vaultPathState, toJson(removeVaultMessage));
    }

    static updateVault(payload) {
        // let vaultPathState = this.getVaultPathState(payload);

        let updateVaultMessage = {
            event: 'UPDATE_VAULT',
            happenAt: HLC.timestamp(),
            id: payload.vaultId,
            payload: payload.body
        }

        // fs.appendFileSync(vaultPathState, toJson(updateVaultMessage));
    }

    // static getVaultPathState(payload) {
    //     let nowUser = payload.nowUser;
    //     let vaultPath = join(DATA_PATH, nowUser, payload.vaultId)
    //     return join(vaultPath, VAULT_STATE_FILE);
    // }
}