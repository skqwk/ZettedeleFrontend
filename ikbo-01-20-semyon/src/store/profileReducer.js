const defaultState = {
    name: null
}

const CHECKOUT = 'CHECKOUT';

export const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHECKOUT:
            return checkoutProfileUseCase(state, action.payload);
        default:
            return state;
    }
}

export const checkoutProfileAction = (payload) => ({type: CHECKOUT, payload});

const checkoutProfileUseCase = (state, payload) => {
    console.log(payload);
    console.log(`Change user from ${state.name} to ${payload.name}`);
    return {name: payload.name};
};