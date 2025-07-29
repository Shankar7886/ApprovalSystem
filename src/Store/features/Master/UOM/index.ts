import { fetchUnitOfMeasurementAPI } from "@/services/Master/UOM/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface UOM {
  Id: number;
  UomCode: string;
  Name: string;
  IsActive: boolean;
  IsDeleted: boolean | null;
}

interface ApiResponse<T> {
  Data: T;
  IsSuccess: boolean;
  StatusCode: number;
  DisplayMessage: string;
  ErrorMessage: string[];
}

interface InitialState {
  data: UOM[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchUnitOfMeasurementList = createAsyncThunk<UOM[]>(
  "master/fetchUnitOfMeasurementList",
  async () => {
    const res: ApiResponse<UOM[]> = await fetchUnitOfMeasurementAPI();
    return res.Data;
  }
);

const UnitOfMeasurementList = createSlice({
  name: "UnitOfMeasurementList",
  initialState,
  reducers: {
    addUnitOfMeasurement: (state, action) => {
      state.data.push(action.payload);
    },
    updateUnitOfMeasurement: (state, action) => {
      const index = state.data.findIndex((uom) => uom.Id === action.payload.Id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
    },
    deleteUnitOfMeasurement: (state, action) => {
      const index = state.data.findIndex((uom) => uom.Id === action.payload.Id);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnitOfMeasurementList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnitOfMeasurementList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUnitOfMeasurementList.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch Unit of Measurements";
      });
  },
});
export const {
  addUnitOfMeasurement,
  updateUnitOfMeasurement,
  deleteUnitOfMeasurement,
} = UnitOfMeasurementList.actions;
export default UnitOfMeasurementList.reducer;
