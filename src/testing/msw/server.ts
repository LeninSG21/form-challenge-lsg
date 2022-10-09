// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const startDefaultServer = () => {
  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
};
