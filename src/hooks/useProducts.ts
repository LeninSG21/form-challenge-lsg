import { useEffect, useState } from 'react';

import { ProductsApi } from '../api/ProductsApi';
import {
  ProductModel,
  RequestStatusType,
  REQUEST_STATUS,
} from '../data-types/models';

/**
 * Hook to handle the request to the ProductsApi, as well as the errors
 * @param callInInitialRender - If true or undefined, it will fetch the products from the api in the first render. Otherwise, to fetch the products, the method fetchPRoducts should be called manually
 * @returns
 */
export function useProducts(callInInitialRender = true) {
  const [status, setStatus] = useState<RequestStatusType>(REQUEST_STATUS.idle);
  const [products, setProducts] = useState<ProductModel[]>([]);

  const fetchProducts = async () => {
    try {
      setStatus(REQUEST_STATUS.pending);
      const data = await ProductsApi.getProducts();
      setProducts(data);
      setStatus(REQUEST_STATUS.resolved);
    } catch (error) {
      //* In here, the error handling strategy could be applied. Show the message
      //* via a notification component, or feed it to a logging tool, for example
      // eslint-disable-next-line no-console
      console.log(error);
      setStatus(REQUEST_STATUS.rejected);
    }
  };

  useEffect(() => {
    if (callInInitialRender) {
      fetchProducts();
    }
  }, []);

  return { products, fetchProducts, status };
}
