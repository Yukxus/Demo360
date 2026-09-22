import React from 'react';
import type { ActiveModule } from '../../lib/types';
import { 
  Home, 
  TrendingUp, 
  Stethoscope, 
  Cpu, 
  FileCheck2, 
  X, 
  Database, 
  RotateCcw,
  Layers
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeModule: ActiveModule;
  onSelectModule: (module: ActiveModule) => void;
  onOpenSourcesModal: () => void;
  onOpenClosureModal: () => void;
  onResetDemo: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  activeModule,
  onSelectModule,
  onOpenSourcesModal,
  onOpenClosureModal,
  onResetDemo,
}) => {
  const navItems: { id: ActiveModule; label: string; icon: any; desc: string; badge?: string }[] = [
    { id: 'inicio', label: 'Inicio', icon: Home, desc: 'Visión general' },
    { id: 'comercial', label: 'Comercial', icon: TrendingUp, desc: 'Pipeline y Agente', badge: 'Estrella' },
    { id: 'diagnostico', label: 'Diagnóstico', icon: Stethoscope, desc: '4 Pilares PyME' },
    { id: 'operaciones', label: 'Operaciones', icon: Cpu, desc: 'Alertas y Despachos' },
    { id: 'administracion', label: 'Administración', icon: FileCheck2, desc: 'Impuestos y Finanzas' },
  ];

  return (
    <>
      {/* Slide-out Mobile Menu Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-4/5 max-w-xs h-full bg-[#14080D] border-r border-[#F43F5E]/20 p-5 flex flex-col justify-between animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF8C42] to-[#881337] flex items-center justify-center">
                    <span className="text-white font-black text-xs">360</span>
                  </div>
                  <span className="text-sm font-extrabold text-[#FFFDF9]">Enfoque360 AI</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-[#8E8276] hover:text-white hover:bg-white/[0.05]"
                  aria-label="Cerrar navegación móvil"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-[11px] font-bold text-[#8E8276] uppercase tracking-wider mb-2">
                Navegación
              </div>

              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeModule === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectModule(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#2D0B18] text-[#FFFDF9] border border-[#F97316]/40'
                          : 'text-[#C9BDB0] hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#F97316]' : 'text-[#8E8276]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F97316]/20 text-[#FDBA74]">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Connected Sources Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenSourcesModal();
                }}
                className="w-full mt-4 flex items-center justify-between p-3 rounded-xl bg-[#1B0C12] border border-[#F97316]/20 text-xs font-semibold text-[#FAF5EF]"
              >
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#F97316]" />
                  <span>4 fuentes conectadas</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </button>

              {/* Conclusion Screen trigger */}
              <button
                onClick={() => {
                  onClose();
                  onOpenClosureModal();
                }}
                className="w-full mt-2 flex items-center gap-2 p-3 rounded-xl bg-[#280B17] border border-[#F43F5E]/30 text-xs font-semibold text-[#FDA4AF]"
              >
                <Layers className="w-4 h-4 text-[#FB7185]" />
                <span>Ver conclusión de la demo</span>
              </button>
            </div>

            <button
              onClick={() => {
                onResetDemo();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-[#8E8276] bg-white/[0.03] border border-white/[0.06] rounded-xl"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar simulación</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar for Instant QR Access */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0508]/95 backdrop-blur-md border-t border-white/[0.08] px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors relative ${
                isActive ? 'text-[#F97316]' : 'text-[#8E8276] hover:text-[#C9BDB0]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
              {isActive && (
                <span className="absolute -top-1 w-1 h-1 rounded-full bg-[#F97316]" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};
