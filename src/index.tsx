import React from 'react';
import ReactDOM from 'react-dom';
import Web3Root from './web3/Web3Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Message from './pages/Message';
import Transaction from './pages/Transaction';
import Discussion from './pages/Discussion';
import { CssBaseline } from '@material-ui/core';
import PageWrapper from './components/PageWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PageWrapper>
        <Message />
      </PageWrapper>
    ),
  },
  {
    path: '/message',
    element: (
      <PageWrapper>
        <Message />
      </PageWrapper>
    ),
  },
  {
    path: '/transaction',
    element: (
      <PageWrapper>
        <Transaction />
      </PageWrapper>
    ),
  },
  {
    path: '/discussion',
    element: (
      <PageWrapper>
        <Discussion />
      </PageWrapper>
    ),
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <>
      <CssBaseline />
      <Web3Root>
        <RouterProvider router={router} />
      </Web3Root>
    </>
  </React.StrictMode>,
  document.getElementById('root'),
);
