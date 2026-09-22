import { useState } from 'react';
import type { 
  DiagnosticFinding, 
} from '../../data/diagnostic';
import { DIAGNOSTIC_MOCK_DATA } from '../../data/diagnostic';
import { 
  Stethoscope, 
  Sparkles, 
  Users, 
  Layers, 
  GitMerge, 
  BarChart3, 
  ShieldCheck, 
  TrendingUp,
  RefreshCw,
} from 'lucide-react';

interface DiagnosticModuleProps {
  onOpenEvidenceForFinding?: (finding: DiagnosticFinding) => void;
}

export const DiagnosticModule: React.FC<DiagnosticModuleProps> = () => {
  const [selectedPillar, setSelectedPillar] = useState<'ALL' | 'PERSONAS' | 'ESTRUCTURA' | 'PROCESOS' | 'RESULTADOS'>('ALL');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'findings' | 'missing' | 'priorities'>('findings');

  const pillars = [
    { id: 'ALL', label: 'Todos los pilares', count: 5 },
    { id: 'PERSONAS', label: 'Personas', icon: Users, count: 1 },
    { id: 'ESTRUCTURA', label: 'Estructura', icon: Layers, count: 1 },
    { id: 'PROCESOS', label: 'Procesos', icon: GitMerge, count: 2 },
    { id: 'RESULTADOS', label: 'Resultados', icon: BarChart3, count: 1 },
  ];

  const handleSimulateAnalysis = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1800);
  };

  const filteredFindings = selectedPillar === 'ALL'
    ? DIAGNOSTIC_MOCK_DATA.findings
    : DIAGNOSTIC_MOCK_DATA.findings.filter((f) => f.pillar === selectedPillar);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#881337]/30 text-[#FDA4AF] border border-[#F43F5E]/30 mb-2">
            <Stethoscope className="w-3.5 h-3.5 text-[#FB7185]" />
            Metodología Enfoque360 · Módulo Diagnóstico
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFDF9] tracking-tight">
            Copiloto de Diagnóstico PyME
          </h2>
          <p className="text-xs sm:text-sm text-[#C9BDB0] mt-1 max-w-2xl">
            Evalúa la situación organizacional integrando entrevistas, procesos, métricas y estructura en 4 dimensiones.
          </p>
        </div>

        <button
          onClick={handleSimulateAnalysis}
          disabled={isProcessing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#F97316] text-[#0B0507] text-xs font-bold hover:shadow-warm-glow transition-all self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
          <span>{isProcessing ? 'Analizando PyME...' : 'Re-evaluar diagnóstico'}</span>
        </button>
      </div>

      {/* Target PyME Summary Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#14080D] border border-[#F43F5E]/20 shadow-warm-glow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#2D0B18] border border-[#F97316]/30 flex items-center justify-center text-[#F97316] font-bold text-sm">
            AUS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#FFFDF9]">{DIAGNOSTIC_MOCK_DATA.pymeName}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-[#C9BDB0]">
                {DIAGNOSTIC_MOCK_DATA.employees} colaboradores
              </span>
            </div>
            <p className="text-xs text-[#8E8276] mt-0.5">{DIAGNOSTIC_MOCK_DATA.industry}</p>
          </div>
        </div>

        {/* Health Score Pill */}
        <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-white/[0.08] pt-3 sm:pt-0 sm:pl-5">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-[#8E8276]">Índice de Madurez</div>
            <div className="text-xl font-extrabold text-[#FDBA74] font-mono">
              {DIAGNOSTIC_MOCK_DATA.overallHealthScore}/100
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-[#F97316]/30 border-t-[#F97316] flex items-center justify-center text-xs font-bold text-white">
            68%
          </div>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTab('findings')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeTab === 'findings'
              ? 'bg-[#280B17] border-[#F97316]/50 shadow-warm-glow'
              : 'bg-[#14080D] border-white/[0.06] hover:border-white/[0.15]'
          }`}
        >
          <div className="text-xs text-[#FDA4AF] font-bold uppercase tracking-wider">Hallazgos</div>
          <div className="text-2xl font-black text-[#FFFDF9] mt-0.5">
            {DIAGNOSTIC_MOCK_DATA.findingsCount}
          </div>
          <div className="text-[11px] text-[#8E8276]">Identificados en 4 áreas</div>
        </button>

        <button
          onClick={() => setActiveTab('missing')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeTab === 'missing'
              ? 'bg-[#280B17] border-[#F97316]/50 shadow-warm-glow'
              : 'bg-[#14080D] border-white/[0.06] hover:border-white/[0.15]'
          }`}
        >
          <div className="text-xs text-[#FDBA74] font-bold uppercase tracking-wider">Datos Faltantes</div>
          <div className="text-2xl font-black text-[#FFFDF9] mt-0.5">
            {DIAGNOSTIC_MOCK_DATA.missingDataCount}
          </div>
          <div className="text-[11px] text-[#8E8276]">Gaps de información</div>
        </button>

        <button
          onClick={() => setActiveTab('priorities')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeTab === 'priorities'
              ? 'bg-[#280B17] border-[#F97316]/50 shadow-warm-glow'
              : 'bg-[#14080D] border-white/[0.06] hover:border-white/[0.15]'
          }`}
        >
          <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Prioridades</div>
          <div className="text-2xl font-black text-[#FFFDF9] mt-0.5">
            {DIAGNOSTIC_MOCK_DATA.priorityAreasCount}
          </div>
          <div className="text-[11px] text-[#8E8276]">Focos de alto impacto</div>
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'findings' && (
        <div className="space-y-4">
          {/* 4 Pillars Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {pillars.map((pil) => (
              <button
                key={pil.id}
                onClick={() => setSelectedPillar(pil.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedPillar === pil.id
                    ? 'bg-[#2D0B18] text-[#FFFDF9] border border-[#F97316]/40'
                    : 'text-[#8E8276] hover:text-[#FAF5EF]'
                }`}
              >
                {pil.label} ({pil.count})
              </button>
            ))}
          </div>

          {/* Findings List */}
          <div className="space-y-3">
            {filteredFindings.map((finding) => (
              <div
                key={finding.id}
                className="p-5 rounded-2xl bg-[#14080D] border border-white/[0.08] hover:border-[#F97316]/30 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider uppercase bg-[#881337]/40 text-[#FDA4AF] border border-[#F43F5E]/30">
                      {finding.pillar}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        finding.severity === 'critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : finding.severity === 'moderate'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {finding.severity === 'critical' ? 'Crítico' : finding.severity === 'moderate' ? 'Moderado' : 'Oportunidad'}
                    </span>
                  </div>

                  <span className="text-[11px] text-[#8E8276]">
                    {finding.evidence.length} evidencias indexadas
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-[#FFFDF9]">{finding.title}</h4>
                  <p className="text-xs text-[#C9BDB0] mt-1 leading-relaxed">
                    {finding.impactDescription}
                  </p>
                </div>

                {/* Evidences preview box */}
                <div className="p-3 rounded-xl bg-[#0B0507] border border-white/[0.04] space-y-2">
                  <div className="text-[11px] font-bold text-[#8E8276] uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" />
                      Evidencias que respaldan el hallazgo
                    </span>
                  </div>
                  {finding.evidence.map((ev, idx) => (
                    <div key={idx} className="text-xs text-[#FAF5EF] pl-3 border-l-2 border-[#F97316]/40 py-0.5">
                      <div className="font-semibold text-[11px] text-[#FDBA74]">{ev.label}</div>
                      <div className="text-[11px] text-[#C9BDB0]">{ev.description}</div>
                      <div className="text-[10px] text-[#8E8276] mt-0.5">Ref: {ev.sourceRef}</div>
                    </div>
                  ))}
                </div>

                {/* Recommendation */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="text-[#FDA4AF] flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                    <span><strong>Propuesta Enfoque360:</strong> {finding.recommendation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Data Tab */}
      {activeTab === 'missing' && (
        <div className="space-y-3">
          <div className="text-xs text-[#C9BDB0] mb-2">
            Gaps de información detectados que impiden calcular métricas con 100% de precisión:
          </div>
          {DIAGNOSTIC_MOCK_DATA.missingData.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-[#14080D] border border-white/[0.08] space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F97316]/20 text-[#FDBA74]">
                  {item.pillar}
                </span>
                <h4 className="text-sm font-bold text-[#FFFDF9]">{item.title}</h4>
              </div>
              <p className="text-xs text-[#C9BDB0]"><strong>Por qué falta:</strong> {item.whyNeeded}</p>
              <p className="text-xs text-emerald-400"><strong>Impacto al resolverlo:</strong> {item.impactIfResolved}</p>
            </div>
          ))}
        </div>
      )}

      {/* Priority Areas Tab */}
      {activeTab === 'priorities' && (
        <div className="space-y-3">
          <div className="text-xs text-[#C9BDB0] mb-2">
            Áreas de intervención recomendadas para el primer hito de 30 días:
          </div>
          {DIAGNOSTIC_MOCK_DATA.priorityAreas.map((area, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-gradient-to-r from-[#280B17] to-[#14080D] border border-[#F97316]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FDBA74] uppercase tracking-wider">{area.pillar}</span>
                <span className="text-[11px] font-semibold text-emerald-400">Prioridad #{idx + 1}</span>
              </div>
              <h4 className="text-base font-bold text-[#FFFDF9]">{area.area}</h4>
              <p className="text-xs text-[#C9BDB0] leading-relaxed">{area.summary}</p>
              <div className="mt-2 pt-2 border-t border-white/[0.06] text-xs font-medium text-[#FDA4AF] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#F97316]" />
                <span>ROI proyectado: {area.expectedROI}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
