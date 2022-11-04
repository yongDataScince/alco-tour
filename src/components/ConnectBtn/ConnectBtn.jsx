import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initContracts } from '../../store';
import Button from '../UI/Button';

export const ConnectBtn = () => {
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

  return <Button onClick={connectWallet} text="Connect wallet" width={200} />
}