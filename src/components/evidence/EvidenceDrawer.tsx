import React from 'react';
import type { EvidenceItem } from '../../data/commercial';
import { X, Database, Mail, Calendar, FileText, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  keyInsight?: string;
  summary?: string;
  evidences: EvidenceItem[];
  onTakeAction?: () => void;
  actionButtonText?: string;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  isOpen,
  onClose,
  entityName,
  keyInsight,
  summary,
  evidences,
  onTakeAction,
  actionButtonText,
}) => {
  if (!isOpen) return null;

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'crm':
        return <Database className="w-4 h-4 text-[#F97316]" />;
      case 'gmail':
        return <Mail className="w-4 h-4 text-[#FB7185]" />;
      case 'calendar':
        return <Calendar className="w-4 h-4 text-[#FDA4AF]" />;
      case 'drive':
        return <FileText className="w-4 h-4 text-[#FDBA74]" />;
      default:
        return <Database className="w-4 h-4 text-[#F97316]" />;
    }
  };

  const getSourceBadgeBg = (source: string) => {
    switch (source) {
      case 'crm':
        return 'bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20';
      case 'gmail':
        return 'bg-[#FB7185]/10 text-[#FB7185] border-[#FB7185]/20';
      case 'calendar':
        return 'bg-[#FDA4AF]/10 text-[#FDA4AF] border-[#FDA4AF]/20';
      case 'drive':
        return 'bg-[#FDBA74]/10 text-[#FDBA74] border-[#FDBA74]/20';
      default:
        return 'bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#14080D] border-l border-[#F43F5E]/20 h-full flex flex-col shadow-warm-glow-lg animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-white/[0.08] bg-[#1B0C12] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#881337]/40 text-[#FDA4AF] border border-[#F43F5E]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FB7185]" />
                Trazabilidad & Evidencia
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#FFFDF9]">{entityName}</h3>
            {summary && <p className="text-xs text-[#C9BDB0] mt-1 leading-relaxed">{summary}</p>}
          </div>

          <button
            onClick={onClose}
            className="text-[#8E8276] hover:text-[#FFFDF9] p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            aria-label="Cerrar panel de evidencia"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Insight Box */}
        {keyInsight && (
          <div className="m-5 p-4 rounded-xl bg-gradient-to-r from-[#280B17] to-[#1E0913] border border-[#F97316]/25">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FDBA74]">
                  Conclusión del Agente
                </h4>
                <p className="text-sm font-medium text-[#FAF5EF] mt-1 leading-snug">
                  {keyInsight}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Evidences list */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#8E8276] flex items-center justify-between">
            <span>Fuentes que sostienen la conclusión ({evidences.length})</span>
            <span className="text-[11px] font-normal text-emerald-400">100% Verificable</span>
          </div>

          {evidences.map((ev, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#1B0C12] border border-white/[0.06] hover:border-[#F97316]/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getSourceBadgeBg(ev.source)}`}>
                    {getSourceIcon(ev.source)}
                    {ev.sourceName}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#8E8276]">{ev.date}</span>
              </div>

              <h5 className="text-sm font-bold text-[#FFFDF9] mb-1">{ev.title}</h5>
              <p className="text-xs text-[#C9BDB0] leading-relaxed bg-[#0F0509] p-2.5 rounded-lg border border-white/[0.03]">
                {ev.detail}
              </p>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#A89F91]">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                  {ev.relevanceNote}
                </span>
                <span className="text-[10px] text-[#8E8276] flex items-center gap-0.5">
                  Indexado <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action button if provided */}
        {onTakeAction && (
          <div className="p-5 border-t border-white/[0.08] bg-[#18090F] flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onTakeAction();
              }}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#FF8C42] to-[#F97316] text-[#0B0507] hover:shadow-warm-glow transition-all duration-200 text-center"
            >
              {actionButtonText || 'Proceder con acción sugerida'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 text-xs font-semibold text-[#FAF5EF] bg-white/[0.06] hover:bg-white/[0.1] rounded-xl border border-white/[0.08] transition-colors"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
