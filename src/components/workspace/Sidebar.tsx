import React from 'react';
import type { ActiveModule } from '../../lib/types';
import { 
  Home, 
  TrendingUp, 
  Stethoscope, 
  Cpu, 
  FileCheck2, 
  Database, 
  Check, 
  ShieldCheck, 
  RotateCcw
} from 'lucide-react';

interface SidebarProps {
  activeModule: ActiveModule;
  onSelectModule: (module: ActiveModule) => void;
  onOpenSourcesModal: () => void;
  onResetDemo: () => void;
  approvedActionsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  onOpenSourcesModal,
  onResetDemo,
  approvedActionsCount,
}) => {
  const navItems: { id: ActiveModule; label: string; icon: any; badge?: string; desc: string }[] = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: Home,
      desc: 'Visión general',
    },
    {
      id: 'comercial',
      label: 'Comercial',
      icon: TrendingUp,
      badge: 'Principal',
      desc: 'Pipeline & Oportunidades',
    },
    {
      id: 'diagnostico',
      label: 'Diagnóstico',
      icon: Stethoscope,
      desc: '4 Pilares de la PyME',
    },
    {
      id: 'operaciones',
      label: 'Operaciones',
      icon: Cpu,
      desc: 'Alertas & Despachos',
    },
    {
      id: 'administracion',
      label: 'Administración',
      icon: FileCheck2,
      desc: 'Impuestos & Finanzas',
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-white/[0.08] bg-[#0E0508]/60 backdrop-blur-md min-h-[calc(100vh-4rem)] p-4 justify-between">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div>
          <div className="text-[11px] font-bold text-[#8E8276] uppercase tracking-wider px-3 mb-2">
            Módulos del Sistema
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#2D0B18] to-[#1F0711] text-[#FFFDF9] border border-[#F97316]/40 shadow-warm-glow'
                      : 'text-[#C9BDB0] hover:text-[#FAF5EF] hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#F97316] text-[#0B0507]'
                          : 'bg-[#18090F] text-[#8E8276] group-hover:text-[#F97316]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="leading-none">{item.label}</div>
                      <div className="text-[10px] text-[#8E8276] font-normal mt-0.5">{item.desc}</div>
                    </div>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#F97316]/20 text-[#FDBA74] border border-[#F97316]/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Connected Sources Widget */}
        <div className="p-3.5 rounded-xl bg-[#14080D] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FAF5EF]">
              <Database className="w-3.5 h-3.5 text-[#F97316]" />
              <span>4 fuentes activas</span>
            </div>
            <button
              onClick={onOpenSourcesModal}
              className="text-[10px] text-[#F97316] hover:underline font-semibold"
            >
              Ver
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <div className="flex items-center gap-1 text-[#C9BDB0] bg-[#0F0509] px-2 py-1 rounded-md border border-white/[0.03]">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>CRM</span>
            </div>
            <div className="flex items-center gap-1 text-[#C9BDB0] bg-[#0F0509] px-2 py-1 rounded-md border border-white/[0.03]">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Gmail</span>
            </div>
            <div className="flex items-center gap-1 text-[#C9BDB0] bg-[#0F0509] px-2 py-1 rounded-md border border-white/[0.03]">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Calendar</span>
            </div>
            <div className="flex items-center gap-1 text-[#C9BDB0] bg-[#0F0509] px-2 py-1 rounded-md border border-white/[0.03]">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Drive</span>
            </div>
          </div>

          <div className="text-[10px] text-[#8E8276] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Contexto corporativo mock</span>
          </div>
        </div>
      </div>

      {/* Bottom Status & Reset */}
      <div className="pt-4 border-t border-white/[0.06] space-y-3">
        {approvedActionsCount > 0 && (
          <div className="p-2.5 rounded-lg bg-[#2D0B18]/60 border border-[#F97316]/20 text-xs text-[#FDBA74] flex items-center justify-between">
            <span className="text-[11px]">Acciones supervisadas:</span>
            <span className="font-bold text-white bg-[#F97316] px-2 py-0.5 rounded-full text-[10px]">
              {approvedActionsCount}
            </span>
          </div>
        )}

        <button
          onClick={onResetDemo}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[11px] font-semibold text-[#8E8276] hover:text-[#FAF5EF] bg-white/[0.02] hover:bg-white/[0.06] rounded-lg border border-white/[0.06] transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reiniciar simulación</span>
        </button>
      </div>
    </aside>
  );
};
