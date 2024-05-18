import '@rainbow-me/rainbowkit/styles.css';
import '../styles/global.css';

import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, WagmiProvider, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';

import {
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet } from '@rainbow-me/rainbowkit/wallets';

const projectId = 'YOUR_PROJECT_ID';

const appName = 'RainbowKit demo';

const connectors = connectorsForWallets(
  [{ groupName: 'Popular', wallets: [metaMaskWallet, rainbowWallet] }],
  {
    projectId,
    appName,
  },
);

const config = createConfig({
  connectors: [
    ...connectors,
    coinbaseWallet({
      appName,
    }),
    walletConnect({
      projectId,
    }),
  ],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
  ssr: true,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
