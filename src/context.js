import { createContext } from "react";

export const WalletLoginContext = createContext({
  connectedAddress: null,
  ensAddress: null,
  loading: false,
  isLoggedIn: false,
  loggingIn: false,
  ethersActive: false,
  activateProvider: async () => {},
  login: async () => null,
  logout: async () => {},
});

export const WalletConnectContext = createContext({
  loading: false,
  active: false,
  account: null,
  ensAddress: null,
  library: undefined,
  error: null,
  activateProvider: () => {},
  deactivate: () => {},
  activateBrowserWallet: () => {},
})