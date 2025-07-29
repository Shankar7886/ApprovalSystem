import { fetchMenuGroupAPI } from "@/services/AdminSetting/MenuGroup/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface MenuGroup {
  MenuGroupId: number;
  GroupName: string;
  DisplayOrder: number;
}

interface ApiResponse<T> {
  Data: T;
  IsSuccess: boolean;
  StatusCode: number;
  DisplayMessage: string;
  ErrorMessage: string[];
}

interface InitialState {
  data: MenuGroup[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchMenuGroupList = createAsyncThunk<MenuGroup[]>(
  "adminSetting/fetchMenuGroupList",
  async () => {
    const res: ApiResponse<MenuGroup[]> = await fetchMenuGroupAPI();
    return res.Data;
  }
);

const menuGroupListSlice = createSlice({
  name: "menuGroupList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuGroupList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuGroupList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMenuGroupList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch menu group list";
      });
  },
});

export default menuGroupListSlice.reducer;
