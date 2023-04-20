const defaultState = {
    isAuth: false,
    authToken: null
}

const LOGOUT = 'LOGOUT';
const LOGIN = 'LOGIN';

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGOUT:
            return logoutUseCase(state);
        case LOGIN:
            return loginUseCase(state, action.payload);
        default:
            return state;
    }
}

export const logoutAction = () => ({type: LOGOUT});
export const loginAction = (payload) => ({type: LOGIN, payload});

const logoutUseCase = (state) => {
    console.log(`User logout`);
    return {...state, isAuth: false, authToken: null};
};

const loginUseCase = (state, payload) => {
    console.log(`User login`);
    return {...state, isAuth: true, authToken: payload.authToken};
};