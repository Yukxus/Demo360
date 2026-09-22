import React from 'react';
import type { ConnectedSource } from '../../data/sources';
import { CONNECTED_SOURCES } from '../../data/sources';
import { X, Database, Mail, Calendar, FileText, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';

interface ConnectedSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectedSourcesModal: React.FC<ConnectedSourcesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const getSourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-5 h-5 text-[#F97316]" />;
      case 'Mail':
        return <Mail className="w-5 h-5 text-[#FB7185]" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-[#FDA4AF]" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-[#FDBA74]" />;
      default:
        return <Database className="w-5 h-5 text-[#F97316]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#14080D] border border-[#F43F5E]/20 shadow-warm-glow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/[0.08] bg-[#1B0C12]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D0B18] border border-[#F97316]/30 flex items-center justify-center text-[#F97316]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#FFFDF9]">Fuentes de Contexto Conectadas</h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  4 Activas
                </span>
              </div>
              <p className="text-xs text-[#C9BDB0] mt-0.5">
                Integración simulada de datos comerciales y operativos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#8E8276] hover:text-[#FFFDF9] p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Banner */}
        <div className="px-5 py-3 bg-[#2D0B18]/70 border-b border-[#F43F5E]/15 flex items-center gap-2.5 text-xs text-[#FDA4AF]">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#FB7185]" />
          <span>
            <strong>Simulación segura:</strong> Todos los registros, correos y acuerdos mostrados son ficticios con fines demostrativos.
          </span>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {CONNECTED_SOURCES.map((source: ConnectedSource) => (
            <div
              key={source.id}
              className="p-4 rounded-xl bg-[#1B0C12] border border-white/[0.06] hover:border-[#F97316]/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#280B17] border border-white/[0.08]">
                    {getSourceIcon(source.iconName)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FAF5EF] flex items-center gap-2">
                      {source.name}
                      <span className="text-[11px] font-normal text-[#8E8276]">({source.type})</span>
                    </h4>
                    <span className="text-xs text-[#C9BDB0]">{source.description}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 shrink-0 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Sincronizado</span>
                </div>
              </div>

              {/* Sample records inside this source */}
              <div className="mt-3 pt-3 border-t border-white/[0.04] space-y-2">
                <div className="text-[11px] font-semibold text-[#8E8276] uppercase tracking-wider">
                  Muestra de registros indexados ({source.itemCount} totales):
                </div>
                {source.simulatedRecords.map((rec, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-[#0F0509] border border-white/[0.03] text-xs">
                    <div className="flex items-center justify-between text-[#FAF5EF] font-medium">
                      <span className="truncate">{rec.title}</span>
                      <span className="text-[10px] text-[#8E8276] ml-2 shrink-0">{rec.timestamp}</span>
                    </div>
                    <div className="text-[#A89F91] text-[11px] mt-0.5 line-clamp-1">{rec.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#18090F] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#8E8276]">
            <RefreshCw className="w-3.5 h-3.5 text-[#F97316] animate-spin" />
            <span>Índice contextual actualizado en tiempo real</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#FAF5EF] bg-white/[0.08] hover:bg-white/[0.12] rounded-lg border border-white/[0.1] transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
