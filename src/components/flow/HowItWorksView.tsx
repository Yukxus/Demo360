import React, { useState } from 'react';
import { 
  User, 
  Cpu, 
  Database, 
  SearchCheck, 
  Lightbulb, 
  ShieldCheck, 
  ArrowDown, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 0,
      badge: 'Paso 1',
      title: 'USUARIO',
      subtitle: 'Consulta en Lenguaje Natural',
      icon: User,
      color: '#F97316',
      description: 'El directivo o líder de área realiza una consulta cotidiana (ej: "Preparame la reunión comercial de esta semana" o "¿Qué clientes están frenados?").',
      businessValue: 'No requiere comandos técnicos ni aprender un software complejo.',
    },
    {
      id: 1,
      badge: 'Paso 2',
      title: 'AGENTE COORDINADOR',
      subtitle: 'Entendimiento de Intención & Reglas',
      icon: Cpu,
      color: '#FB7185',
      description: 'El agente interpreta la necesidad, planifica qué sistemas consultar y formula un plan de búsqueda seguro.',
      businessValue: 'Orquestación autónoma respetando permisos empresariales.',
    },
    {
      id: 2,
      badge: 'Paso 3',
      title: 'FUENTES & HERRAMIENTAS',
      subtitle: 'Cruce de CRM, Gmail, Calendar y Drive',
      icon: Database,
      color: '#FDA4AF',
      description: 'Consulta simultáneamente los 4 sistemas empresariales para obtener el contexto completo y actualizado.',
      businessValue: 'Elimina silos de información entre correos personales, archivos y CRM.',
    },
    {
      id: 3,
      badge: 'Paso 4',
      title: 'ANÁLISIS & DETECCIÓN',
      subtitle: 'Detección de Desvíos y Riesgos',
      icon: SearchCheck,
      color: '#FDBA74',
      description: 'Cruza las fechas de propuesta, respuestas de correo y agendas para detectar retrasos (ej: Norte Industrial lleva 12 días sin contacto).',
      businessValue: 'Detecta problemas antes de que se pierdan negocios o se generen demoras.',
    },
    {
      id: 4,
      badge: 'Paso 5',
      title: 'PROPUESTA DE ACCIÓN',
      subtitle: 'Generación de Soluciones Concretas',
      icon: Lightbulb,
      color: '#F97316',
      description: 'El agente no se limita a responder un texto; redacta el borrador del email, propone la reunión en calendario o actualiza el monto en CRM.',
      businessValue: 'Ahorro de horas operativas entregando trabajo 90% terminado.',
    },
    {
      id: 5,
      badge: 'Paso 6',
      title: 'ACCIÓN SUPERVISADA (HUMAN-IN-THE-LOOP)',
      subtitle: 'Aprobación Humana Obligatoria',
      icon: ShieldCheck,
      color: '#10B981',
      description: 'Ninguna acción crítica se envía o modifica sin que el responsable humano revise, edite si lo desea y presione "Aprobar acción".',
      businessValue: 'Seguridad absoluta, control directivo y cero riesgo de alucinación.',
    },
  ];

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F97316]/15 text-[#FDBA74] border border-[#F97316]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
          <span>Arquitectura Conceptual Simplificada</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFDF9] tracking-tight">
          El Flujo de la IA Aplicada
        </h2>
        <p className="text-xs sm:text-base text-[#C9BDB0] max-w-2xl mx-auto leading-relaxed">
          Cómo un agente empresarial transforma una consulta simple en acciones concretas y supervisadas sobre las herramientas que tu equipo ya utiliza.
        </p>
      </div>

      {/* Interactive Vertical Timeline Pipeline */}
      <div className="relative space-y-4">
        {/* Step Cards */}
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = activeStep === idx;

          return (
            <div key={step.id} className="relative">
              {/* Card */}
              <div
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F0A14] border-[#F97316] shadow-warm-glow-lg scale-[1.01]'
                    : 'bg-[#14080D] border-white/[0.08] hover:border-white/[0.2]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: `${step.color}25`, border: `1px solid ${step.color}60` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.06] text-[#C9BDB0]">
                          {step.badge}
                        </span>
                        <h3 className="text-base font-bold text-[#FFFDF9]">{step.title}</h3>
                      </div>
                      <h4 className="text-xs font-semibold text-[#FDBA74] mt-0.5">{step.subtitle}</h4>
                    </div>
                  </div>

                  <span className="text-xs text-[#8E8276] font-medium self-end sm:self-auto">
                    {isSelected ? 'Etapa activa' : 'Hacé click para ver detalle'}
                  </span>
                </div>

                {/* Expanded explanation */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-3 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-[#FAF5EF] leading-relaxed">
                      {step.description}
                    </p>

                    <div className="p-3 rounded-xl bg-[#0B0507] border border-white/[0.04] flex items-start gap-2.5 text-xs text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Impacto de negocio: </strong>
                        <span>{step.businessValue}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Connecting arrow if not last */}
              {idx < steps.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="w-6 h-6 rounded-full bg-[#1B0C12] border border-[#F43F5E]/30 flex items-center justify-center text-[#F97316]">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
