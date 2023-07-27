import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    apiKey: "shinad-dbs",
    token: "",
    isAuth: false,
    userName: ""

  },
  reducers: {
    addToken: (state, action) => {
      state.isAuth = true;
      
      state.token = action.payload;
    },
    addUserName: (state, action) => {
      state.userName = action.payload;
    },
    clearState: (state) => {
      state = userSlice.initialState;
    }
  }
});

export const { addToken, addUserName, clearState } = userSlice.actions;

export default userSlice.reducer;
