'use client';

import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface PortfolioProps {
  isConnected: boolean;
}

const positions = [
  {
    id: 1,
    vault: 'CAKE Auto-Compound',
    deposited: 5000,
    currentValue: 5420,
    apy: 24.5,
    change: 8.4,
  },
  {
    id: 2,
    vault: 'BNB-BUSD LP',
    deposited: 10000,
    currentValue: 10850,
    apy: 18.2,
    change: 8.5,
  },
  {
    id: 3,
    vault: 'BTCB-ETH LP',
    deposited: 3000,
    currentValue: 3280,
    apy: 32.8,
    change: 9.3,
  },
];

export function Portfolio({ isConnected }: PortfolioProps) {
  const { theme } = useTheme();
  const isRetro = theme === 'retro';

  if (!isConnected) {
    return (
      <div className={`glass-effect rounded-lg p-12 text-center ${isRetro ? 'retro-card' : ''}`}>
        <div className={`w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 ${
          isRetro ? 'glow-primary' : ''
        }`}>
          <DollarSign className="w-10 h-10 text-fg/40" />
        </div>
        <h3 className={`text-2xl font-bold mb-3 ${isRetro ? 'retro-gradient-text' : ''}`}>
          Connect Your Wallet
        </h3>
        <p className="text-fg/60 max-w-md mx-auto">
          Connect your wallet to view your portfolio, track your investments, and manage your positions.
        </p>
      </div>
    );
  }

  const totalDeposited = positions.reduce((sum, pos) => sum + pos.deposited, 0);
  const totalValue = positions.reduce((sum, pos) => sum + pos.currentValue, 0);
  const totalGain = totalValue - totalDeposited;
  const totalGainPercent = ((totalGain / totalDeposited) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className={`glass-effect rounded-lg p-6 ${isRetro ? 'retro-card' : ''}`}>
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-accent" />
            <span className="text-sm text-fg/60">Total Deposited</span>
          </div>
          <div className={`text-3xl font-bold ${isRetro ? 'text-glow-accent' : ''}`}>
            ${totalDeposited.toLocaleString()}
          </div>
        </div>
        <div className={`glass-effect rounded-lg p-6 ${isRetro ? 'retro-card' : ''}`}>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-success" />
            <span className="text-sm text-fg/60">Current Value</span>
          </div>
          <div className={`text-3xl font-bold text-success ${isRetro ? 'text-glow-success' : ''}`}>
            ${totalValue.toLocaleString()}
          </div>
        </div>
        <div className={`glass-effect rounded-lg p-6 ${isRetro ? 'retro-card' : ''}`}>
          <div className="flex items-center gap-3 mb-2">
            <Percent className="w-5 h-5 text-success" />
            <span className="text-sm text-fg/60">Total Gain</span>
          </div>
          <div className={`text-3xl font-bold text-success ${isRetro ? 'text-glow-success' : ''}`}>
            +${totalGain.toLocaleString()} ({totalGainPercent}%)
          </div>
        </div>
      </div>

      {/* Positions Table */}
      <div className={`glass-effect rounded-lg overflow-hidden ${isRetro ? 'retro-card' : ''}`}>
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className={`text-xl font-semibold ${isRetro ? 'text-glow-accent' : ''}`}>
            Active Positions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-fg/60">Vault</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-fg/60">Deposited</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-fg/60">Current Value</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-fg/60">APY</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-fg/60">Change</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-fg/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {positions.map((position) => (
                <tr key={position.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium">{position.vault}</div>
                  </td>
                  <td className="px-6 py-4 text-right">${position.deposited.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-semibold">
                    ${position.currentValue.toLocaleString()}
                  </td>
                  <td className={`px-6 py-4 text-right text-success font-medium ${
                    isRetro ? 'text-glow-success' : ''
                  }`}>
                    {position.apy}%
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="flex items-center justify-end gap-1 text-success font-medium">
                      <TrendingUp className="w-4 h-4" />
                      +{position.change}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className={`px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg text-sm font-medium transition-colors ${
                      isRetro ? 'retro-button' : ''
                    }`}>
                      Withdraw
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
