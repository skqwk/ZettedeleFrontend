const defaultState = {
    isAuth: true,
    authToken: "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgzMDg2MTczLCJleHAiOjE2ODQyOTU3NzN9.Sw6zWy3BMh_h8P81d4X1SygIC-Vx2gor0VK-g9uRTuxQJLcrfF-TMnrdTThVNoqL"
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