import { fetchCompanyMaster } from "@/services/Master/Company/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Company {
  // ID: Number;
  CompanyID: Number;
  CompanyName: String;
  DisplayName: String;
  LogoPath: String;
  RightsCompany: String;
  IsActive: Boolean;
  IsDeleted: Boolean;
}

interface ApiResponse<T> {
  Data: T;
  IsSuccess: boolean;
  StatusCode: number;
  DisplayMessage: string;
  ErrorMessage: string[];
}

interface InitialState {
  data: Company[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchCompany = createAsyncThunk<Company[]>(
  "master/fetchCompany",
  async () => {
    const res: ApiResponse<Company[]> = await fetchCompanyMaster();
    return res.Data;
  }
);

const companyListSlice = createSlice({
  name: "companyList",
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.data.push(action.payload);
    },
    updateCompany: (state, action) => {
      const updatedCompany = action.payload;
      const index = state.data.findIndex(
        (company) => company.CompanyID === updatedCompany.CompanyID
      );
      if (index !== -1) {
        state.data[index] = updatedCompany;
      }
    },
    deleteCompany: (state, action) => {
      state.data = state.data.filter(
        (company) => company.CompanyID !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch companies";
      });
  },
});
export const { addCompany, updateCompany, deleteCompany } =
  companyListSlice.actions;
export default companyListSlice.reducer;
