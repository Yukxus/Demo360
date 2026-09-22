import React from 'react';
import type { ActiveModule } from '../../lib/types';
import { 
  TrendingUp, 
  Stethoscope, 
  Cpu, 
  FileCheck2, 
  ArrowRight, 
  Sparkles, 
  Database, 
} from 'lucide-react';

interface HomeOverviewProps {
  onSelectModule: (module: ActiveModule) => void;
  onStartCommercialMeeting: () => void;
  onOpenSourcesModal: () => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  onSelectModule,
  onStartCommercialMeeting,
  onOpenSourcesModal,
}) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D0B18] via-[#1A0711] to-[#0F0509] border border-[#F43F5E]/30 p-6 sm:p-8 shadow-warm-glow-lg">
        {/* Glow orb */}
        <div 
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#F97316]/40 to-[#881337]/40 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F97316]/20 text-[#FDBA74] border border-[#F97316]/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Workspace Inteligente · Enfoque360</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFDF9] tracking-tight leading-tight">
            Una IA conectada al contexto real de tu empresa.
          </h2>

          <p className="text-xs sm:text-base text-[#C9BDB0] mt-3 leading-relaxed">
            Descubrí cómo un agente autónomo analiza múltiples fuentes (CRM, Correos, Calendario y Documentos), detecta desvíos de negocio y propone acciones bajo tu supervisión directa.
          </p>

          {/* Quick CTA to start the star interaction */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartCommercialMeeting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#FF8C42] via-[#F97316] to-[#FB7185] text-[#0B0507] hover:shadow-warm-glow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Preparar reunión comercial de la semana</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSourcesModal}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs text-[#FAF5EF] bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Ver 4 fuentes conectadas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Principle Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#14080D] border border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#280B17] border border-[#F97316]/30 flex items-center justify-center text-[#F97316] font-bold text-xs shrink-0">
            1
          </div>
          <div>
            <div className="text-xs font-bold text-[#FFFDF9]">Contexto Real</div>
            <div className="text-[11px] text-[#8E8276]">Datos de la empresa</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#14080D] border border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#280B17] border border-[#F97316]/30 flex items-center justify-center text-[#FB7185] font-bold text-xs shrink-0">
            2
          </div>
          <div>
            <div className="text-xs font-bold text-[#FFFDF9]">Multi-fuente</div>
            <div className="text-[11px] text-[#8E8276]">Cruce de 4 sistemas</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#14080D] border border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#280B17] border border-[#F97316]/30 flex items-center justify-center text-[#FDA4AF] font-bold text-xs shrink-0">
            3
          </div>
          <div>
            <div className="text-xs font-bold text-[#FFFDF9]">Trazabilidad</div>
            <div className="text-[11px] text-[#8E8276]">Evidencia verificable</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#14080D] border border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#280B17] border border-[#F97316]/30 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
            4
          </div>
          <div>
            <div className="text-xs font-bold text-[#FFFDF9]">Supervisión</div>
            <div className="text-[11px] text-[#8E8276]">Aprobación humana</div>
          </div>
        </div>
      </div>

      {/* Modules Explorer Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#FFFDF9] flex items-center gap-2">
            <span>Módulos de Demostración</span>
            <span className="text-xs text-[#8E8276] font-normal">· Seleccioná para explorar</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Comercial */}
          <div 
            onClick={() => onSelectModule('comercial')}
            className="group p-5 rounded-2xl bg-[#14080D] border border-[#F97316]/30 hover:border-[#F97316] transition-all cursor-pointer shadow-warm-glow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-[#2D0B18] border border-[#F97316]/40 text-[#F97316]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F97316]/20 text-[#FDBA74] border border-[#F97316]/30">
                  Módulo Estrella
                </span>
              </div>
              <h4 className="text-base font-bold text-[#FFFDF9] group-hover:text-[#FDBA74] transition-colors">
                Agente Comercial & Pipeline
              </h4>
              <p className="text-xs text-[#C9BDB0] mt-1.5 leading-relaxed">
                Preparación de reuniones comerciales, detección de clientes frenados (+10 días), borradores de correo y actualización de CRM supervisada.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#F97316]">
              <span>Probar agente comercial</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Diagnóstico */}
          <div 
            onClick={() => onSelectModule('diagnostico')}
            className="group p-5 rounded-2xl bg-[#14080D] border border-white/[0.08] hover:border-[#FB7185]/50 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-[#280B17] border border-[#FB7185]/40 text-[#FB7185]">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-[#C9BDB0]">
                  4 Pilares PyME
                </span>
              </div>
              <h4 className="text-base font-bold text-[#FFFDF9] group-hover:text-[#FDA4AF] transition-colors">
                Copiloto de Diagnóstico Organizacional
              </h4>
              <p className="text-xs text-[#C9BDB0] mt-1.5 leading-relaxed">
                Evaluación en Personas, Estructura, Procesos y Resultados con evidencias cruzadas de entrevistas y métricas operativas.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#FB7185]">
              <span>Explorar diagnóstico</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Operaciones */}
          <div 
            onClick={() => onSelectModule('operaciones')}
            className="group p-5 rounded-2xl bg-[#14080D] border border-white/[0.08] hover:border-[#FDA4AF]/50 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-[#280B17] border border-[#FDA4AF]/40 text-[#FDA4AF]">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-[#C9BDB0]">
                  Alertas en Planta
                </span>
              </div>
              <h4 className="text-base font-bold text-[#FFFDF9] group-hover:text-[#FDA4AF] transition-colors">
                Operaciones & Despachos
              </h4>
              <p className="text-xs text-[#C9BDB0] mt-1.5 leading-relaxed">
                Seguimiento de demoras de remitos técnicos, abastecimiento crítico de piezas y alertas de mantenimiento preventivo.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#FDA4AF]">
              <span>Revisar operaciones</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Administración */}
          <div 
            onClick={() => onSelectModule('administracion')}
            className="group p-5 rounded-2xl bg-[#14080D] border border-white/[0.08] hover:border-[#FDBA74]/50 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-[#280B17] border border-[#FDBA74]/40 text-[#FDBA74]">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-[#C9BDB0]">
                  Automatizaciones
                </span>
              </div>
              <h4 className="text-base font-bold text-[#FFFDF9] group-hover:text-[#FDBA74] transition-colors">
                Administración & Vencimientos
              </h4>
              <p className="text-xs text-[#C9BDB0] mt-1.5 leading-relaxed">
                Control de vencimientos impositivos, facturación de anticipos en acuerdos comerciales y conciliación de extractos bancarios.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#FDBA74]">
              <span>Ver tareas y finanzas</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
