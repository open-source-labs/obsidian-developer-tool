import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './stylesheets/index.css';
import { QueryContextProvider } from './contexts/queryContext';

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryContextProvider>
      <App />
    </QueryContextProvider>
  </React.StrictMode>
)
