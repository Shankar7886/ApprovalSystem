import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: string;
}

const initialState: CounterState = {
  value: '',
};

const currentPageSlicer = createSlice({
  name: 'currentPageSlicer',
  initialState,
  reducers: {
    updatePageTitle: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updatePageTitle } = currentPageSlicer.actions;
export default currentPageSlicer.reducer;
