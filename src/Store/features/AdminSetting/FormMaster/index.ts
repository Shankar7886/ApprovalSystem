import { fetchFormMasterAPI } from "@/services/AdminSetting/FormMaster";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface FormMaster {
  FormId: number;
  FormName: string;
  Description: string;
}

interface ApiResponse<T> {
  Data: T;
  IsSuccess: boolean;
  StatusCode: number;
  DisplayMessage: string;
  ErrorMessage: string[];
}

interface InitialState {
  data: FormMaster[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchFormMasterList = createAsyncThunk<FormMaster[]>(
  "adminSetting/fetchFormMasterList",
  async () => {
    const res: ApiResponse<FormMaster[]> = await fetchFormMasterAPI();
    return res.Data;
  }
);

const formMasterListSlice = createSlice({
  name: "formMasterList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormMasterList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormMasterList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFormMasterList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch form master";
      });
  },
});

export default formMasterListSlice.reducer;
