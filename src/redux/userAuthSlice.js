import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserAuth: false,
};

export const userAuthSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.isUserAuth = action.payload;
    },
  },
});

export const { setUserAuth } = userAuthSlice.actions;

export default userAuthSlice.reducer;
