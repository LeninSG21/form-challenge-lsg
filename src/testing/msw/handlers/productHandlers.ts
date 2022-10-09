// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import products from '../mocks/products.json';

const isTesting = process.env.NODE_ENV === 'test';

export const productHandlers = [
  rest.get('/products', (req, res, ctx) => {
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
