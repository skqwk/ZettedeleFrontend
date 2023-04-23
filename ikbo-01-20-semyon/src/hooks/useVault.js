import {useSelector} from "react-redux";

export const useVault = (vaultId) => {
    return useSelector(state => getVaultByVaultId(state.vault.vaults, vaultId));
}

const getVaultByVaultId = (vaults, vaultId) => {
    console.log('LOAD VAULT WITH NAME: ', vaultId);
    return vaults.find(v => v.id === vaultId);
}
