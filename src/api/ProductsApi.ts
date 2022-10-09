import { config } from '../config';
import { productsAdapters } from '../data-types/adapters';
import { ProductsResponse } from '../data-types/dtos/ProductsResponse';
import { request } from './request';

const { API } = config();

export const ProductsApi = {
  async getProducts() {
    const { toModel } = productsAdapters();
    const path = '/products'; //* I usually define the paths in a different file with a helper class
    const url = `${API.v1}${path}`;

    const response = await request<ProductsResponse>(url);

    return toModel(response.data);
  },
};
