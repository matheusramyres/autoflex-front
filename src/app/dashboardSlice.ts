import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDashboardSummary } from '../services/dashboardService';
import type { DashboardSummary } from '../types/Dashboard';

interface DashboardState {
  summary: DashboardSummary | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  summary: null,
  loading: false,
  error: null,
};

export const loadDashboard = createAsyncThunk(
  'dashboard/load',
  async () => await fetchDashboardSummary(),
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(loadDashboard.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load dashboard';
      });
  },
});

export default dashboardSlice.reducer;
