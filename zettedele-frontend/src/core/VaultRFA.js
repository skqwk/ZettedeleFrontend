const createVaultOperation = (payload, vault) => {
    console.log('createVaultOperation');
    vault.id = payload.id;
    vault.name = payload.name;
    vault.deleted = false;
}


const removeVaultOperation = (payload, vault) => {
    console.log('removeVaultOperation');
    vault.deleted = true;
}

const updateVaultOperation = (payload, vault) => {
    console.log('updateVaultOperation');
    let field = Object.keys(payload)[0];
    let value = Object.values(payload)[0]
    vault[field] = value;
}


export class VaultRFA {
    static eventMap = {
        'CREATE_VAULT': createVaultOperation,
        'UPDATE_VAULT': updateVaultOperation,
        'REMOVE_VAULT': removeVaultOperation
    }

    static applyEvent(event, vault) {
        const operation = this.eventMap[event.event];
        const params = {...event.payload, happenAt: event.happenAt}
        operation(params, vault);
    }
}