import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Loading {
  loading: boolean;
}

const initialState: Loading = {
  loading: false,
};
const loadingReducer = (state: Loading, action: PayloadAction<Loading>) => {
  state.loading = action.payload.loading;
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    loading: loadingReducer,
  },
});

// reducers/actions go in here in order to import them into components
export const { loading } = loadingSlice.actions;

export default loadingSlice.reducer;
