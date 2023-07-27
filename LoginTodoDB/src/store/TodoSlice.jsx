import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "Todo",
  initialState: {
    data: ""

  },
  reducers: {
    addTodo: (state, action) => {
        state.data=action.payload
    },
    StoreData: (state, action) => {
      state.action.payload
    }
  }
});

export const { addTodo, StoreData } = todoSlice.actions;

export default todoSlice.reducer;
