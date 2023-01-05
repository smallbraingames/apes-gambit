import "../styles/globals.css";

import type { AppProps } from "next/app";
import NetworkProvider from "../context/NetworkContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NetworkProvider>
        <Component {...pageProps} />
      </NetworkProvider>
    </div>
  );
}
