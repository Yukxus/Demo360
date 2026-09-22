export type IntentType = 
  | 'commercial_meeting'
  | 'commercial_followup'
  | 'commercial_pipeline'
  | 'commercial_stalled'
  | 'goto_diagnostic'
  | 'goto_operations'
  | 'goto_administration'
  | 'unknown';

export interface IntentMatchResult {
  intent: IntentType;
  confidence: number;
  matchedKeywords: string[];
  suggestedActionTitle: string;
  responseMessage?: string;
  targetModule?: 'inicio' | 'comercial' | 'diagnostico' | 'operaciones' | 'administracion';
  filterKey?: string;
}

export function routeUserIntent(input: string): IntentMatchResult {
  const normalized = input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  if (!normalized) {
    return {
      intent: 'unknown',
      confidence: 0,
      matchedKeywords: [],
      suggestedActionTitle: 'Consulta vacía',
    };
  }

  // 1. Meeting preparation intent
  const meetingKeywords = ['reunion', 'reuniones', 'semana', 'preparame', 'preparar', 'agenda', 'jueves', 'miercoles', 'lunes'];
  const matchedMeeting = meetingKeywords.filter(k => normalized.includes(k));
  if (matchedMeeting.length > 0 && (normalized.includes('reunion') || normalized.includes('semana') || normalized.includes('agenda'))) {
    return {
      intent: 'commercial_meeting',
      confidence: 0.95,
      matchedKeywords: matchedMeeting,
      suggestedActionTitle: 'Preparación de reunión comercial semanal',
      targetModule: 'comercial',
    };
  }

  // 2. Follow-up intent
  const followupKeywords = ['seguimiento', 'clientes', 'contactar', 'contactos', 'atencion', 'retomar', 'sin respuesta'];
  const matchedFollowup = followupKeywords.filter(k => normalized.includes(k));
  if (matchedFollowup.length > 0) {
    return {
      intent: 'commercial_followup',
      confidence: 0.9,
      matchedKeywords: matchedFollowup,
      suggestedActionTitle: 'Clientes que requieren seguimiento',
      targetModule: 'comercial',
      filterKey: 'followup',
    };
  }

  // 3. Stalled deals intent
  const stalledKeywords = ['frenada', 'frenadas', 'frenado', 'estancad', 'sin actividad', 'demora', 'alerta', 'dias'];
  const matchedStalled = stalledKeywords.filter(k => normalized.includes(k));
  if (matchedStalled.length > 0) {
    return {
      intent: 'commercial_stalled',
      confidence: 0.9,
      matchedKeywords: matchedStalled,
      suggestedActionTitle: 'Oportunidades con más de 10 días sin actividad',
      targetModule: 'comercial',
      filterKey: 'stalled',
    };
  }

  // 4. Pipeline & Opportunities
  const pipelineKeywords = ['pipeline', 'oportunidades', 'ventas', 'monto', 'total', 'deals', 'embudo', 'comercial'];
  const matchedPipeline = pipelineKeywords.filter(k => normalized.includes(k));
  if (matchedPipeline.length > 0) {
    return {
      intent: 'commercial_pipeline',
      confidence: 0.88,
      matchedKeywords: matchedPipeline,
      suggestedActionTitle: 'Análisis global del pipeline comercial',
      targetModule: 'comercial',
    };
  }

  // 5. Diagnostic intent
  const diagnosticKeywords = ['diagnostico', 'pyme', 'estructura', 'personas', 'resultados', 'organizacional', 'problemas', 'hallazgos'];
  const matchedDiag = diagnosticKeywords.filter(k => normalized.includes(k));
  if (matchedDiag.length > 0) {
    return {
      intent: 'goto_diagnostic',
      confidence: 0.92,
      matchedKeywords: matchedDiag,
      suggestedActionTitle: 'Copiloto de Diagnóstico Organizacional',
      targetModule: 'diagnostico',
    };
  }

  // 6. Operations intent
  const opKeywords = ['operacion', 'operaciones', 'planta', 'despacho', 'fabrica', 'produccion', 'cuello de botella', 'proceso', 'procesos'];
  const matchedOp = opKeywords.filter(k => normalized.includes(k));
  if (matchedOp.length > 0) {
    return {
      intent: 'goto_operations',
      confidence: 0.9,
      matchedKeywords: matchedOp,
      suggestedActionTitle: 'Monitoreo de Procesos y Operaciones',
      targetModule: 'operaciones',
    };
  }

  // 7. Administration intent
  const adminKeywords = ['administracion', 'factura', 'facturas', 'afip', 'impuesto', 'impuestos', 'vencimiento', 'sueldos', 'bancos'];
  const matchedAdmin = adminKeywords.filter(k => normalized.includes(k));
  if (matchedAdmin.length > 0) {
    return {
      intent: 'goto_administration',
      confidence: 0.9,
      matchedKeywords: matchedAdmin,
      suggestedActionTitle: 'Control de Tareas Administrativas',
      targetModule: 'administracion',
    };
  }

  // Fallback
  return {
    intent: 'unknown',
    confidence: 0.2,
    matchedKeywords: [],
    suggestedActionTitle: 'Consulta no reconocida',
    responseMessage: 'En esta demo interactiva podés probar consultas relacionadas con clientes, seguimiento comercial, reuniones de la semana y estado del pipeline.',
  };
}
