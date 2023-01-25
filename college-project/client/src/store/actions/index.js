import { GET_METHOD, POST_METHOD, PUT_METHOD } from "../../utils";
import { CALL_API } from "../api.middleware";
import {
  ADD_EMPLOYEES_PROGRESS,
  ADD_EMPLOYEES_SUCCESS,
  ADD_SALARIES_PROGRESS,
  ADD_SALARIES_SUCCESS,
  GET_EMPLOYEES_PROGRESS,
  GET_EMPLOYEES_SUCCESS,
  GET_SALARIES_PROGRESS,
  GET_SALARIES_SUCCESS,
  UPDATE_PROFILE_PROGRESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_SALARY_PROGRESS,
  UPDATE_SALARY_SUCCESS,
  USER_LOGIN_PROGRESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_PROGRESS,
  USER_LOGOUT_SUCCESS
} from "../types";

export const adminLogin = (payload) => async (dispatch) => {
  let resp = await dispatch({
    [CALL_API]: {
      url: `/admin/login`,
      method: POST_METHOD,
      types: [USER_LOGIN_PROGRESS, USER_LOGIN_SUCCESS],
      body: payload
    }
  });
  // dispatch(push(`/dashboard`));
  return resp;
};

export const addEmployee = (payload) => async (dispatch) => {
  return await dispatch({
    [CALL_API]: {
      types: [ADD_EMPLOYEES_PROGRESS, ADD_EMPLOYEES_SUCCESS],
      body: payload,
      showToast: true,
      toastMessage: `Employee created successfully.`,
      url: `/admin/employees/create`,
      method: POST_METHOD
    }
  });
};

export const getEmployees = () => async (dispatch) => {
  return await dispatch({
    [CALL_API]: {
      types: [GET_EMPLOYEES_PROGRESS, GET_EMPLOYEES_SUCCESS],
      url: `/admin/employees/list`,
      method: GET_METHOD
    }
  });
};

export const editProfile = (payload) => async (dispatch) => {
  return await dispatch({
    [CALL_API]: {
      types: [UPDATE_PROFILE_PROGRESS, UPDATE_PROFILE_SUCCESS],
      body: payload,
      showToast: true,
      toastMessage: "Profile details updated.",
      url: `/admin/employees/${payload.id}`,
      method: PUT_METHOD
    }
  });
};

export const addSalary = (payload, id) => async (dispatch) => {
  return await dispatch({
    [CALL_API]: {
      types: [ADD_SALARIES_PROGRESS, ADD_SALARIES_SUCCESS],
      url: `/admin/employees/${id}/add-salary`,
      method: POST_METHOD,
      body: payload
    }
  });
};

export const getEmployeeSalaries = (id) => async (dispatch) => {
  return await dispatch({
    [CALL_API]: {
      types: [GET_SALARIES_PROGRESS, GET_SALARIES_SUCCESS],
      url: `/admin/employees/${id}/salaries`,
      method: GET_METHOD
    }
  });
};

export const editSalary = (payload, id, salary_id) => async (dispatch) => {
  return await dispatch({
    [CALL_API]: {
      types: [UPDATE_SALARY_PROGRESS, UPDATE_SALARY_SUCCESS],
      url: `/admin/employees/${id}/salaries/${salary_id}`,
      method: PUT_METHOD,
      body: payload
    }
  });
};

export const adminLogout = () => async (dispatch) => {
  return await dispatch({
    [CALL_API]: {
      types: [USER_LOGOUT_PROGRESS, USER_LOGOUT_SUCCESS],
      url: `/admin/logout`,
      method: GET_METHOD,
      showToast: true,
      toastMessage: `Loggedout successfully.`
    }
  });
};
