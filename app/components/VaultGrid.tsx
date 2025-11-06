'use client';

import { TrendingUp, Shield, Lock } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface VaultGridProps {
  isConnected: boolean;
}

const vaults = [
  {
    id: 1,
    name: 'CAKE Auto-Compound',
    apy: 24.5,
    tvl: 8500000,
    risk: 'low',
    tokens: ['CAKE'],
    protocol: 'PancakeSwap',
  },
  {
    id: 2,
    name: 'BNB-BUSD LP',
    apy: 18.2,
    tvl: 12300000,
    risk: 'low',
    tokens: ['BNB', 'BUSD'],
    protocol: 'PancakeSwap',
  },
  {
    id: 3,
    name: 'BTCB-ETH LP',
    apy: 32.8,
    tvl: 3200000,
    risk: 'medium',
    tokens: ['BTCB', 'ETH'],
    protocol: 'PancakeSwap',
  },
  {
    id: 4,
    name: 'Venus Lending',
    apy: 15.4,
    tvl: 5600000,
    risk: 'low',
    tokens: ['USDT'],
    protocol: 'Venus',
  },
  {
    id: 5,
    name: 'Alpaca Leveraged',
    apy: 45.6,
    tvl: 2100000,
    risk: 'high',
    tokens: ['ALPACA'],
    protocol: 'Alpaca Finance',
  },
  {
    id: 6,
    name: 'CAKE-BNB LP',
    apy: 28.9,
    tvl: 4800000,
    risk: 'medium',
    tokens: ['CAKE', 'BNB'],
    protocol: 'PancakeSwap',
  },
];

export function VaultGrid({ isConnected }: VaultGridProps) {
  const { theme } = useTheme();
  const isRetro = theme === 'retro';

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'high':
        return 'text-danger';
      default:
        return 'text-fg';
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-success/10 border-success/30';
      case 'medium':
        return 'bg-warning/10 border-warning/30';
      case 'high':
        return 'bg-danger/10 border-danger/30';
      default:
        return 'bg-fg/10 border-fg/30';
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vaults.map((vault) => (
        <div
          key={vault.id}
          className={`glass-effect rounded-lg p-6 hover:glow-accent transition-all duration-300 cursor-pointer ${
            isRetro ? 'retro-card' : ''
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={`text-lg font-semibold mb-1 ${isRetro ? 'text-glow-accent' : ''}`}>
                {vault.name}
              </h3>
              <p className="text-sm text-fg/60">{vault.protocol}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskBg(vault.risk)}`}>
              <span className={getRiskColor(vault.risk)}>{vault.risk.toUpperCase()}</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-fg/60">APY</span>
              <span className={`text-xl font-bold text-success flex items-center gap-1 ${
                isRetro ? 'text-glow-success' : ''
              }`}>
                <TrendingUp className="w-4 h-4" />
                {vault.apy}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-fg/60">TVL</span>
              <span className="text-lg font-semibold">
                ${(vault.tvl / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-fg/60">Assets</span>
              <div className="flex gap-1">
                {vault.tokens.map((token) => (
                  <span
                    key={token}
                    className="px-2 py-1 bg-surface rounded text-xs font-medium"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            disabled={!isConnected}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              isConnected
                ? `bg-accent hover:bg-accent/90 text-white ${isRetro ? 'retro-button' : ''}`
                : 'bg-surface text-fg/40 cursor-not-allowed'
            }`}
          >
            {isConnected ? (
              <>
                <Lock className="w-4 h-4" />
                Deposit
              </>
            ) : (
              'Connect Wallet to Deposit'
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
