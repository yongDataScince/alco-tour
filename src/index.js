import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './index.scss';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import {  WalletLinkConnector } from "@web3-react/walletlink-connector";
// import { WalletLinkConnector } from "@web3-react/walletlink-connector";
// import { WalletConnectConnector } from "@web3-react/walletlink-connector";

// const Injected = new InjectedConnector({
//   supportedChainIds: [1, 3, 4, 5, 42]
//  });
 
 const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
 });
 
//  const WalletConnect = new WalletConnectConnector({
//   rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//   bridge: "https://bridge.walletconnect.org",
//   qrcode: true,
//  });

function getLibrary(provider) {
  return new Web3Provider(provider);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>
);
