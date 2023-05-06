const defaultState = {
    offline: false
}

const ONLINE = 'ONLINE';
const OFFLINE = 'OFFLINE';

export const connectionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ONLINE:
            console.log("Connected");
            return {...state, offline: action.payload}
        case OFFLINE:
            console.log("Disconnected");
            return {...state, offline: action.payload}
        default:
            return state;
    }
}

export const offlineAction = () => ({type: OFFLINE, payload: true});
export const onlineAction = () => ({type: ONLINE, payload: false});