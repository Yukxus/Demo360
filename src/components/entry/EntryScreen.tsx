import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Database, Zap } from 'lucide-react';

interface EntryScreenProps {
  onEnter: () => void;
}

export const EntryScreen: React.FC<EntryScreenProps> = ({ onEnter }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0B0507]">
      {/* Warm Ambient Background Orbs */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none opacity-40 bg-gradient-to-br from-[#F97316]/50 via-[#E11D48]/30 to-[#881337]/40" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 -left-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full blur-[100px] pointer-events-none opacity-25 bg-[#881337]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-10 -right-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full blur-[100px] pointer-events-none opacity-20 bg-[#F97316]" 
        aria-hidden="true" 
      />

      {/* Grid Pattern overlay with low opacity */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
        {/* Brand Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#F97316]/30 mb-8 shadow-warm-glow">
          <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
          <span className="text-xs font-semibold tracking-wide uppercase text-[#FDBA74]">
            Enfoque360 · IA Aplicada
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#FFFDF9] mb-4">
          <span className="text-gradient-warm">Probalo vos.</span>
        </h1>

        {/* Subheadline */}
        <h2 className="text-xl sm:text-2xl font-medium text-[#FAF5EF] mb-6 leading-snug">
          Una IA conectada al contexto real de una empresa.
        </h2>

        {/* Supporting description */}
        <p className="text-base sm:text-lg text-[#C9BDB0] max-w-xl mb-10 leading-relaxed">
          Explorá una demostración con datos ficticios y descubrí cómo un agente puede analizar, detectar, proponer y accionar.
        </p>

        {/* Action Button */}
        <button
          onClick={onEnter}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-semibold text-[#0B0507] bg-gradient-to-r from-[#FF8C42] via-[#F97316] to-[#FB7185] rounded-xl hover:shadow-warm-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 focus:ring-offset-[#0B0507]"
        >
          <span>Entrar a la demo</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        {/* Secondary indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#8E8276]">
          <Sparkles className="w-4 h-4 text-[#F97316]" />
          <span>Demo interactiva · Datos ficticios · ~3 min</span>
        </div>

        {/* Trust Badges - Context / Verification / Human in the loop */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-4 w-full max-w-lg text-left">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="p-2 rounded-lg bg-[#1B0C12] border border-[#F43F5E]/20 text-[#FB7185] mb-2">
              <Database className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#FAF5EF]">4 fuentes</span>
            <span className="text-[11px] text-[#8E8276]">CRM, Mail, Cal, Docs</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="p-2 rounded-lg bg-[#1B0C12] border border-[#F97316]/20 text-[#F97316] mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#FAF5EF]">Trazabilidad</span>
            <span className="text-[11px] text-[#8E8276]">Evidencia verificable</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="p-2 rounded-lg bg-[#1B0C12] border border-[#E11D48]/20 text-[#FDA4AF] mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#FAF5EF]">Supervisión</span>
            <span className="text-[11px] text-[#8E8276]">Aprobación humana</span>
          </div>
        </div>
      </div>
    </div>
  );
};
