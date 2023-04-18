import {combineReducers, createStore} from "redux";
import {connectionReducer} from "./connectionReducer";
import {vaultReducer} from "./vaultReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {userReducer} from "./userReducer";

const rootReducer = combineReducers({
    connection: connectionReducer,
    vault: vaultReducer,
    user: userReducer
})

export const store = createStore(rootReducer, composeWithDevTools());