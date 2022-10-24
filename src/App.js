import './App.css';
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Main } from './routes/Main';


const injected = injectedModule()

init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum',
      rpcUrl: 'https://mainnet.infura.io/v3/ab0cd2ee943b4b6c8c5f3e64e24548ff'
    },
    {
      id: '0x4',
      token: 'rETH',
      label: 'Rinkeby',
      rpcUrl: 'https://rinkeby.infura.io/v3/ab0cd2ee943b4b6c8c5f3e64e24548ff'
    }
  ]
 })

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

export const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/ab0cd2ee943b4b6c8c5f3e64e24548ff`,
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
});

function App() {
  const { active, activate, deactivate, library, chainId, account } = useWeb3React();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
