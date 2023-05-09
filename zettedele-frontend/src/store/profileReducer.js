const defaultState = {
    name: "userA"
}

const CHECKOUT = 'CHECKOUT';
const RESET = 'RESET';

export const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHECKOUT:
            return state;
            // checkoutProfileUseCase(state, action.payload);
        case RESET:
            return state;
            /// resetProfileUseCase(state);
        default:
            return state;
    }
}

export const checkoutProfileAction = (payload) => ({type: CHECKOUT, payload});
export const resetProfileAction = () => ({type: RESET});

const checkoutProfileUseCase = (state, payload) => {
    console.log(payload);
    console.log(`Change user from ${state.name} to ${payload.name}`);

    // let config = SyncManager.init(payload.name);
    // HLC.init(payload.name, config.nodeId);

    return {name: payload.name};
};

const resetProfileUseCase = (state) => {
    return {name: null};
}