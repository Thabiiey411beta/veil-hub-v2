import { createConfig, http } from "wagmi";
import { getDefaultConfig } from "connectkit";
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
  getDefaultConfig({
    appName: "Veil Hub",
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
    chains: [supraTestnet, supraMainnet],
    ssr: true,
  }) as any
);
