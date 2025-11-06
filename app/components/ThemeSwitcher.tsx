'use client';

import { useTheme } from './ThemeProvider';
import { Palette } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes = [
    { id: 'default', name: 'Default', color: '#0052ff' },
    { id: 'retro', name: 'Retro Futuristic', color: '#ff006e' },
    { id: 'celo', name: 'Celo', color: '#35d07f' },
    { id: 'solana', name: 'Solana', color: '#14f195' },
    { id: 'base', name: 'Base', color: '#0052ff' },
    { id: 'coinbase', name: 'Coinbase', color: '#0052ff' },
  ] as const;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect hover:bg-surface/50 transition-all duration-200"
        aria-label="Switch theme"
      >
        <Palette className="w-5 h-5" />
        <span className="hidden md:inline text-sm">Theme</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 glass-effect rounded-lg shadow-lg border border-[var(--color-border)] overflow-hidden z-50">
          <div className="py-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id as any);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 ${
                  theme === t.id
                    ? 'bg-accent/20 text-accent'
                    : 'hover:bg-surface/50 text-fg'
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 border-current"
                  style={{ backgroundColor: t.color }}
                />
                <span className="text-sm font-medium">{t.name}</span>
                {theme === t.id && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
