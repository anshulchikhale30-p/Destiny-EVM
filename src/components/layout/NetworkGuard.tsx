"use client";

import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { FACTORY_ADDRESSES } from "@/lib/contracts/addresses";

const SUPPORTED_CHAINS = [
  { id: 11155111, name: "Sepolia" },
  { id: 80002, name: "Polygon Amoy" },
] as const;

/**
 * Prevents contract hooks from running on networks without a configured
 * factory. The app previously threw during render when a wallet was connected
 * to any other chain.
 */
export function NetworkGuard({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();

  if (!isConnected || FACTORY_ADDRESSES[chainId]) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#FDFCF5] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-7 text-center">
        <h2 className="text-xl font-bold text-black mb-2">
          Unsupported Network
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Prediction pools are only available on Sepolia and Polygon Amoy.
          Switch networks to continue.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {SUPPORTED_CHAINS.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => switchChain({ chainId: id })}
              disabled={isPending}
              className="px-4 py-2.5 bg-[#BAD8B6] hover:bg-[#9CC499] text-black text-sm font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Switch to {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
