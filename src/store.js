import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { loginUserReducer } from "./reducers/userReducer";

const finalReducer = combineReducers({
    loginUserReducer: loginUserReducer,
});

const currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null;
const initialState = {
    loginUserReducer: {
        currentUser: currentUser,
    },
};

const composeEnhancers = composeWithDevTools({});
const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
