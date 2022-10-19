import Button from './components/UI/Button';
import './App.css';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector, WalletConnectConnector } from "@web3-react/walletlink-connector";

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

export const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/$ab0cd2ee943b4b6c8c5f3e64e24548ff`,
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
});

function App({ context }) {
  const { active, activate, deactivate, library, chainId, account } = useWeb3React();
  useEffect(() => {
    console.log(account);
  }, [account])
  return (
    <div className="App">
      <Button text="btn" width={100} height={50} onClick={() => activate(CoinbaseWallet, console.log)} />
      <Button text="btn" width={100} height={50} onClick={() => activate(Injected, console.log)} />
    </div>
  );
}

export default App;
