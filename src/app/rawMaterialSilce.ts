import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { rawMaterialService } from '../services/rawMaterialService';
import type { RawMaterial } from '../types/RawMaterial';

interface ItemsType {
  totalStock: number;
  totalMaterials: number;
  stockLow: number;
  items: RawMaterial[];
}

interface RawMaterialState {
  material: ItemsType;
  loading: boolean;
  error: string | null;
}

const initialState: RawMaterialState = {
  material: {
    totalStock: 0,
    totalMaterials: 0,
    stockLow: 0,
    items: [],
  },
  loading: false,
  error: null,
};

export const fetchRawMaterials = createAsyncThunk(
  'rawMaterials/fetch',
  async () => {
    return await rawMaterialService.getAll();
  },
);

export const createRawMaterial = createAsyncThunk(
  'rawMaterials/create',
  async (payload: { name: string; stockQuantity: number }, { dispatch }) => {
    await rawMaterialService.create(payload);
    dispatch(fetchRawMaterials());
  },
);

export const updateRawMaterial = createAsyncThunk(
  'rawMaterials/update',
  async (
    args: { id: number; payload: { name: string; stockQuantity: number } },
    { dispatch },
  ) => {
    await rawMaterialService.update(args.id, args.payload);
    dispatch(fetchRawMaterials());
  },
);

export const deleteRawMaterial = createAsyncThunk(
  'rawMaterials/delete',
  async (id: number, { dispatch }) => {
    await rawMaterialService.delete(id);
    dispatch(fetchRawMaterials());
  },
);

const rawMaterialSlice = createSlice({
  name: 'rawMaterials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.material = action.payload;
        state.loading = false;
      })
      .addCase(fetchRawMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default rawMaterialSlice.reducer;
