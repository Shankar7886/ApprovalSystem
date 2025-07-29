import { fetchDepartmentMasterAPI } from "@/services/Master/Department/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Department {
  ID: number;
  DepartmentName: string;
  DepartmentCode: string;
  IsActive: boolean;
  // isDeleted: boolean;
}

interface ApiResponse<T> {
  Data: T;
  IsSuccess: boolean;
  StatusCode: number;
  DisplayMessage: string;
  ErrorMessage: string[];
}

interface InitialState {
  data: Department[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchDepartmentList = createAsyncThunk<Department[]>(
  "master/fetchDepartmentList",
  async () => {
    const res: ApiResponse<Department[]> = await fetchDepartmentMasterAPI();
    return res.Data;
  }
);

const departmentListSlice = createSlice({
  name: "departmentList",
  initialState,
  reducers: {
    addDepartementRecord: (state, action) => {
      state.data.push(action.payload);
    },
    deleteDepartementRecord: (state, action) => {
      state.data = state.data.filter(
        (department) => department.ID !== action.payload
      );
    },
    updateDepartementRecord: (state, action) => {
      const updatedDepartement = action.payload;
      const index = state.data.findIndex(
        (department) => department.ID === updatedDepartement.ID
      );
      if (index !== -1) {
        state.data[index] = updatedDepartement;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartmentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDepartmentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch departments";
      });
  },
});
export const {
  addDepartementRecord,
  deleteDepartementRecord,
  updateDepartementRecord,
} = departmentListSlice.actions;

export default departmentListSlice.reducer;
