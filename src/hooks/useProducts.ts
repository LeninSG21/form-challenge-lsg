import { useEffect, useMemo, useState } from 'react';

import { ProductsApi } from '../api/ProductsApi';
import {
  ProductsModel,
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
  const [products, setProducts] = useState<ProductsModel>([]);

  const fetchProducts = async () => {
    try {
      setStatus(REQUEST_STATUS.pending);
      const data = await ProductsApi.getProducts();
      setProducts(data);
      setStatus(REQUEST_STATUS.resolved);
    } catch (error) {
      //* In here, the error handling strategy could be applied. Show the message
      //* via a notification component, or feed it to a logging tool, for example
      console.info(error);
      setStatus(REQUEST_STATUS.rejected);
    }
  };

  useEffect(() => {
    if (callInInitialRender) {
      fetchProducts();
    }
  }, []);

  const parsdStatus = useMemo(() => {
    const isLoading =
      status === REQUEST_STATUS.idle || status === REQUEST_STATUS.pending;
    const isPending = status === REQUEST_STATUS.pending;
    const isRejected = status === REQUEST_STATUS.rejected;
    return { isLoading, isPending, isRejected };
  }, [status]);

  return { products, fetchProducts, ...parsdStatus };
}
