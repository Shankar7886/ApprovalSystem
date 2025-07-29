import { fetchCountryMaster } from "@/services/Master/Location/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Country {
  ID: Number;
  IsActive: Boolean;
  IsDeleted: Boolean | null;
  CountryCode: String;
  CountryName: String;
}

interface ApiResponse<T> {
  Data: T;
  IsSuccess: boolean;
  StatusCode: number;
  DisplayMessage: string;
  ErrorMessage: string[];
}

interface InitialState {
  data: Country[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchCountry = createAsyncThunk<Country[]>(
  "location/fetchCountry",
  async () => {
    const res: ApiResponse<Country[]> = await fetchCountryMaster();
    return res.Data;
  }
);

const CountryListSlice = createSlice({
  name: "countryList",
  initialState,
  reducers: {
    addCountry: (state, action) => {
      state.data.push(action.payload);
    },
    deleteCountry: (state, action) => {
      state.data = state.data.filter(
        (country) => country.ID !== action.payload
      );
    },
    updateCountry: (state, action) => {
      const updatedCountry = action.payload;
      const index = state.data.findIndex(
        (country) => country.ID === updatedCountry.ID
      );
      if (index !== -1) {
        state.data[index] = updatedCountry;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cities";
      });
  },
});
export const { addCountry, updateCountry } = CountryListSlice.actions;

export default CountryListSlice.reducer;
