import '@rainbow-me/rainbowkit/styles.css';
import '../styles/global.css';

import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';

import {
  RainbowKitProvider,
  getDefaultConfig,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet],
    },
  ],
  chains: [sepolia],
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
