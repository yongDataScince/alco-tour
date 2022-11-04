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
import logo from "./assets/logo.svg";
import { Footer } from './components/Footer/Footer';
import { Main } from './routes/Main';
import { Staking } from './routes/Staking';
import { Link } from "react-router-dom";
import { Admin } from './routes/Admin/Admin';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initContracts } from './store';

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
  const dispatch = useDispatch();

  const { active, activate, deactivate, library, chainId, account } = useWeb3React();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  useEffect(() => {
    if (!active) {
      dispatch(initContracts())
    }
  }, [active, activate, dispatch])

  return (
    <div className="App">
      <Router>
        <header className="header__main-nav">
          <img src={logo} className="header__main-logo" alt="" />
          <p className="header__main-text font-16-p">
            <Link to="/staking">Staking</Link>
          </p>
        </header>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/staking' element={<Staking />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
