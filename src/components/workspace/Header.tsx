import React from 'react';
import type { AppViewMode } from '../../lib/types';
import { Database, Sparkles, Network, Layers, Menu } from 'lucide-react';

interface HeaderProps {
  viewMode: AppViewMode;
  onViewModeChange: (mode: AppViewMode) => void;
  onOpenSourcesModal: () => void;
  onOpenClosureModal: () => void;
  onToggleMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
  onOpenSourcesModal,
  onOpenClosureModal,
  onToggleMobileNav,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0E0508]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Mobile Nav Button + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileNav}
            className="md:hidden p-2 rounded-lg text-[#FAF5EF] hover:bg-white/[0.05] border border-white/[0.08]"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onViewModeChange('experience')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF8C42] to-[#881337] flex items-center justify-center shadow-warm-glow">
              <span className="text-white font-black text-sm tracking-tighter">360</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-[#FFFDF9] tracking-tight flex items-center gap-1.5">
                Enfoque360 <span className="text-gradient-orange font-bold text-xs px-1.5 py-0.5 rounded bg-[#2D0B18] border border-[#F97316]/30">AI</span>
              </span>
              <span className="text-[10px] text-[#8E8276] hidden sm:inline-block">
                Demostración de IA Aplicada
              </span>
            </div>
          </div>
        </div>

        {/* Center: View Switcher (Experiencia | Cómo funciona) */}
        <div className="flex items-center p-1 rounded-xl bg-[#18090F] border border-[#F43F5E]/20 shadow-inner">
          <button
            onClick={() => onViewModeChange('experience')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              viewMode === 'experience'
                ? 'bg-gradient-to-r from-[#FF8C42] to-[#F97316] text-[#0B0507] shadow-sm font-bold'
                : 'text-[#C9BDB0] hover:text-[#FFFDF9] hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Experiencia</span>
          </button>

          <button
            onClick={() => onViewModeChange('how-it-works')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              viewMode === 'how-it-works'
                ? 'bg-gradient-to-r from-[#FF8C42] to-[#F97316] text-[#0B0507] shadow-sm font-bold'
                : 'text-[#C9BDB0] hover:text-[#FFFDF9] hover:bg-white/[0.04]'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Cómo funciona</span>
          </button>
        </div>

        {/* Right: Connected Sources button & Finish CTA */}
        <div className="flex items-center gap-2">
          {/* Connected Sources Button */}
          <button
            onClick={onOpenSourcesModal}
            className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1B0C12] hover:bg-[#280B17] border border-[#F97316]/25 hover:border-[#F97316]/50 transition-all duration-200 text-xs shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Database className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="font-semibold text-[#FAF5EF] hidden sm:inline">4 fuentes conectadas</span>
            <span className="font-semibold text-[#FAF5EF] sm:hidden">4 fuentes</span>
          </button>

          {/* Final Closure CTA */}
          <button
            onClick={onOpenClosureModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2D0B18] hover:bg-[#3D0A24] border border-[#F43F5E]/30 text-xs font-semibold text-[#FDA4AF] transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-[#FB7185]" />
            <span>Conclusión</span>
          </button>
        </div>
      </div>
    </header>
  );
};
