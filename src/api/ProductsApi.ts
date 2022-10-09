import { ProductModel } from '../data-types/models';
import products from './products.json';

//* Needless to say, it is an utility to function to mock an error
const generateRandomeError = () => Math.ceil(Math.random() * 10) % 4 === 0;

export const ProductsApi = {
  getProducts() {
    return new Promise<ProductModel[]>((res, rej) => {
      setTimeout(() => {
        if (generateRandomeError()) rej(new Error('Internal Server Error'));
        res(products.products);
      }, 1000);
    });
  },
};
