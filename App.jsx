import "@walletconnect/react-native-compat"
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from '@/navigation/AppNavigator';
import * as Clipboard from "expo-clipboard";
import { AuthProvider as AppKitAuthProvider } from "@reown/appkit-auth-ethers-react-native";
import { AuthProvider } from "./context/AuthContext";

global.Clipboard = Clipboard;

import {
  createAppKit,
  defaultConfig,
  AppKit,
} from "@reown/appkit-ethers-react-native";
import { mainnet } from "@reown/appkit/networks";

const projectId = "aa0093c4b8dbadeb1040957141a12f72";

const metadata = {
  name: "OneBasket",
  description: "OneBasket app for Basket Token investing.",
  url: "https://onebasket.app",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "onebasket://",
  },
  email: true,
  socials: true
};

const authProvider = new AppKitAuthProvider({ projectId, metadata });

const monadTestnet = {
  chainId: 10143,
  name: "Monad Testnet",
  currency: "MON",
  rpcUrl: "https://testnet-rpc.monad.xyz",
  explorerUrl: "https://testnet.monadexplorer.com",
};

const chains = [monadTestnet];
const config = defaultConfig({ metadata, extraConnectors: [authProvider] });

createAppKit({
  projectId,
  metadata,
  chains,
  config,
  enableAnalytics: true,
  features: {
    email: true,
    socials: ['google', 'apple'],
    emailShowWallets: false
  },
  debug: true,
});

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <AppKit />
    </AuthProvider>
  );
}
