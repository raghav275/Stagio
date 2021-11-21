import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface User {
  name: string;
  email: string;
}

const initialState: User = {
  name: "",
  email: "",
};
const userReducer = (state: User, action: PayloadAction<User>) => {
  state.name = action.payload.name;
  state.email = action.payload.email;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    user: userReducer,
  },
});

// reducers/actions go in here in order to import them into components
export const { user } = userSlice.actions;

export default userSlice.reducer;
