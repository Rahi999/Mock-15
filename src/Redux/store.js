import { legacy_createStore, compose } from "redux";
import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as AppReducer } from "./AppReducer/reducer";

const devtools = () => {
  return (
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

const rootReducer = combineReducers({
  App: AppReducer
});

export const store = legacy_createStore(
  rootReducer,
  compose(applyMiddleware(thunk), devtools())
);
