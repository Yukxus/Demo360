import React, { useState } from 'react';
import type { ProposedAction } from '../../data/commercial';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Send, 
  Calendar, 
  Database, 
  Mail, 
  Edit3, 
  X, 
  Sparkles, 
  Clock 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SupervisedActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: ProposedAction | null;
  clientName: string;
  onApprove: (actionId: string, updatedData?: any) => void;
}

interface ActionFormContentProps {
  action: ProposedAction;
  clientName: string;
  onClose: () => void;
  onApprove: (actionId: string, updatedData?: any) => void;
}

const ActionFormContent: React.FC<ActionFormContentProps> = ({
  action,
  clientName,
  onClose,
  onApprove,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Editable fields initialized cleanly from action prop
  const [emailTo, setEmailTo] = useState(action.previewData.to || '');
  const [emailSubject, setEmailSubject] = useState(action.previewData.subject || '');
  const [emailBody, setEmailBody] = useState(action.previewData.body || '');

  const [meetingTitle, setMeetingTitle] = useState(action.previewData.meetingTitle || '');
  const [meetingDateTime, setMeetingDateTime] = useState(action.previewData.dateTime || '');
  const [meetingAgenda, setMeetingAgenda] = useState(action.previewData.meetingAgenda || '');

  const [crmStage] = useState(action.previewData.newStage || '');
  const [crmValue] = useState(action.previewData.newValue || '');
  const [crmNotes, setCrmNotes] = useState(action.previewData.notes || '');

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger subtle confetti burst
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#F97316', '#FB7185', '#FFFDF9'],
        });
      } catch {
        // Safe fallback
      }

      setTimeout(() => {
        onApprove(action.id, {
          emailTo,
          emailSubject,
          emailBody,
          meetingTitle,
          meetingDateTime,
          meetingAgenda,
          crmStage,
          crmValue,
          crmNotes,
        });
        setIsSuccess(false);
        onClose();
      }, 1200);
    }, 800);
  };

  const getActionIcon = () => {
    switch (action.type) {
      case 'email':
        return <Mail className="w-5 h-5 text-[#FB7185]" />;
      case 'meeting':
        return <Calendar className="w-5 h-5 text-[#FDA4AF]" />;
      case 'crm_update':
        return <Database className="w-5 h-5 text-[#F97316]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#F97316]" />;
    }
  };

  const getActionTypeName = () => {
    switch (action.type) {
      case 'email':
        return 'Borrador de Correo Electrónico';
      case 'meeting':
        return 'Agendamiento de Reunión en Calendar';
      case 'crm_update':
        return 'Actualización de Registro en CRM';
      default:
        return 'Acción Propuesta';
    }
  };

  return (
    <div 
      className="relative w-full max-w-xl rounded-2xl bg-[#14080D] border border-[#F43F5E]/30 shadow-warm-glow-lg overflow-hidden flex flex-col max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-white/[0.08] bg-[#1B0C12]/95 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2D0B18] border border-[#F97316]/30 flex items-center justify-center">
            {getActionIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-[#FFFDF9]">{action.title}</h3>
            </div>
            <p className="text-xs text-[#C9BDB0]">
              Cliente: <strong className="text-[#FAF5EF]">{clientName}</strong> · {getActionTypeName()}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          disabled={isSubmitting || isSuccess}
          className="text-[#8E8276] hover:text-[#FFFDF9] p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Human in the loop banner */}
      <div className="px-5 py-3 bg-gradient-to-r from-[#3D0A24] via-[#2A0718] to-[#1B0C12] border-b border-[#F43F5E]/20 flex items-center gap-3">
        <div className="p-1.5 rounded-lg bg-[#F97316]/20 border border-[#F97316]/40 text-[#FDBA74]">
          <ShieldAlert className="w-4 h-4 text-[#F97316]" />
        </div>
        <div>
          <div className="text-xs font-bold text-[#FAF5EF] flex items-center gap-1.5">
            <span>Esta acción requiere aprobación humana</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-ping" />
          </div>
          <p className="text-[11px] text-[#C9BDB0]">
            La IA formuló la propuesta basada en las 4 fuentes de contexto. Podés revisar o editar antes de autorizar.
          </p>
        </div>
      </div>

      {/* Editable body content based on type */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
        {action.type === 'email' && (
          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-[#8E8276] uppercase tracking-wider mb-1">
                Destinatario
              </label>
              <input
                type="text"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0F0509] border border-white/[0.1] text-[#FAF5EF] focus:outline-none focus:border-[#F97316] font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#8E8276] uppercase tracking-wider mb-1">
                Asunto del Email
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0F0509] border border-white/[0.1] text-[#FAF5EF] focus:outline-none focus:border-[#F97316] font-medium text-xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-[#8E8276] uppercase tracking-wider">
                  Cuerpo del Mensaje (Editable)
                </label>
                <span className="text-[10px] text-[#F97316] flex items-center gap-1">
                  <Edit3 className="w-3 h-3" /> Generado con tono ejecutivo
                </span>
              </div>
              <textarea
                rows={6}
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#0F0509] border border-white/[0.1] text-[#FAF5EF] focus:outline-none focus:border-[#F97316] leading-relaxed text-xs resize-none"
              />
            </div>
          </div>
        )}

        {action.type === 'meeting' && (
          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-[#8E8276] uppercase tracking-wider mb-1">
                Título del Evento
              </label>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0F0509] border border-white/[0.1] text-[#FAF5EF] focus:outline-none focus:border-[#F97316] font-semibold text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#8E8276] uppercase tracking-wider mb-1">
                  Fecha y Horario Sugerido
                </label>
                <input
                  type="text"
                  value={meetingDateTime}
                  onChange={(e) => setMeetingDateTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0F0509] border border-white/[0.1] text-[#FAF5EF] focus:outline-none focus:border-[#F97316] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8E8276] uppercase tracking-wider mb-1">
                  Participantes
                </label>
                <input
                  type="text"
                  readOnly
                  value={action.previewData.participants || ''}
                  className="w-full px-3 py-2 rounded-lg bg-[#0F0509]/60 border border-white/[0.06] text-[#A89F91] text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#8E8276] uppercase tracking-wider mb-1">
                Puntos de Agenda Propuestos
              </label>
              <textarea
                rows={4}
                value={meetingAgenda}
                onChange={(e) => setMeetingAgenda(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#0F0509] border border-white/[0.1] text-[#FAF5EF] focus:outline-none focus:border-[#F97316] leading-relaxed text-xs resize-none"
              />
            </div>
          </div>
        )}

        {action.type === 'crm_update' && (
          <div className="space-y-3.5 text-xs">
            <div className="p-3 rounded-xl bg-[#0F0509] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#8E8276]">Oportunidad:</span>
                <span className="font-semibold text-[#FAF5EF]">{action.previewData.dealName}</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-2">
                <span className="text-[#8E8276]">Valor Actual vs. Nuevo:</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  <span className="line-through text-[#8E8276] mr-2">{action.previewData.oldValue}</span>
                  {crmValue}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-2">
                <span className="text-[#8E8276]">Etapa Propuesta:</span>
                <span className="badge-orange px-2 py-0.5 rounded text-[11px] font-medium">
                  {crmStage}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#8E8276] uppercase tracking-wider mb-1">
                Anotación de Registro para el CRM
              </label>
              <textarea
                rows={3}
                value={crmNotes}
                onChange={(e) => setCrmNotes(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#0F0509] border border-white/[0.1] text-[#FAF5EF] focus:outline-none focus:border-[#F97316] leading-relaxed text-xs resize-none"
              />
            </div>
          </div>
        )}

        {/* Workflow Stage Progress */}
        <div className="p-3 rounded-xl bg-[#1B0C12] border border-white/[0.06] flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Analizado</span>
          </div>
          <span className="text-[#8E8276]">→</span>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Detectado</span>
          </div>
          <span className="text-[#8E8276]">→</span>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Propuesto</span>
          </div>
          <span className="text-[#8E8276]">→</span>
          <div className="flex items-center gap-1.5 text-[#F97316] font-bold">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>Aprobación</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 border-t border-white/[0.08] bg-[#18090F] flex items-center justify-between gap-3">
        <button
          onClick={onClose}
          disabled={isSubmitting || isSuccess}
          className="px-4 py-2.5 text-xs font-semibold text-[#FAF5EF] hover:bg-white/[0.08] rounded-xl border border-white/[0.1] transition-colors"
        >
          Cancelar
        </button>

        <button
          onClick={handleApprove}
          disabled={isSubmitting || isSuccess}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
            isSuccess
              ? 'bg-emerald-500 text-white shadow-lg'
              : 'bg-gradient-to-r from-[#FF8C42] via-[#F97316] to-[#FB7185] text-[#0B0507] hover:shadow-warm-glow'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0B0507] border-t-transparent rounded-full animate-spin" />
              <span>Ejecutando acción supervisada...</span>
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
              <span>✓ {action.type === 'email' ? 'Borrador creado' : action.type === 'meeting' ? 'Reunión agendada' : 'CRM actualizado'}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Aprobar acción</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export const SupervisedActionModal: React.FC<SupervisedActionModalProps> = ({
  isOpen,
  onClose,
  action,
  clientName,
  onApprove,
}) => {
  if (!isOpen || !action) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <ActionFormContent
        key={action.id}
        action={action}
        clientName={clientName}
        onClose={onClose}
        onApprove={onApprove}
      />
    </div>
  );
};
