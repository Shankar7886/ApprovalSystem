import { fetchCityMaster } from "@/services/reduxApiUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface City {
  ID: Number;
  CityName: String;
  CityCode: String;
  StateID: Number;
  IsActive: Boolean;
  IsDeleted: Boolean | null;
  StateName: String;
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
  data: City[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchCities = createAsyncThunk<City[]>(
  "city/fetchCities",
  async () => {
    const res: ApiResponse<City[]> = await fetchCityMaster();
    return res.Data;
  }
);

const CityListSlice = createSlice({
  name: "cityList",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.data.push(action.payload);
    },
    deleteCity: (state, action) => {
      state.data = state.data.filter((city) => city.ID !== action.payload);
    },
    updateCity: (state, action) => {
      const updatedCity = action.payload;
      const index = state.data.findIndex((city) => city.ID === updatedCity.ID);
      if (index !== -1) {
        state.data[index] = updatedCity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cities";
      });
  },
});
export const { addCity, deleteCity, updateCity } = CityListSlice.actions;
export default CityListSlice.reducer;
