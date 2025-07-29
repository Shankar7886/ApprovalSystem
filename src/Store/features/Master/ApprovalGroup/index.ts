import { fetchApprovalGroupMaster } from "@/services/Master/ApprovalGroup/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ApprovalGroup {
  ID: number;
  GroupName: string;
  Description: string;
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
  data: ApprovalGroup[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchApprovalGroupList = createAsyncThunk<ApprovalGroup[]>(
  "master/fetchApprovalGroupList",
  async () => {
    const res: ApiResponse<ApprovalGroup[]> = await fetchApprovalGroupMaster();
    return res.Data;
  }
);

const approvalGroupListSlice = createSlice({
  name: "approvalGroupList",
  initialState,
  reducers: {
    addApprovalGroup: (state, action) => {
      state.data.push(action.payload);
    },
    updateApprovalGroup: (state, action) => {
      const index = state.data.findIndex(
        (group) => group.ID === action.payload.ID
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteApprovalGroup: (state, action) => {
      state.data = state.data.filter((group) => group.ID !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovalGroupList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApprovalGroupList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchApprovalGroupList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch approval groups";
      });
  },
});
export const { addApprovalGroup, updateApprovalGroup, deleteApprovalGroup } =
  approvalGroupListSlice.actions;
export default approvalGroupListSlice.reducer;
