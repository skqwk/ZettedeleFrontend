import {createStore, combineReducers, applyMiddleware} from "redux";
import {connectionReducer} from "./connectionReducer";
import {vaultReducer} from "./vaultReducer";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    connection: connectionReducer,
    vault: vaultReducer
})

export const store = createStore(rootReducer, composeWithDevTools());