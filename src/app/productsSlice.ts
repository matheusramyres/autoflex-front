import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../types/ProductType';
import { productService } from '../services/productService';

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  return await productService.getProductsWithMaterials();
});

export const createProduct = createAsyncThunk(
  'products/create',
  async (payload: { name: string; price: number }, { dispatch }) => {
    await productService.createProduct(payload);
    dispatch(fetchProducts());
  },
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (
    args: { id: number; payload: { name: string; price: number } },
    { dispatch },
  ) => {
    await productService.updateProduct(args.id, args.payload);
    dispatch(fetchProducts());
  },
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: number, { dispatch }) => {
    await productService.deleteProduct(id);
    dispatch(fetchProducts());
  },
);

export const addMaterialToProduct = createAsyncThunk(
  'products/addMaterial',
  async (
    payload: {
      productId: number;
      rawMaterial: number;
      requiredQuantity: number;
    },
    { dispatch },
  ) => {
    await productService.addMaterialToProduct(payload);
    dispatch(fetchProducts());
  },
);

export const removeMaterialFromProduct = createAsyncThunk(
  'products/removeMaterial',
  async (productRawMaterialId: number, { dispatch }) => {
    await productService.removeMaterialFromProduct(productRawMaterialId);
    setTimeout(() => {
      dispatch(fetchProducts());
    }, 3000);
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default productSlice.reducer;
