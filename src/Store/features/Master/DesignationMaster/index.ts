import { fetchDesignationMasterAPI } from "@/services/Master/Designation/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Designation {
  ID: number;
  DesignationName: string;
  DesignationCode: string;
  IsActive: boolean;
  IsDeleted: boolean;
}

interface ApiResponse<T> {
  Data: T;
  IsSuccess: boolean;
  StatusCode: number;
  DisplayMessage: string;
  ErrorMessage: string[];
}

interface InitialState {
  data: Designation[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchDesignationList = createAsyncThunk<Designation[]>(
  "master/fetchDesignationList",
  async () => {
    const res: ApiResponse<Designation[]> = await fetchDesignationMasterAPI();
    return res.Data;
  }
);

const designationListSlice = createSlice({
  name: "designationList",
  initialState,
  reducers: {
    addDesignationRecord: (state, action) => {
      state.data.push(action.payload);
    },
    deleteDesignationRecord: (state, action) => {
      state.data = state.data.filter(
        (Designation) => Designation.ID !== action.payload
      );
    },
    updateDesignationRecord: (state, action) => {
      const updatedDesignation = action.payload;
      const index = state.data.findIndex(
        (Designation) => Designation.ID === updatedDesignation.ID
      );
      if (index !== -1) {
        state.data[index] = updatedDesignation;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignationList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesignationList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDesignationList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch designations";
      });
  },
});

export const {
  addDesignationRecord,
  deleteDesignationRecord,
  updateDesignationRecord,
} = designationListSlice.actions;

export default designationListSlice.reducer;
