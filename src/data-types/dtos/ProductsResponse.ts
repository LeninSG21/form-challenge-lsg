interface ProductResponse {
  code: string;
  position: number;
  quantity: number;
  image: string;
  price: number;
  description: string;
}

export interface ProductsResponse {
  products: ProductResponse[];
}
