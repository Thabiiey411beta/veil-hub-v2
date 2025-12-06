import { createConfig, http } from "wagmi";
import { connectkit } from "connectkit";
import { defineChain } from "viem";

export const supraMainnet = defineChain({
  id: 999,
  name: "Supra L1",
  nativeCurrency: { name: "SUPRA", symbol: "SUPRA", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.supra.com"] } },
  blockExplorers: { default: { name: "SupraScan", url: "https://suprascan.io" } },
});

export const supraTestnet = defineChain({
  id: 6,
  name: "Supra L1 Testnet",
  nativeCurrency: { name: "SUPRA", symbol: "SUPRA", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc-testnet.supra.com"] } },
  blockExplorers: { default: { name: "SupraScan", url: "https://testnet.suprascan.io" } },
  testnet: true,
});

export const config = createConfig(
  connectkit({
    chains: [supraTestnet, supraMainnet],
    transports: {
      [supraMainnet.id]: http("https://rpc.supra.com", { timeout: 30000 }),
      [supraTestnet.id]: http("https://rpc-testnet.supra.com", { timeout: 30000 }),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
    appName: "Veil Hub",
    ssr: true,
    pollingInterval: 12000,
  })
);