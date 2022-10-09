import { AdapterModuleBase } from '../../utils/types';
import { ProductsResponse } from '../dtos/ProductsResponse';
import { ProductModel, ProductsModel } from '../models';

export const productsAdapters: AdapterModuleBase<
  void,
  void,
  ProductsResponse,
  ProductsModel
> = () => ({
  toModel: (response) =>
    response?.products?.map<ProductModel>((item) => ({
      code: item.code,
      description: item.description,
      image: item.image,
      position: item.position,
      price: item.price,
      quantity: item.quantity,
    })) ?? [],
});
