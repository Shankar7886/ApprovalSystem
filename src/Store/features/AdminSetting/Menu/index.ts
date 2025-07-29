import { fetchMenuListAPI } from "@/services/AdminSetting/Menu/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface MenuList {
  MenuId: number;
  MenuName: string;
  ParentMenuId: null | number;
  MenuGroupId: number;
  URL: string;
  Icon: string;
  DisplayOrder: number;
  FormId: number;
  ParentMenu: null | string;
  MenuGroup: null | string;
}

interface ApiResponse<T> {
  Data: T;
  IsSuccess: boolean;
  StatusCode: number;
  DisplayMessage: string;
  ErrorMessage: string[];
}

interface InitialState {
  data: MenuList[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchMenuList = createAsyncThunk<MenuList[]>(
  "adminSetting/fetchMenuList",
  async () => {
    const res: ApiResponse<MenuList[]> = await fetchMenuListAPI();
    return res.Data;
  }
);

const MenuListSlice = createSlice({
  name: "MenuListSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMenuList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch menu list";
      });
  },
});

export default MenuListSlice.reducer;
