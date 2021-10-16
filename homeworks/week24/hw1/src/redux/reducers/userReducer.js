import { createSlice } from "@reduxjs/toolkit";
import {
  login as loginApi,
  getMe as getMeApi,
  register as registerApi,
} from "../../WebAPI";
import { setAuthToken } from "../../utils";

const initialState = {
  errMessage: null,
  user: null,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setErrMessage: (state, action) => {
      state.errMessage = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setErrMessage, setUser } = userReducer.actions;

export const login = (username, password) => (dispatch) => {
  return loginApi(username, password).then((data) => {
    if (!data.ok) {
      return dispatch(setErrMessage(data.message));
    }
    setAuthToken(data.token);

    return getMeApi()?.then((res) => {
      if (!res.ok) {
        setAuthToken(null);
        return dispatch(setErrMessage(res.toString()));
      }
      dispatch(setUser(res.data));
      return res.data;
    });
  });
};

export const register = (nickname, username, password) => (dispatch) => {
  return registerApi(nickname, username, password).then((data) => {
    if (!data.ok) {
      return dispatch(setErrMessage(data.message));
    }
    setAuthToken(data.token);

    return getMeApi().then((res) => {
      if (!res.ok) {
        setAuthToken(null);
        return dispatch(setErrMessage(res.toString()));
      }
      dispatch(setUser(res.data));
      return res.data;
    });
  });
};

export const logout = () => (dispatch) => {
  setAuthToken("");
  dispatch(setUser(null));
};

export const getMe = () => (dispatch) => {
  getMeApi()?.then((res) => {
    if (!res.ok) {
      setAuthToken(null);
      return dispatch(setErrMessage(res.toString()));
    }
    dispatch(setUser(res.data));
  });
};

export const cleanErrMessage = () => (dispatch) => {
  dispatch(setErrMessage(null));
};

export default userReducer.reducer;
