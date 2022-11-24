import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disconnect, initContracts } from '../../store';
import Button from '../UI/Button';

export const ConnectBtn = ({ res }) => {
  const { connected } = useSelector((state) => state.contracts)
  const [web3Modal, setWeb3Modal] = useState(null)

  const dispatch = useDispatch();

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "ab0cd2ee943b4b6c8c5f3e64e24548ff",
        }
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true,
      network: "mainnet",
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal)
  }, [])

  async function connectWallet() {
    const provider = await web3Modal.connect();
    dispatch(initContracts(provider))
  }

  async function disconnectWallet() {
    await web3Modal.clearCachedProvider();
    dispatch(disconnect())
  }

  return <Button onClick={connected ? disconnectWallet :connectWallet} className={`connect-btn ${res}`} text={connected ? "Disconnect wallet" : "Connect wallet"} width={200} />
}