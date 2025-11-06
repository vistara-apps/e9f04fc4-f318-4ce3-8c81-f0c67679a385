'use client';

import { Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface StrategyGridProps {
  isConnected: boolean;
}

const strategies = [
  {
    id: 1,
    name: 'Conservative Stablecoin',
    description: 'Low-risk strategy focusing on stablecoin pairs with minimal IL exposure',
    expectedAPY: '12-18%',
    risk: 'low',
    protocols: ['Venus', 'PancakeSwap'],
    autoRebalance: true,
  },
  {
    id: 2,
    name: 'Balanced Growth',
    description: 'Diversified portfolio across major BSC protocols with moderate risk',
    expectedAPY: '20-35%',
    risk: 'medium',
    protocols: ['PancakeSwap', 'Alpaca', 'Venus'],
    autoRebalance: true,
  },
  {
    id: 3,
    name: 'Aggressive Yield',
    description: 'High-yield farming with leveraged positions and volatile pairs',
    expectedAPY: '40-80%',
    risk: 'high',
    protocols: ['Alpaca', 'PancakeSwap', 'Biswap'],
    autoRebalance: true,
  },
  {
    id: 4,
    name: 'Blue Chip Focus',
    description: 'Concentrated positions in BTC, ETH, and BNB pairs',
    expectedAPY: '15-25%',
    risk: 'low',
    protocols: ['PancakeSwap', 'Venus'],
    autoRebalance: true,
  },
];

export function StrategyGrid({ isConnected }: StrategyGridProps) {
  const { theme } = useTheme();
  const isRetro = theme === 'retro';

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low':
        return <Shield className="w-5 h-5 text-success" />;
      case 'medium':
        return <TrendingUp className="w-5 h-5 text-warning" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-danger" />;
      default:
        return null;
    }
  };

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

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {strategies.map((strategy) => (
        <div
          key={strategy.id}
          className={`glass-effect rounded-lg p-6 hover:glow-accent transition-all duration-300 ${
            isRetro ? 'retro-card' : ''
          }`}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 bg-surface rounded-lg ${isRetro ? 'glow-primary' : ''}`}>
              {getRiskIcon(strategy.risk)}
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-semibold mb-2 ${isRetro ? 'text-glow-accent' : ''}`}>
                {strategy.name}
              </h3>
              <p className="text-sm text-fg/60">{strategy.description}</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-[var(--color-border)]">
              <span className="text-sm text-fg/60">Expected APY</span>
              <span className={`text-lg font-bold text-success ${isRetro ? 'text-glow-success' : ''}`}>
                {strategy.expectedAPY}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[var(--color-border)]">
              <span className="text-sm text-fg/60">Risk Level</span>
              <span className={`text-sm font-semibold uppercase ${getRiskColor(strategy.risk)}`}>
                {strategy.risk}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[var(--color-border)]">
              <span className="text-sm text-fg/60">Auto-Rebalance</span>
              <span className="text-sm font-medium text-success">
                {strategy.autoRebalance ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="py-2">
              <span className="text-sm text-fg/60 block mb-2">Protocols</span>
              <div className="flex flex-wrap gap-2">
                {strategy.protocols.map((protocol) => (
                  <span
                    key={protocol}
                    className="px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-xs font-medium text-accent"
                  >
                    {protocol}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            disabled={!isConnected}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              isConnected
                ? `bg-accent hover:bg-accent/90 text-white ${isRetro ? 'retro-button' : ''}`
                : 'bg-surface text-fg/40 cursor-not-allowed'
            }`}
          >
            {isConnected ? 'Invest in Strategy' : 'Connect Wallet to Invest'}
          </button>
        </div>
      ))}
    </div>
  );
}
