import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import productionReducer from './productionSlice';
import productsReducer from './productsSlice';
import rawMaterialReducer from './rawMaterialSilce';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    production: productionReducer,
    products: productsReducer,
    rawMaterials: rawMaterialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
