// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { config } from '../../../config';

import products from '../mocks/products.json';

const isTesting = process.env.NODE_ENV === 'test';

const { API } = config();

export const productHandlers = [
  rest.get(`${API.v1}/products`, (req, res, ctx) => {
    if (isTesting) return res(ctx.status(200), ctx.json(products));
    if (Math.ceil(Math.random() * 10) % 4 === 0) {
      return res(
        ctx.status(500, 'Mock internal error with random generation'),
        ctx.delay(1500),
      );
    }
    return res(ctx.status(200), ctx.delay(1500), ctx.json(products));
  }),
];
