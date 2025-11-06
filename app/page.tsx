'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { Header } from './components/Header';
import { VaultGrid } from './components/VaultGrid';
import { StrategyGrid } from './components/StrategyGrid';
import { Portfolio } from './components/Portfolio';
import { TrendingUp, Shield, Zap, Coins } from 'lucide-react';

type Tab = 'vaults' | 'strategies' | 'portfolio';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('vaults');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <Header isConnected={isConnected} onConnect={() => setIsConnected(true)} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] scanlines">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fg via-accent to-fg bg-clip-text text-transparent retro-gradient-text">
              Intelligent Yield Optimization
            </h1>
            <p className="text-xl text-fg/70 max-w-2xl mx-auto">
              Maximize returns on BSC with automated vaults, risk-adjusted strategies, and advanced liquidity management
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              <div className="glass-effect rounded-lg p-6 retro-card">
                <div className="text-3xl font-bold text-accent neon-text">$24.5M</div>
                <div className="text-sm text-fg/60 mt-1">Total Value Locked</div>
              </div>
              <div className="glass-effect rounded-lg p-6 retro-card">
                <div className="text-3xl font-bold text-success neon-text">18.4%</div>
                <div className="text-sm text-fg/60 mt-1">Avg APY</div>
              </div>
              <div className="glass-effect rounded-lg p-6 retro-card">
                <div className="text-3xl font-bold text-fg">12</div>
                <div className="text-sm text-fg/60 mt-1">Active Vaults</div>
              </div>
              <div className="glass-effect rounded-lg p-6 retro-card">
                <div className="text-3xl font-bold text-fg">8,432</div>
                <div className="text-sm text-fg/60 mt-1">Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="glass-effect rounded-lg p-6 hover:glow-accent transition-all duration-300 retro-card">
            <Zap className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-semibold mb-2">Auto-Compound</h3>
            <p className="text-sm text-fg/60">Automated reward harvesting and compounding for maximum efficiency</p>
          </div>
          <div className="glass-effect rounded-lg p-6 hover:glow-accent transition-all duration-300 retro-card">
            <Shield className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-semibold mb-2">Risk Management</h3>
            <p className="text-sm text-fg/60">Transparent risk scores and IL mitigation strategies</p>
          </div>
          <div className="glass-effect rounded-lg p-6 hover:glow-accent transition-all duration-300 retro-card">
            <TrendingUp className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-semibold mb-2">Optimized Yields</h3>
            <p className="text-sm text-fg/60">Smart rebalancing across top BSC protocols</p>
          </div>
          <div className="glass-effect rounded-lg p-6 hover:glow-accent transition-all duration-300 retro-card">
            <Coins className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tokenized LPs</h3>
            <p className="text-sm text-fg/60">Convert LP positions into tradable, collateralizable tokens</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-2 border-b border-[var(--color-border)] mb-8">
          <button
            onClick={() => setActiveTab('vaults')}
            className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'vaults'
                ? 'border-accent text-accent neon-text'
                : 'border-transparent text-fg/60 hover:text-fg'
            }`}
          >
            Automated Vaults
          </button>
          <button
            onClick={() => setActiveTab('strategies')}
            className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'strategies'
                ? 'border-accent text-accent neon-text'
                : 'border-transparent text-fg/60 hover:text-fg'
            }`}
          >
            Strategies
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'portfolio'
                ? 'border-accent text-accent neon-text'
                : 'border-transparent text-fg/60 hover:text-fg'
            }`}
          >
            My Portfolio
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'vaults' && <VaultGrid isConnected={isConnected} />}
          {activeTab === 'strategies' && <StrategyGrid isConnected={isConnected} />}
          {activeTab === 'portfolio' && <Portfolio isConnected={isConnected} />}
        </div>
      </section>
    </div>
  );
}
