import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiStatus } from "../constant/commonConstant";
import axios from "axios";
import { ILoginData } from "../interfaces/AuthInterface";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: apiStatus.IDLE,
  },
  reducers: {},
  // extraReducers(builder) {
  //   builder
  //     .addCase(loginUser.pending, (state) => {
  //       state.status = apiStatus.LOADING;
  //     })
  //     .addCase(loginUser.fulfilled, (state, action) => {
  //       state.status = apiStatus.IDLE;
  //       state.data = action.payload;
  //     })
  //     .addCase(loginUser.rejected, (state) => {
  //       state.status = apiStatus.ERROR;
  //     });
  // },
});

export default authSlice.reducer;

export const loginUser = createAsyncThunk("auth/fetch", async (loginData: ILoginData) => {
  const res = await axios.post("http://localhost:9000/api/v1/auth/login", loginData, {
    withCredentials: true,
  });

  return res.data;
});

export const registerUser = createAsyncThunk("auth/fetch", async (loginData: ILoginData) => {
  const res = await axios.post("http://localhost:9000/api/v1/auth/register", loginData);

  return res.data;
});
