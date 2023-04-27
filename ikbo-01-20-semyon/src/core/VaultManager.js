import {HLC} from "./clock/HLC";
import {toJson} from "../utils/JsonUtil";

const fs = window.require('fs');
const {join} = window.require('path');
const {app} = window.require('@electron/remote');

const appPath = app.getAppPath();
const dataPath = join(appPath, 'data', 'users');

export const VAULT_STATE_FILE = 'vault.state';

export class VaultManager {
    static createVault(payload) {
        let vaultPath = join(dataPath, payload.nowUser, payload.vaultId);
        let vaultPathState = this.getVaultPathState(payload);

        let createVaultMessage = {
            event: 'CREATE_VAULT',
            happenAt: HLC.timestamp(),
            payload: {
                id: payload.vaultId,
                name: payload.name
            }
        }

        fs.mkdirSync(vaultPath);
        fs.writeFileSync(vaultPathState, toJson(createVaultMessage));
    }

    static removeVault(payload) {
        let vaultPathState = this.getVaultPathState(payload);

        let removeVaultMessage = {
            event: 'REMOVE_VAULT',
            happenAt: HLC.timestamp(),
            id: payload.vaultId,
            payload: {}
        }

        fs.appendFileSync(vaultPathState, toJson(removeVaultMessage));
    }

    static updateVault(payload) {
        let vaultPathState = this.getVaultPathState(payload);

        let updateVaultMessage = {
            event: 'UPDATE_VAULT',
            happenAt: HLC.timestamp(),
            payload: payload.body
        }

        fs.appendFileSync(vaultPathState, toJson(updateVaultMessage));
    }

    static getVaultPathState(payload) {
        let nowUser = payload.nowUser;
        let vaultPath = join(dataPath, nowUser, payload.vaultId)
        return join(vaultPath, VAULT_STATE_FILE);
    }
}