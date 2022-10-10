export interface ProductModel {
  code: string;
  position: number;
  quantity: number;
  image: string;
  price: number;
  description: string;
}

export type ProductsModel = ProductModel[];
