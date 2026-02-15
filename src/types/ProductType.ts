export interface Materials {
  productRawMaterialId: number;
  rawMaterialId: number;
  name?: string;
  requiredQty: number;
}

export type Product = {
  id: number;
  name: string;
  price: number;
  rawMaterialQuantity: number;
  materials: Materials[];
};

export interface ProductPayload {
  name: string;
  price: number;
}
