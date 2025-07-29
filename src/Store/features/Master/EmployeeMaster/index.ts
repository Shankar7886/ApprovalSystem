import {
  fetchCityApiFn,
  fetchCountryApiFn,
  fetchDepartmentList,
  fetchDesignationList,
  fetchEmployeesMaster,
  fetchStateApiFn,
  getAllEmployeeAddress,
} from "@/services/Master/employeeMaster";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Employee {
  ID: number;
  EmployeeCode: string;
  FirstName: string;
  LastName: string;
  Gender: string;
  DOB: string;
  DOJ: string;
  DepartmentID: number;
  DesignationID: number;
  IsActive: boolean;
  IsDeleted: boolean | null;
  Department: string | null;
  Designation: string | null;
}

export interface Designation {
  ID: number;
  DesignationName: string | null;
  DesignationCode: string | null;
  IsActive: boolean | null;
  IsDeleted: boolean | null;
}

export interface Department {
  ID: number;
  DepartmentName: string | null;
  DepartmentCode: string | null;
  IsActive: boolean | null;
  IsDeleted: boolean | null;
}

export interface Country {
  ID: number;
  CountryName: string | null;
  CountryCode: string | null;
  IsActive: boolean | null;
  IsDeleted: boolean | null;
}

export interface State {
  ID: number;
  StateName: string | null;
  StateCode: string | null;
  CountryID: number | null;
  IsActive: boolean | null;
  IsDeleted: boolean | null;
  Country: string | null;
}

export interface City {
  ID: number;
  CityName: string | null;
  CityCode: string | null;
  StateID: number;
  IsActive: boolean | null;
  IsDeleted: boolean | null;
  StateName: string | null;
  CountryName: string | null;
}

export interface EmployeeAddress {
  AddressID: number;
  EmployeeID: number;
  Address1: string;
  Address2: string;
  CityID: number | null;
  StateID: number | null;
  CountryID: number | null;
  Pincode: string | null;
  Employee: string | null;
}

interface ApiResponse<T> {
  Data: T;
  IsSuccess: boolean;
  StatusCode: number;
  DisplayMessage: string;
  ErrorMessage: string[];
}

interface EmployeeState {
  data: Employee[];
  loading: boolean;
  error: string | null;
  designationlist: Designation[];
  departmentList: Department[];
  countryList: Country[];
  stateList: State[];
  cityList: City[];
  addressList: EmployeeAddress[];
}

const initialState: EmployeeState = {
  data: [],
  loading: false,
  error: null,
  designationlist: [],
  departmentList: [],
  countryList: [],
  stateList: [],
  cityList: [],
  addressList: [],
};

export const fetchEmployees = createAsyncThunk<Employee[]>(
  "employees/fetchEmployees",
  async () => {
    const res: ApiResponse<Employee[]> = await fetchEmployeesMaster();
    return res.Data;
  }
);
export const fetchDesignation = createAsyncThunk<Designation[]>(
  "employees/fetchDesignation",
  async () => {
    const res: ApiResponse<Designation[]> = await fetchDesignationList();
    return res.Data;
  }
);

export const fetchDepartment = createAsyncThunk<Department[]>(
  "employees/fetchDepartment",
  async () => {
    const res: ApiResponse<Department[]> = await fetchDepartmentList();
    return res.Data;
  }
);

export const fetchCountry = createAsyncThunk<Country[]>(
  "employees/fetchCountry",
  async () => {
    const res: ApiResponse<Country[]> = await fetchCountryApiFn();
    return res.Data;
  }
);
export const fetchState = createAsyncThunk<State[]>(
  "employees/fetchState",
  async () => {
    const res: ApiResponse<State[]> = await fetchStateApiFn();
    return res.Data;
  }
);

export const fetchCity = createAsyncThunk<City[]>(
  "employees/fetchCity",
  async () => {
    const res: ApiResponse<City[]> = await fetchCityApiFn();
    return res.Data;
  }
);

export const fetchEmpAddress = createAsyncThunk<EmployeeAddress[]>(
  "employee/massAddress",
  async () => {
    const res: ApiResponse<EmployeeAddress[]> = await getAllEmployeeAddress();
    return res.Data;
  }
);

const employeeListSlice = createSlice({
  name: "employeeList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employees";
      })
      .addCase(fetchDesignation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesignation.fulfilled, (state, action) => {
        state.loading = false;
        state.designationlist = action.payload;
      })
      .addCase(fetchDesignation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employees";
      })
      .addCase(fetchDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentList = action.payload;
      })
      .addCase(fetchDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employees";
      })
      .addCase(fetchCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.countryList = action.payload;
      })
      .addCase(fetchCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employees";
      })
      .addCase(fetchState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchState.fulfilled, (state, action) => {
        state.loading = false;
        state.stateList = action.payload;
      })
      .addCase(fetchState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employees";
      })
      .addCase(fetchCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cityList = action.payload;
      })
      .addCase(fetchCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employees";
      })
      .addCase(fetchEmpAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmpAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addressList = action.payload;
      })
      .addCase(fetchEmpAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employees";
      });
  },
});

export default employeeListSlice.reducer;
