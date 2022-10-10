/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom/extend-expect';

import { startDefaultServer } from './src/testing/msw/server';

startDefaultServer();
