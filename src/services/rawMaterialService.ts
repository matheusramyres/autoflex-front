import { toast } from 'sonner';
import rawMaterials from '../data/raw-materials.json';
import { messages, type StatusCode } from '../types/MessageResponses';
import type { RawMaterialPayload } from '../types/RawMaterial';
import { api } from './api';

export const rawMaterialService = {
  getAll: async () => {
    // const { data } = await api.get('/raw-materials');
    // return data;
    return rawMaterials;
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/raw-materials/${id}`);
    return data;
  },

  create: async (payload: RawMaterialPayload) => {
    const { data } = await api.post('/raw-materials', payload);
    return data;
  },

  update: async (id: number, payload: RawMaterialPayload) => {
    const { data } = await api.put(`/raw-materials/${id}`, payload);
    return data;
  },

  delete: async (id: number) => {
    api
      .delete(`/raw-materials/${id}`)
      .then((response) => {
        const status = response.status as StatusCode;
        const msg = messages[status];
        toast.success(msg);
      })
      .catch((error) => {
        const status = error.response.status as StatusCode;
        const msg = messages[status];
        toast.error(msg);
      });
  },
};
