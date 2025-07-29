import { fetchStatesMaster } from "@/services/reduxApiUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface State {
  ID: Number;
  StateName: String;
  StateCode: String;
  CountryID: Number;
  IsActive: Boolean;
  IsDeleted: Boolean | null;
  Country: String | null;
}

interface ApiResponse<T> {
  Data: T;
  IsSuccess: boolean;
  StatusCode: number;
  DisplayMessage: string;
  ErrorMessage: string[];
}

interface InitialState {
  data: State[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchStates = createAsyncThunk<State[]>(
  "state/fetchStates",
  async () => {
    const res: ApiResponse<State[]> = await fetchStatesMaster();
    return res.Data;
  }
);

const stateListSlice = createSlice({
  name: "stateList",
  initialState,
  reducers: {
    addState(state, action) {
      state.data.push(action.payload);
    },
    deleteState(state, action) {
      state.data = state.data.filter((state) => state.ID !== action.payload);
    },
    updateState(state, action) {
      const updatedState = action.payload;
      const index = state.data.findIndex(
        (state) => state.ID === updatedState.ID
      );
      if (index !== -1) {
        state.data[index] = updatedState;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch states";
      });
  },
});

export const { addState, deleteState, updateState } = stateListSlice.actions;

export default stateListSlice.reducer;
