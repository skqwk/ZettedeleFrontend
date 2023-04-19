const defaultState = {
    name: "skqwk"
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

export const checkoutProfileAction = (name) => ({type: CHECKOUT, payload: {name}});

const checkoutProfileUseCase = (state, payload) => {
    console.log(`Change user from ${state.profile.name} to ${payload.name}`);
    return {...state, profile: payload.name};
};