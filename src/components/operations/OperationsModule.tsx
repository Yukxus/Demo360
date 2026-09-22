import React, { useState } from 'react';
import type { OperationProcess } from '../../data/operations';
import { OPERATIONS_MOCK_DATA } from '../../data/operations';
import { 
  Cpu, 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  User, 
  ArrowRight, 
  RefreshCw, 
  ShieldCheck,
  Check
} from 'lucide-react';

interface OperationsModuleProps {
  onTriggerNotification?: (title: string, msg: string) => void;
}

export const OperationsModule: React.FC<OperationsModuleProps> = ({ onTriggerNotification }) => {
  const [processes] = useState<OperationProcess[]>(OPERATIONS_MOCK_DATA);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleResolveAction = (process: OperationProcess) => {
    setResolvedIds((prev) => [...prev, process.id]);
    if (onTriggerNotification) {
      onTriggerNotification(
        'Acción operativa despachada',
        `Se ejecutó la notificación para ${process.responsible} sobre "${process.name}"`
      );
    }
  };

  const handleReanalyze = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F97316]/15 text-[#FDBA74] border border-[#F97316]/30 mb-2">
            <Cpu className="w-3.5 h-3.5 text-[#F97316]" />
            Control de Procesos en Tiempo Real
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFDF9] tracking-tight">
            Operaciones & Cuellos de Botella
          </h2>
          <p className="text-xs sm:text-sm text-[#C9BDB0] mt-1 max-w-2xl">
            Detecta desvíos en despachos, abastecimiento crítico y mantenimiento preventivo antes de que impacten al cliente final.
          </p>
        </div>

        <button
          onClick={handleReanalyze}
          disabled={isProcessing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#F97316] text-[#0B0507] text-xs font-bold hover:shadow-warm-glow transition-all self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
          <span>{isProcessing ? 'Auditando planta...' : 'Auditar operaciones'}</span>
        </button>
      </div>

      {/* Suggested Prompt Chip Banner */}
      <div className="p-4 rounded-xl bg-[#14080D] border border-white/[0.08] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-[#FAF5EF]">
          <Sparkles className="w-4 h-4 text-[#F97316]" />
          <span>Consulta auditada: <strong>"¿Qué procesos presentan demoras esta semana?"</strong></span>
        </div>
        <span className="text-[11px] text-emerald-400 font-semibold hidden sm:inline">
          4 procesos monitoreados
        </span>
      </div>

      {/* Processes List */}
      <div className="space-y-4">
        {processes.map((proc) => {
          const isResolved = resolvedIds.includes(proc.id);

          return (
            <div
              key={proc.id}
              className="p-5 rounded-2xl bg-[#14080D] border border-white/[0.08] hover:border-[#F97316]/30 transition-all space-y-3.5"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      proc.status === 'delayed'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : proc.status === 'at_risk'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {proc.status === 'delayed' && <AlertTriangle className="w-3 h-3" />}
                    {proc.status === 'at_risk' && <Clock className="w-3 h-3" />}
                    {proc.status === 'on_track' && <CheckCircle2 className="w-3 h-3" />}
                    {proc.statusLabel}
                  </span>
                  <span className="text-xs text-[#8E8276] font-mono">Lead Time: {proc.leadTime}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#C9BDB0]">
                  <User className="w-3.5 h-3.5 text-[#F97316]" />
                  <span><strong>{proc.responsible}</strong> ({proc.responsibleRole})</span>
                </div>
              </div>

              {/* Title & Bottleneck */}
              <div>
                <h4 className="text-base font-bold text-[#FFFDF9]">{proc.name}</h4>
                <div className="mt-1.5 p-2.5 rounded-lg bg-[#0B0507] border border-white/[0.04] text-xs">
                  <span className="text-rose-400 font-semibold">Causa raíz / Cuello de botella: </span>
                  <span className="text-[#C9BDB0]">{proc.bottleneck}</span>
                </div>
              </div>

              {/* Evidence reference */}
              <div className="text-[11px] text-[#8E8276] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fuente verificada: {proc.evidence}</span>
              </div>

              {/* Suggested Action & Execution Button */}
              <div className="pt-2 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-[#FDA4AF] flex items-start gap-1.5 flex-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#F97316] shrink-0 mt-0.5" />
                  <span><strong>Próximo paso recomendado:</strong> {proc.suggestedAction}</span>
                </div>

                <button
                  onClick={() => handleResolveAction(proc)}
                  disabled={isResolved || proc.status === 'on_track'}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5 ${
                    isResolved
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                      : proc.status === 'on_track'
                      ? 'bg-white/[0.05] text-[#8E8276] border border-white/[0.06] cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#FF8C42] to-[#F97316] text-[#0B0507] hover:shadow-warm-glow'
                  }`}
                >
                  {isResolved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Notificación enviada</span>
                    </>
                  ) : proc.status === 'on_track' ? (
                    <span>Proceso al día</span>
                  ) : (
                    <>
                      <span>Ejecutar próximo paso</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
