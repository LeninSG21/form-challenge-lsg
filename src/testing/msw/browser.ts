// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from 'msw';

import { handlers } from './handlers';

export const startDefaultWorker = async () => {
  const worker = setupWorker(...handlers);
  await worker.start();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-underscore-dangle
  (window as any).__mswStop = worker.stop;
};
