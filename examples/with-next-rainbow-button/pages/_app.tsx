import '@rainbow-me/rainbow-button/styles.css';
import '../styles/global.css';

import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, WagmiProvider, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import {
  RainbowButtonProvider,
  rainbowConnector,
} from '@rainbow-me/rainbow-button';

const config = createConfig({
  connectors: [
    rainbowConnector({
      appName: 'RainbowKit demo',
      projectId: 'YOUR_PROJECT_ID',
    }),
  ],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowButtonProvider>
          <Component {...pageProps} />
        </RainbowButtonProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
