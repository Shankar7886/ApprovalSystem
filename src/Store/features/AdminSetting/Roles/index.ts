import { fetchRolesAdmin } from "@/services/AdminSetting/Roles";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Roles {
  RoleId: number;
  RoleName: string;
  Description: string;
  IsActive: boolean;
}

interface ApiResponse<T> {
  Data: T;
  IsSuccess: boolean;
  StatusCode: number;
  DisplayMessage: string;
  ErrorMessage: string[];
}

interface InitialState {
  data: Roles[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchRolesList = createAsyncThunk<Roles[]>(
  "adminSetting/fetchRolesList",
  async () => {
    const res: ApiResponse<Roles[]> = await fetchRolesAdmin();
    return res.Data;
  }
);

const rolesListSlice = createSlice({
  name: "rolesList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRolesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolesList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRolesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch roles";
      });
  },
});

export default rolesListSlice.reducer;
