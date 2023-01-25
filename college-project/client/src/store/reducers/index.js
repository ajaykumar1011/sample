import { SHOW_LOADING, SHOW_TOAST, STOP_LOADING, STOP_TOAST } from "../types";
import { authReducer, employees, salaries } from "./auth";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

function loaders(state = { toaster: 0, loader: 0 }, action) {
  switch (action.type) {
    case SHOW_TOAST: {
      const toaster = ++state.toaster;
      return {
        ...state,
        toaster,
        errorMessage: action.message,
        severity: action.severity
      };
    }
    case STOP_TOAST: {
      // const toaster = Math.max(0, --state.toaster);
      return { ...state, toaster: 0 };
    }
    case SHOW_LOADING: {
      const loader = ++state.loader;
      return { ...state, loader };
    }
    case STOP_LOADING: {
      // const loader = Math.max(0, --state.loader);
      return { ...state, loader: 0 };
    }
    default:
      return state;
  }
}
const rootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    loaders,
    auth: authReducer,
    employees,
    salaries
  });
};
export default rootReducer;
