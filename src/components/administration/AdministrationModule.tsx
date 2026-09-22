import { useState } from 'react';
import type { AdminTask } from '../../data/administration';
import { ADMIN_MOCK_DATA } from '../../data/administration';
import { 
  FileCheck2, 
  Sparkles, 
  User, 
  Zap, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Check,
  RefreshCw
} from 'lucide-react';

interface AdministrationModuleProps {
  onTriggerNotification?: (title: string, msg: string) => void;
}

export const AdministrationModule: React.FC<AdministrationModuleProps> = ({ onTriggerNotification }) => {
  const [tasks] = useState<AdminTask[]>(ADMIN_MOCK_DATA);
  const [automatedTaskIds, setAutomatedTaskIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAutomateTask = (task: AdminTask) => {
    setAutomatedTaskIds((prev) => [...prev, task.id]);
    if (onTriggerNotification) {
      onTriggerNotification(
        'Flujo administrativo procesado',
        `Se ejecutó la automatización para "${task.title}".`
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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#881337]/30 text-[#FDA4AF] border border-[#F43F5E]/30 mb-2">
            <FileCheck2 className="w-3.5 h-3.5 text-[#FB7185]" />
            Control & Automatización de Tareas
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFDF9] tracking-tight">
            Administración & Finanzas
          </h2>
          <p className="text-xs sm:text-sm text-[#C9BDB0] mt-1 max-w-2xl">
            Supervisa obligaciones impositivas, facturación de anticipos y conciliaciones bancarias detectando tareas automatizables.
          </p>
        </div>

        <button
          onClick={handleReanalyze}
          disabled={isProcessing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#F97316] text-[#0B0507] text-xs font-bold hover:shadow-warm-glow transition-all self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
          <span>{isProcessing ? 'Revisando vencimientos...' : 'Actualizar vencimientos'}</span>
        </button>
      </div>

      {/* Suggested Prompt Chip Banner */}
      <div className="p-4 rounded-xl bg-[#14080D] border border-white/[0.08] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-[#FAF5EF]">
          <Sparkles className="w-4 h-4 text-[#F97316]" />
          <span>Consulta auditada: <strong>"Mostrame las tareas administrativas pendientes."</strong></span>
        </div>
        <span className="text-[11px] text-emerald-400 font-semibold hidden sm:inline">
          4 obligaciones clave
        </span>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const isAutomated = automatedTaskIds.includes(task.id);

          return (
            <div
              key={task.id}
              className="p-5 rounded-2xl bg-[#14080D] border border-white/[0.08] hover:border-[#F97316]/30 transition-all space-y-3.5"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#881337]/40 text-[#FDA4AF] border border-[#F43F5E]/30 uppercase">
                    {task.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      task.dueStatus === 'today'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : task.dueStatus === 'tomorrow'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-white/[0.06] text-[#C9BDB0]'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    {task.dueDate}
                  </span>
                  {task.amount && (
                    <span className="text-xs font-mono font-bold text-[#FDBA74]">
                      {task.amount}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#8E8276]">
                  <User className="w-3.5 h-3.5 text-[#F97316]" />
                  <span><strong>{task.responsible}</strong> ({task.responsibleRole})</span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h4 className="text-base font-bold text-[#FFFDF9]">{task.title}</h4>
                <p className="text-xs text-[#C9BDB0] mt-1">{task.description}</p>
              </div>

              {/* Automation Potential Box */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#280B17]/60 to-[#14080D] border border-[#F97316]/20 flex items-center gap-2.5 text-xs">
                <Zap className="w-4 h-4 text-[#F97316] shrink-0" />
                <span className="text-[#FDBA74]">
                  <strong>Potencial de Automatización:</strong> {task.automationPotential}
                </span>
              </div>

              {/* Evidence & Action */}
              <div className="pt-2 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[11px] text-[#8E8276] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Fuente: {task.evidenceRef}</span>
                </div>

                <button
                  onClick={() => handleAutomateTask(task)}
                  disabled={isAutomated}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5 ${
                    isAutomated
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                      : 'bg-gradient-to-r from-[#FF8C42] to-[#F97316] text-[#0B0507] hover:shadow-warm-glow'
                  }`}
                >
                  {isAutomated ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Automatización ejecutada</span>
                    </>
                  ) : (
                    <>
                      <span>Ejecutar pre-procesamiento</span>
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
