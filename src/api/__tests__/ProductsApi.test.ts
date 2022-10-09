// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProductsApi } from '../ProductsApi';
import products from '../../testing/msw/mocks/products.json';

describe('ProductsApi', () => {
  it('Returns expected model', () => {
    // arrange
    //* this mock should come from a defined object in a mock folder as a model. For simplicity in this example, it was taken
    //* directly from the json object
    const expected = products.products;

    // act
    const response = ProductsApi.getProducts();

    // assert
    expect(response).resolves.toEqual(expected);
  });
});
