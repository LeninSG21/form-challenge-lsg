import { ProductModel } from '../data-types/models';
import products from './products.json';

export const ProductsApi = {
  getProducts() {
    return new Promise<ProductModel[]>((res) => {
      setTimeout(() => {
        res(products.products);
      }, 1000);
    });
  },
};
