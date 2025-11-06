'use client';

import { Wallet } from 'lucide-react';

interface HeaderProps {
  isConnected: boolean;
  onConnect: () => void;
}

export function Header({ isConnected, onConnect }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
              <span className="text-xl font-bold">Y</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">YieldSense</h1>
              <p className="text-xs text-fg/60">BSC DeFi Optimizer</p>
            </div>
          </div>

          <button
            onClick={onConnect}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isConnected
                ? 'bg-success/20 text-success border border-success/30'
                : 'bg-accent hover:bg-accent/90 text-white glow-accent'
            }`}
          >
            <Wallet className="w-5 h-5" />
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </header>
  );
}
