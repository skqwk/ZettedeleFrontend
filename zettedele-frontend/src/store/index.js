import {combineReducers, createStore} from "redux";
import {connectionReducer} from "./connectionReducer";
import {vaultReducer} from "./vaultReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {profileReducer} from "./profileReducer";
import {authReducer} from "./authReducer";

const rootReducer = combineReducers({
    connection: connectionReducer,
    vault: vaultReducer,
    profile: profileReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, composeWithDevTools());