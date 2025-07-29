import { fetchItemMasterAPI } from "@/services/AdminSetting/ItemMaster";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ItemMaster {
  Id: number;
  ItemCode: string;
  ItemName: string;
  UnitOfMeasurementId: number;
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
  data: ItemMaster[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchItemMasterList = createAsyncThunk<ItemMaster[]>(
  "adminSetting/fetchItemMasterList",
  async () => {
    const res: ApiResponse<ItemMaster[]> = await fetchItemMasterAPI();
    return res.Data;
  }
);

const itemMasterSlice = createSlice({
  name: "itemMasterList",
  initialState,
  reducers: {
    addItemMasterRecord: (state, action) => {
      state.data.push(action.payload);
    },
    deleteItemMasterRecord: (state, action) => {
      state.data = state.data.filter(
        (ItemMaster) => ItemMaster.Id !== action.payload
      );
    },
    updateItemMasterRecord: (state, action) => {
      const updatedItemMaster = action.payload;
      const index = state.data.findIndex(
        (ItemMaster) => ItemMaster.Id === updatedItemMaster.Id
      );
      if (index !== -1) {
        state.data[index] = updatedItemMaster;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemMasterList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItemMasterList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchItemMasterList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch item master";
      });
  },
});
export const {
  addItemMasterRecord,
  deleteItemMasterRecord,
  updateItemMasterRecord,
} = itemMasterSlice.actions;

export default itemMasterSlice.reducer;
