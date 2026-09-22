import React, { useState, useRef } from 'react';
import type { 
  CommercialClient, 
  ProposedAction 
} from '../../data/commercial';
import { 
  COMMERCIAL_CLIENTS, 
  COMMERCIAL_METRICS,
  AGENT_ANALYSIS_STEPS 
} from '../../data/commercial';
import { routeUserIntent } from '../../lib/intent-router';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Calendar, 
  Mail, 
  Database, 
  ShieldCheck, 
  Check,
  RefreshCw,
  Info
} from 'lucide-react';

interface CommercialModuleProps {
  onOpenEvidence: (client: CommercialClient) => void;
  onOpenActionModal: (client: CommercialClient, action: ProposedAction) => void;
  approvedActionIds: string[];
  initialRun?: boolean;
}

export const CommercialModule: React.FC<CommercialModuleProps> = ({
  onOpenEvidence,
  onOpenActionModal,
  approvedActionIds,
  initialRun = false,
}) => {
  const [queryInput, setQueryInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [hasRunAnalysis, setHasRunAnalysis] = useState(initialRun);
  const [filterCategory, setFilterCategory] = useState<'all' | 'followup' | 'stalled' | 'ready'>('all');
  const [lastExecutedQuery, setLastExecutedQuery] = useState<string>('Preparame la reunión comercial de esta semana');
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Suggestions
  const promptSuggestions = [
    'Preparame la reunión comercial de esta semana',
    '¿Qué clientes necesitan seguimiento?',
    '¿Qué oportunidades están frenadas?',
    'Analizá el pipeline actual',
  ];

  const runSimulation = (queryText: string) => {
    setIsProcessing(true);
    setActiveStepIndex(0);
    setFallbackMessage(null);
    setLastExecutedQuery(queryText);

    const stepInterval = 480; // ~2.4 seconds total for 5 steps
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep < AGENT_ANALYSIS_STEPS.length) {
        setActiveStepIndex(currentStep);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setHasRunAnalysis(true);
        // Scroll smoothly to results on mobile
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }, stepInterval);
  };

  const handleSendQuery = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!queryInput.trim() || isProcessing) return;

    const routeResult = routeUserIntent(queryInput);

    if (routeResult.intent === 'unknown') {
      setFallbackMessage(routeResult.responseMessage || 'Consulta no reconocida.');
      return;
    }

    if (routeResult.filterKey === 'followup') {
      setFilterCategory('followup');
    } else if (routeResult.filterKey === 'stalled') {
      setFilterCategory('stalled');
    } else {
      setFilterCategory('all');
    }

    runSimulation(queryInput);
    setQueryInput('');
  };

  const handleSelectSuggestion = (suggestion: string) => {
    if (isProcessing) return;
    if (suggestion.includes('seguimiento')) {
      setFilterCategory('followup');
    } else if (suggestion.includes('frenadas')) {
      setFilterCategory('stalled');
    } else {
      setFilterCategory('all');
    }
    runSimulation(suggestion);
  };

  // Filter clients based on tab
  const filteredClients = COMMERCIAL_CLIENTS.filter((client) => {
    if (filterCategory === 'followup') {
      return client.daysWithoutActivity >= 4;
    }
    if (filterCategory === 'stalled') {
      return client.daysWithoutActivity >= 10;
    }
    if (filterCategory === 'ready') {
      return client.stage.includes('Negociación') || client.stage.includes('Contrato') || client.stage.includes('Presentación');
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F97316]/15 text-[#FDBA74] border border-[#F97316]/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            Módulo Estrella · Agente Autónomo
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFDF9] tracking-tight">
            Agente Comercial
          </h2>
          <p className="text-xs sm:text-sm text-[#C9BDB0] mt-1 max-w-2xl">
            Analiza el contexto comercial, detecta oportunidades y ejecuta acciones bajo supervisión.
          </p>
        </div>

        {/* Status Chip */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1B0C12] border border-white/[0.08] self-start md:self-auto text-xs text-[#C9BDB0]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Indexando CRM, Mail, Calendar y Drive</span>
        </div>
      </div>

      {/* Copilot Prompt & Free Input Workspace */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#14080D] border border-[#F43F5E]/20 shadow-warm-glow space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FDBA74] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#F97316]" />
            <span>Consultas sugeridas al Agente</span>
          </div>
          <span className="text-[11px] text-[#8E8276] hidden sm:inline">
            Hacé click para simular el análisis en tiempo real
          </span>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2">
          {promptSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              disabled={isProcessing}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="text-left text-xs font-medium px-3.5 py-2 rounded-xl bg-[#1B0C12] hover:bg-[#280B17] text-[#FAF5EF] border border-white/[0.08] hover:border-[#F97316]/40 transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-50"
            >
              <span className="text-[#F97316] mr-1.5 font-bold">›</span>
              {suggestion}
            </button>
          ))}
        </div>

        {/* Free Input Form */}
        <form onSubmit={handleSendQuery} className="relative mt-2">
          <div className="relative flex items-center">
            <input
              type="text"
              value={queryInput}
              onChange={(e) => {
                setQueryInput(e.target.value);
                if (fallbackMessage) setFallbackMessage(null);
              }}
              placeholder="Escribí una consulta comercial (ej: 'Revisar clientes frenados', 'Preparar reunión')..."
              className="w-full pl-4 pr-24 py-3 sm:py-3.5 rounded-xl bg-[#0B0507] border border-white/[0.1] text-xs sm:text-sm text-[#FAF5EF] placeholder-[#8E8276] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all"
            />
            <button
              type="submit"
              disabled={!queryInput.trim() || isProcessing}
              className="absolute right-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF8C42] to-[#F97316] text-[#0B0507] font-bold text-xs flex items-center gap-1.5 hover:shadow-warm-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Consultar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Graceful Fallback Notice */}
          {fallbackMessage && (
            <div className="mt-3 p-3 rounded-xl bg-[#2D0B18]/70 border border-[#F43F5E]/30 text-xs text-[#FDA4AF] flex items-start gap-2.5 animate-in fade-in">
              <Info className="w-4 h-4 text-[#FB7185] shrink-0 mt-0.5" />
              <div>
                <p>{fallbackMessage}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectSuggestion('Preparame la reunión comercial de esta semana')}
                    className="text-[11px] underline text-[#FDBA74] hover:text-white font-semibold"
                  >
                    Probar: "Preparame la reunión comercial de esta semana"
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectSuggestion('¿Qué clientes necesitan seguimiento?')}
                    className="text-[11px] underline text-[#FDBA74] hover:text-white font-semibold"
                  >
                    Probar: "¿Qué clientes necesitan seguimiento?"
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Multi-source Animated Simulation Loading State */}
      {isProcessing && (
        <div className="p-6 rounded-2xl bg-[#1B0C12] border border-[#F97316]/30 shadow-warm-glow-lg space-y-4 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2D0B18] border border-[#F97316]/40 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-[#F97316] animate-spin" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#FFFDF9]">
                  Agente cruzando fuentes de contexto empresarial
                </h4>
                <p className="text-[11px] text-[#C9BDB0]">
                  Consulta: "{lastExecutedQuery}"
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-[#FDBA74]">
              Paso {activeStepIndex + 1} de {AGENT_ANALYSIS_STEPS.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#0B0507] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#FF8C42] via-[#F97316] to-[#FB7185] h-full transition-all duration-300"
              style={{ width: `${((activeStepIndex + 1) / AGENT_ANALYSIS_STEPS.length) * 100}%` }}
            />
          </div>

          {/* Steps Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
            {AGENT_ANALYSIS_STEPS.map((step, idx) => {
              const isDone = idx < activeStepIndex;
              const isCurrent = idx === activeStepIndex;
              return (
                <div
                  key={step.id}
                  className={`p-2.5 rounded-xl border text-xs transition-all duration-200 flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-2 ${
                    isDone
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : isCurrent
                      ? 'bg-[#2D0B18] border-[#F97316] text-[#FFFDF9] shadow-warm-glow'
                      : 'bg-[#0F0509]/60 border-white/[0.04] text-[#8E8276]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/[0.1] shrink-0" />
                    )}
                    <span className="font-medium text-[11px] leading-tight line-clamp-2">
                      {step.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Analysis Results View */}
      {hasRunAnalysis && !isProcessing && (
        <div ref={resultsRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Main Success Announcement Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#280B17] via-[#1C0811] to-[#14080D] border border-[#F43F5E]/30 shadow-warm-glow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#FFFDF9]">
                    Reunión comercial preparada
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Contexto verificado
                  </span>
                </div>
                <p className="text-xs text-[#C9BDB0] mt-0.5">
                  El agente consolidó 14 oportunidades, 38 hilos de correo, 4 citas y 24 documentos en Drive.
                </p>
              </div>
            </div>

            <button
              onClick={() => runSimulation('Preparame la reunión comercial de esta semana')}
              className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-[#FAF5EF] border border-white/[0.08] transition-colors"
            >
              <RefreshCw className="w-3 h-3 text-[#F97316]" />
              <span>Volver a ejecutar</span>
            </button>
          </div>

          {/* Structured Metrics Overview Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Pipeline card */}
            <div className="p-4 rounded-2xl bg-[#14080D] border border-white/[0.08] hover:border-[#F97316]/30 transition-all">
              <div className="flex items-center justify-between text-xs text-[#8E8276] mb-1">
                <span className="font-bold uppercase tracking-wider">PIPELINE</span>
                <TrendingUp className="w-4 h-4 text-[#F97316]" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#FFFDF9]">
                {COMMERCIAL_METRICS.totalPipeline}
              </div>
              <div className="text-xs text-[#C9BDB0] mt-1 flex items-center gap-1">
                <span className="font-semibold text-emerald-400">{COMMERCIAL_METRICS.openOpportunitiesCount}</span> oportunidades activas
              </div>
            </div>

            {/* Attention required */}
            <div className="p-4 rounded-2xl bg-[#14080D] border border-[#F97316]/30 hover:border-[#F97316]/50 transition-all shadow-sm">
              <div className="flex items-center justify-between text-xs text-[#FDBA74] mb-1">
                <span className="font-bold uppercase tracking-wider">ATENCIÓN</span>
                <Clock className="w-4 h-4 text-[#F97316]" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#FFFDF9]">
                {COMMERCIAL_METRICS.attentionRequiredCount} clientes
              </div>
              <div className="text-xs text-[#FDA4AF] mt-1">
                Requieren seguimiento inmediato
              </div>
            </div>

            {/* Alert stalled */}
            <div className="p-4 rounded-2xl bg-[#14080D] border border-[#F43F5E]/30 hover:border-[#F43F5E]/60 transition-all">
              <div className="flex items-center justify-between text-xs text-[#FB7185] mb-1">
                <span className="font-bold uppercase tracking-wider">ALERTA</span>
                <AlertTriangle className="w-4 h-4 text-[#FB7185]" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#FFFDF9]">
                {COMMERCIAL_METRICS.stalledOpportunitiesCount} oportunidades
              </div>
              <div className="text-xs text-[#FDA4AF] mt-1">
                +10 días sin actividad registrada
              </div>
            </div>

            {/* Agenda */}
            <div className="p-4 rounded-2xl bg-[#14080D] border border-white/[0.08] hover:border-[#F97316]/30 transition-all">
              <div className="flex items-center justify-between text-xs text-[#8E8276] mb-1">
                <span className="font-bold uppercase tracking-wider">AGENDA</span>
                <Calendar className="w-4 h-4 text-[#FDA4AF]" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#FFFDF9]">
                {COMMERCIAL_METRICS.scheduledMeetingsThisWeek} reuniones
              </div>
              <div className="text-xs text-[#C9BDB0] mt-1">
                Agendadas para esta semana
              </div>
            </div>
          </div>

          {/* Client Filter Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterCategory === 'all'
                    ? 'bg-[#2D0B18] text-[#FFFDF9] border border-[#F97316]/40'
                    : 'text-[#8E8276] hover:text-[#FAF5EF]'
                }`}
              >
                Todos los clientes ({COMMERCIAL_CLIENTS.length})
              </button>

              <button
                onClick={() => setFilterCategory('followup')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterCategory === 'followup'
                    ? 'bg-[#2D0B18] text-[#FFFDF9] border border-[#F97316]/40'
                    : 'text-[#8E8276] hover:text-[#FAF5EF]'
                }`}
              >
                Requieren seguimiento (3)
              </button>

              <button
                onClick={() => setFilterCategory('stalled')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterCategory === 'stalled'
                    ? 'bg-[#2D0B18] text-[#FFFDF9] border border-[#F97316]/40'
                    : 'text-[#8E8276] hover:text-[#FAF5EF]'
                }`}
              >
                Frenadas +10d (2)
              </button>

              <button
                onClick={() => setFilterCategory('ready')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterCategory === 'ready'
                    ? 'bg-[#2D0B18] text-[#FFFDF9] border border-[#F97316]/40'
                    : 'text-[#8E8276] hover:text-[#FAF5EF]'
                }`}
              >
                En Negociación / Cierre (3)
              </button>
            </div>

            <span className="text-xs text-[#8E8276]">
              Mostrando {filteredClients.length} cuentas clave
            </span>
          </div>

          {/* Client Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClients.map((client) => {
              const primaryAction = client.proposedActions[0];
              const isActionApproved = primaryAction && approvedActionIds.includes(primaryAction.id);

              return (
                <div
                  key={client.id}
                  className="p-5 rounded-2xl bg-[#14080D] border border-white/[0.08] hover:border-[#F97316]/30 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-warm-glow"
                >
                  <div>
                    {/* Top Row: Name, Value & Status Badge */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-[#FFFDF9] group-hover:text-[#FDBA74] transition-colors">
                            {client.name}
                          </h4>
                        </div>
                        <p className="text-xs text-[#8E8276]">{client.tagline}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-extrabold text-[#FFFDF9] font-mono">
                          {client.dealValue}
                        </div>
                        <span
                          className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border mt-1 ${
                            client.urgency === 'high'
                              ? 'bg-[#881337]/40 text-[#FDA4AF] border-[#F43F5E]/30'
                              : client.urgency === 'medium'
                              ? 'bg-[#F97316]/20 text-[#FDBA74] border-[#F97316]/30'
                              : 'bg-white/[0.05] text-[#C9BDB0] border-white/[0.08]'
                          }`}
                        >
                          {client.statusBadge}
                        </span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-[#C9BDB0] my-3 leading-relaxed bg-[#0B0507] p-3 rounded-xl border border-white/[0.03]">
                      {client.summary}
                    </p>

                    {/* Key Insight Chip */}
                    <div className="flex items-start gap-2 text-xs text-[#FDA4AF] mb-4 bg-[#280B17]/40 p-2.5 rounded-xl border border-[#F43F5E]/15">
                      <Sparkles className="w-3.5 h-3.5 text-[#F97316] shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-snug">{client.keyInsight}</span>
                    </div>
                  </div>

                  {/* Bottom: Action buttons & Evidence trigger */}
                  <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
                    {primaryAction && (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-[#8E8276] uppercase tracking-wider">
                          Acción sugerida
                        </span>
                        {isActionApproved ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/30">
                            <Check className="w-3 h-3" />
                            {primaryAction.type === 'email' ? 'Borrador creado' : primaryAction.type === 'meeting' ? 'Agendado' : 'CRM actualizado'}
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#FDA4AF] flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-[#FB7185]" />
                            Requiere supervisión
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {/* Evidence Button */}
                      <button
                        onClick={() => onOpenEvidence(client)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-[#FAF5EF] bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" />
                        <span>Ver contexto ({client.evidences.length})</span>
                      </button>

                      {/* Primary Supervised Action CTA */}
                      {primaryAction && (
                        <button
                          onClick={() => onOpenActionModal(client, primaryAction)}
                          disabled={isActionApproved}
                          className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            isActionApproved
                              ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-500/30 cursor-default'
                              : 'bg-gradient-to-r from-[#FF8C42] to-[#F97316] text-[#0B0507] hover:shadow-warm-glow'
                          }`}
                        >
                          {isActionApproved ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Acción aprobada</span>
                            </>
                          ) : (
                            <>
                              {primaryAction.type === 'email' && <Mail className="w-3.5 h-3.5" />}
                              {primaryAction.type === 'meeting' && <Calendar className="w-3.5 h-3.5" />}
                              {primaryAction.type === 'crm_update' && <Database className="w-3.5 h-3.5" />}
                              <span>{primaryAction.buttonLabel}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
