import { productsAdapters } from '../data-types/adapters';
import { ProductsResponse } from '../data-types/dtos/ProductsResponse';
import { request } from './request';

export const ProductsApi = {
  async getProducts() {
    const { toModel } = productsAdapters();
    const url = '/products'; //* I usually define the paths in a different file with a helper class

    const response = await request<ProductsResponse>(url);

    return toModel(response);
  },
};
