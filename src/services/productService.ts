import { toast } from 'sonner';
import withMaterials from '../data/with-materials.json';
import { type StatusCode, messages } from '../types/MessageResponses';
import type { Product } from '../types/ProductType';
import { api } from './api';

export const productService = {
  getProductsWithMaterials: async (): Promise<Product[]> => {
    // const res = await api.get<Product[]>('/products/with-materials');
    // return res.data;
    return withMaterials;
  },

  createProduct: async (payload: { name: string; price: number }) => {
    await api.post('/products', payload);
  },

  updateProduct: async (
    id: number,
    payload: { name: string; price: number },
  ) => {
    await api.put(`/products/${id}`, payload);
  },

  deleteProduct: async (id: number) => {
    await api.delete(`/products/${id}`).then((response) => {
      const status = response.status as StatusCode;
      const msg = messages[status];
      toast.success(msg);
    });
  },

  addMaterialToProduct: async (payload: {
    productId: number;
    rawMaterial: number;
    requiredQuantity: number;
  }) => {
    await api.post('/product-raw-material', payload);
  },

  removeMaterialFromProduct: async (productRawMaterialId: number) => {
    await api
      .delete(`/product-raw-material/${productRawMaterialId}`)
      .then((response) => {
        const status = response.status as StatusCode;
        const msg = messages[status];
        toast.success(msg);
      });
  },

  getProductMaterials: async (productId: number) => {
    const res = await api.get(`/product-raw-material/product/${productId}`);
    return res.data;
  },
};
