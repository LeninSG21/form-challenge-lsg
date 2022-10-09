import React from 'react';
import ReactDOM from 'react-dom/client';
import 'regenerator-runtime/runtime';

import App from './App';
import './index.css';

async function main() {
  if (process.env.NODE_ENV === 'development') {
    const { startDefaultWorker } = await import('./testing/msw/browser');
    await startDefaultWorker();
  }

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />,
    </React.StrictMode>,
  );
}

main();
