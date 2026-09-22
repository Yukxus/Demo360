import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClosureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestartDemo: () => void;
}

export const ClosureModal: React.FC<ClosureModalProps> = ({
  isOpen,
  onClose,
  onRestartDemo,
}) => {
  const [formSent, setFormSent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  if (!isOpen) return null;

  const getWhatsAppUrl = () => {
    const text = `Hola Tomás, estuve probando la demo interactiva de Enfoque360 AI y me gustaría coordinar para identificar el primer caso de IA aplicada en mi empresa.

*Nombre:* ${contactName.trim() || 'Interesado'}
*Empresa:* ${contactCompany.trim() || 'No especificada'}
*Contacto:* ${contactEmail.trim() || 'WhatsApp'}`;

    return `https://wa.me/5493516781319?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F97316', '#FB7185', '#FFFDF9'],
      });
    } catch {
      // Safe fallback
    }

    // Open WhatsApp in new tab
    const url = getWhatsAppUrl();
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#14080D] border border-[#F43F5E]/30 shadow-warm-glow-lg overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div 
          className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-gradient-to-br from-[#F97316]/30 to-[#881337]/40 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Header Close */}
        <div className="p-4 sm:p-5 flex justify-end">
          <button
            onClick={onClose}
            className="text-[#8E8276] hover:text-[#FFFDF9] p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-8 space-y-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2D0B18] text-[#FDA4AF] border border-[#F43F5E]/30 shadow-warm-glow">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Enfoque360 × IA Aplicada</span>
          </div>

          {/* Headlines */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFDF9] tracking-tight">
              Esto fue una simulación.
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gradient-warm mt-1">
              El modelo de trabajo no.
            </h3>
          </div>

          {/* 3 Pillars Summary */}
          <div className="grid grid-cols-3 gap-3 py-2">
            <div className="p-3 rounded-2xl bg-[#1B0C12] border border-white/[0.06]">
              <div className="text-2xl font-black text-[#F97316]">1</div>
              <div className="text-xs font-semibold text-[#FFFDF9] mt-0.5">agente</div>
              <div className="text-[10px] text-[#8E8276]">coordinador</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#1B0C12] border border-white/[0.06]">
              <div className="text-2xl font-black text-[#FB7185]">4</div>
              <div className="text-xs font-semibold text-[#FFFDF9] mt-0.5">fuentes</div>
              <div className="text-[10px] text-[#8E8276]">conectadas</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#1B0C12] border border-white/[0.06]">
              <div className="text-2xl font-black text-[#FDA4AF]">∞</div>
              <div className="text-xs font-semibold text-[#FFFDF9] mt-0.5">procesos</div>
              <div className="text-[10px] text-[#8E8276]">adaptables</div>
            </div>
          </div>

          {/* Core Takeaway */}
          <p className="text-xs sm:text-sm text-[#C9BDB0] leading-relaxed max-w-md mx-auto">
            Una implementación real se construye sobre los procesos, permisos, información y necesidades de cada empresa, comenzando con un caso pequeño y medible.
          </p>

          {/* Form or Success message */}
          {!formSent ? (
            <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-[#1B0C12] border border-white/[0.08] text-left space-y-3">
              <div className="text-xs font-bold text-[#FFFDF9] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                  ¿Querés identificar el primer caso en tu empresa?
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> WhatsApp directo
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Tu Nombre"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#0B0507] border border-white/[0.1] text-[#FAF5EF] placeholder-[#8E8276] focus:outline-none focus:border-[#F97316]"
                />
                <input
                  type="text"
                  placeholder="Empresa / PyME"
                  value={contactCompany}
                  onChange={(e) => setContactCompany(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#0B0507] border border-white/[0.1] text-[#FAF5EF] placeholder-[#8E8276] focus:outline-none focus:border-[#F97316]"
                />
              </div>

              <input
                type="text"
                placeholder="Teléfono o Email (opcional)"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0B0507] border border-white/[0.1] text-[#FAF5EF] placeholder-[#8E8276] focus:outline-none focus:border-[#F97316] text-xs"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#FF8C42] via-[#F97316] to-[#FB7185] text-[#0B0507] hover:shadow-warm-glow-lg transition-all flex items-center justify-center gap-2 mt-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Encontrar el primer caso por WhatsApp →</span>
              </button>
            </form>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 space-y-3 animate-in zoom-in-95">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">¡Abriendo WhatsApp para coordinar!</h4>
              <p className="text-xs text-emerald-200">
                Si no se abrió automáticamente, podés hacer click en el botón a continuación para enviar tu mensaje directamente:
              </p>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Abrir WhatsApp con Tomás (+54 351 678 1319)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Signature & Reset */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="font-extrabold text-[#FDBA74] tracking-tight">
              Enfoque360 × IA aplicada
            </span>

            <button
              onClick={() => {
                onRestartDemo();
                onClose();
              }}
              className="text-[#8E8276] hover:text-[#FFFDF9] underline"
            >
              Reiniciar demo desde el inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
