import {
  GET_EMPLOYEES_SUCCESS,
  GET_SALARIES_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_SALARY_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS
} from "../types/auth";
const initialState = {
  token: null
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      const { token } = action;
      return { ...state, token };
    }
    case USER_LOGOUT_SUCCESS:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export function employees(state = { data: [] }, action) {
  switch (action.type) {
    case GET_EMPLOYEES_SUCCESS:
      return { ...state, data: action.data };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, data: state.data.map((obj) => (obj.id === action.id ? action : obj)) };
    default:
      return state;
  }
}

export function salaries(state = { data: [] }, action) {
  switch (action.type) {
    case GET_SALARIES_SUCCESS:
      return { ...state, data: action.data };
    case UPDATE_SALARY_SUCCESS:
      return { ...state, data: state.data.map((obj) => (obj.id === action.id ? action : obj)) };
    default:
      return state;
  }
}
