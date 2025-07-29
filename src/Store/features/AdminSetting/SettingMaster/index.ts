import { fetchSettingMasterAPI } from "@/services/AdminSetting/SettingMaster";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface SettingMaster {
  SettingId: number;
  SettingKey: string;
  SettingValue: string;
  SettingType: string;
  Application: string;
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
  data: SettingMaster[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchSettingMasterList = createAsyncThunk<SettingMaster[]>(
  "adminSetting/fetchSettingMasterList",
  async () => {
    const res: ApiResponse<SettingMaster[]> = await fetchSettingMasterAPI();
    return res.Data;
  }
);

const settingMasterSlice = createSlice({
  name: "settingMasterList",
  initialState,
  reducers: {
    addSettingRecord: (state, action) => {
      state.data.push(action.payload);
    },
    deleteSettingRecord: (state, action) => {
      state.data = state.data.filter(
        (settingMaster) => settingMaster.SettingId !== action.payload
      );
    },
    updateSettingRecord: (state, action) => {
      const updatedSettingMaster = action.payload;
      const index = state.data.findIndex(
        (settingMaster) =>
          settingMaster.SettingId === updatedSettingMaster.SettingId
      );
      if (index !== -1) {
        state.data[index] = updatedSettingMaster;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettingMasterList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettingMasterList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSettingMasterList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch setting master";
      });
  },
});

export const { addSettingRecord, deleteSettingRecord, updateSettingRecord } =
  settingMasterSlice.actions;

export default settingMasterSlice.reducer;
