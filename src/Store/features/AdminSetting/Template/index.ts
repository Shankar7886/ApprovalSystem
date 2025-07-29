import { fetchTemplateAPI } from "@/services/AdminSetting/Template";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Template {
  TemplateId: number;
  TemplateName: string;
  Description: string;
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
  data: Template[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchTemplateList = createAsyncThunk<Template[]>(
  "adminSetting/fetchTemplateList",
  async () => {
    const res: ApiResponse<Template[]> = await fetchTemplateAPI();
    return res.Data;
  }
);

const itemTemplateSlice = createSlice({
  name: "itemTemplateList",
  initialState,
  reducers: {
    addTemplateRecord: (state, action) => {
      state.data.push(action.payload);
    },
    deleteTemplateRecord: (state, action) => {
      state.data = state.data.filter(
        (template) => template.TemplateId !== action.payload
      );
    },
    updateTemplateRecord: (state, action) => {
      const updatedTemplate = action.payload;
      const index = state.data.findIndex(
        (template) => template.TemplateId === updatedTemplate.TemplateId
      );
      if (index !== -1) {
        state.data[index] = updatedTemplate;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplateList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplateList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTemplateList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch template master";
      });
  },
});

export const { addTemplateRecord, deleteTemplateRecord, updateTemplateRecord } =
  itemTemplateSlice.actions;

export default itemTemplateSlice.reducer;
