import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductionSuggestions } from '../services/productionService';
import type { ProductionSuggestion } from '../types/production';

interface ProductionState {
  result: ProductionSuggestion[] | null;
  loading: boolean;
}

const initialState: ProductionState = {
  result: null,
  loading: false,
};

export const loadProduction = createAsyncThunk(
  'production/load',
  async () => await fetchProductionSuggestions(),
);

const productionSlice = createSlice({
  name: 'production',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadProduction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProduction.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(loadProduction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productionSlice.reducer;
