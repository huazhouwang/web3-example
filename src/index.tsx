import React from 'react';
import ReactDOM from 'react-dom';
import Web3Root from './web3/Web3Root';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Web3Root>
      <App />
    </Web3Root>
  </React.StrictMode>,
  document.getElementById('root'),
);
