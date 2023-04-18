const defaultState = {
    name: "skqwk"
}

const CHECKOUT = 'CHECKOUT';

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHECKOUT:
            return checkoutUserUseCase(state, action.payload);
        default:
            return state;
    }
}

export const checkoutUserAction = (username) => ({type: CHECKOUT, payload: {name: username}});

const checkoutUserUseCase = (state, payload) => {
    console.log(`Change user from ${state.user.name} to ${payload.name}`);
    return {name: payload.name};
};