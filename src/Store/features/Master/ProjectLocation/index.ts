import { fetchProjectLocationAPI } from "@/services/Master/ProjectLocation/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ProjectLocation {
  ID: number;
  ProjectID: number;
  Location: string;
  IsActive: boolean;
  IsDeleted: boolean;
}

interface ApiResponse<T> {
  Data: T;
  IsSuccess: boolean;
  StatusCode: number;
  DisplayMessage: string;
  ErrorMessage: string[];
}

interface InitialState {
  data: ProjectLocation[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchProjectLocationList = createAsyncThunk<ProjectLocation[]>(
  "master/fetchProjectLocationList",
  async () => {
    const res: ApiResponse<ProjectLocation[]> = await fetchProjectLocationAPI();
    return res.Data;
  }
);

const projectLocationListSlice = createSlice({
  name: "projectLocationList",
  initialState,
  reducers: {
    addProjectLocation: (state, action) => {
      state.data.push(action.payload);
    },
    deleteProjectLocation: (state, action) => {
      state.data = state.data.filter(
        (project) => project.ID !== action.payload
      );
    },
    updateProjectLocationRecord: (state, action) => {
      const updatedProject = action.payload;
      const index = state.data.findIndex(
        (project) => project.ID === updatedProject.ID
      );
      if (index !== -1) {
        state.data[index] = updatedProject;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectLocationList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectLocationList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProjectLocationList.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch project locations";
      });
  },
});
export const {
  addProjectLocation,
  deleteProjectLocation,
  updateProjectLocationRecord,
} = projectLocationListSlice.actions;

export default projectLocationListSlice.reducer;
