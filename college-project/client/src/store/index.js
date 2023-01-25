import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import thunk from "redux-thunk";
// import apiMiddleware from "./api.middleware";
// import reduxLogger from "redux-logger";
import createRootReducer from "./reducers";
import apiMiddleware from "./api.middleware";

export const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer", "loaders", "auth"],
};

const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history) // root reducer with router state
);
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(thunk, apiMiddleware, routerMiddleware(history))
  )
);

export const persistor = persistStore(store);
export default store;
