import { fetchProjectAPI } from "@/services/Master/Project";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Project {
  Id: number;
  CompanyId: number;
  ProjectName: string;
  ProjectCode: string;
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
  data: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchProjectList = createAsyncThunk<Project[]>(
  "master/fetchProjectList",
  async () => {
    const res: ApiResponse<Project[]> = await fetchProjectAPI();
    return res.Data;
  }
);

const projectListSlice = createSlice({
  name: "projectList",
  initialState,
  reducers: {
    addProjectRecord: (state, action) => {
      state.data.push(action.payload);
    },
    deleteProjectRecord: (state, action) => {
      state.data = state.data.filter(
        (project) => project.Id !== action.payload
      );
    },
    updateProjectRecord: (state, action) => {
      const updatedProject = action.payload;
      const index = state.data.findIndex(
        (project) => project.Id === updatedProject.Id
      );
      if (index !== -1) {
        state.data[index] = updatedProject;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProjectList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch project";
      });
  },
});

export const { addProjectRecord, deleteProjectRecord, updateProjectRecord } =
  projectListSlice.actions;

export default projectListSlice.reducer;
