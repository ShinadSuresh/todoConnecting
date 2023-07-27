import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import TodoSlice from "./TodoSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    todo: TodoSlice
  }
});
