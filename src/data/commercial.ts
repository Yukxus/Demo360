export interface EvidenceItem {
  source: 'crm' | 'gmail' | 'calendar' | 'drive';
  sourceName: string;
  badgeColor: string;
  title: string;
  detail: string;
  date: string;
  relevanceNote: string;
}

export interface ProposedAction {
  id: string;
  type: 'email' | 'meeting' | 'crm_update';
  title: string;
  buttonLabel: string;
  requiresApproval: boolean;
  status: 'pending' | 'approved' | 'executed';
  previewData: {
    to?: string;
    subject?: string;
    body?: string;
    meetingTitle?: string;
    participants?: string;
    dateTime?: string;
    meetingAgenda?: string;
    dealName?: string;
    oldValue?: string;
    newValue?: string;
    oldStage?: string;
    newStage?: string;
    notes?: string;
  };
  successMessage: string;
}

export interface CommercialClient {
  id: string;
  name: string;
  tagline: string;
  dealValue: string;
  dealValueRaw: number;
  stage: string;
  urgency: 'high' | 'medium' | 'normal';
  statusBadge: string;
  daysWithoutActivity: number;
  summary: string;
  evidences: EvidenceItem[];
  proposedActions: ProposedAction[];
  keyInsight: string;
}

export interface CommercialMetrics {
  totalPipeline: string;
  openOpportunitiesCount: number;
  attentionRequiredCount: number;
  stalledOpportunitiesCount: number;
  scheduledMeetingsThisWeek: number;
}

export const COMMERCIAL_METRICS: CommercialMetrics = {
  totalPipeline: '$18,4M ARS',
  openOpportunitiesCount: 6,
  attentionRequiredCount: 3,
  stalledOpportunitiesCount: 2,
  scheduledMeetingsThisWeek: 4,
};

export const AGENT_ANALYSIS_STEPS = [
  { id: 1, text: 'Analizando CRM Comercial...', duration: 550, icon: 'Database' },
  { id: 2, text: 'Revisando 14 oportunidades activas...', duration: 600, icon: 'FileSearch' },
  { id: 3, text: 'Consultando últimas conversaciones en Gmail...', duration: 650, icon: 'Mail' },
  { id: 4, text: 'Revisando reuniones próximas en Calendar...', duration: 500, icon: 'Calendar' },
  { id: 5, text: 'Contrastando propuestas y minutas en Drive...', duration: 600, icon: 'FileText' },
];

export const COMMERCIAL_CLIENTS: CommercialClient[] = [
  {
    id: 'norte-industrial',
    name: 'Norte Industrial',
    tagline: 'Automatización y planta de empaque',
    dealValue: '$4,2M ARS',
    dealValueRaw: 4200000,
    stage: 'Propuesta enviada',
    urgency: 'high',
    statusBadge: '12 días sin seguimiento',
    daysWithoutActivity: 12,
    summary: 'Propuesta enviada hace 14 días. Último contacto hace 12 días sin respuesta ni reunión de seguimiento.',
    keyInsight: 'Riesgo de enfriamiento del deal por falta de contacto tras la revisión de directorio.',
    evidences: [
      {
        source: 'crm',
        sourceName: 'CRM Comercial',
        badgeColor: 'orange',
        title: 'Propuesta enviada · $4.2M ARS',
        detail: 'Enviada el 08/09/2026 por Esteban Ruiz. Etapa: Propuesta Presentada. Sin notas posteriores.',
        date: '08/09/2026',
        relevanceNote: 'Comprobación de que la propuesta formal fue entregada.',
      },
      {
        source: 'gmail',
        sourceName: 'Gmail Workspace',
        badgeColor: 'coral',
        title: 'Última respuesta de Ing. Marcelo Gómez',
        detail: '"Revisando con directorio financiero el alcance de módulos 1 y 2. Les aviso apenas tengamos resolución."',
        date: '09/09/2026',
        relevanceNote: 'Último intercambio registrado; hace 12 días calendario.',
      },
      {
        source: 'calendar',
        sourceName: 'Google Calendar',
        badgeColor: 'bordo',
        title: 'Sin próxima reunión agendada',
        detail: 'No existen eventos pasados ni futuros con el dominio @norteindustrial.com en los últimos 10 días.',
        date: 'Sin agenda',
        relevanceNote: 'Falta un hito de seguimiento formal en la agenda.',
      },
      {
        source: 'drive',
        sourceName: 'Google Drive',
        badgeColor: 'magenta',
        title: 'Propuesta_Tecnica_NorteIndustrial_v2.pdf',
        detail: 'Visualizado por última vez por el cliente el 10/09. Sin comentarios nuevos.',
        date: '10/09/2026',
        relevanceNote: 'El cliente descargó el documento pero no dejó notas.',
      },
    ],
    proposedActions: [
      {
        id: 'action-norte-email',
        type: 'email',
        title: 'Retomar contacto y definir próximo paso',
        buttonLabel: 'Preparar email',
        requiresApproval: true,
        status: 'pending',
        previewData: {
          to: 'Marcelo Gómez <m.gomez@norteindustrial.com>',
          subject: 'Seguimiento propuesta automatización planta · Enfoque360 / Norte Industrial',
          body: `Hola Marcelo, espero que estés muy bien.

Te escribo para consultar cómo avanzó la revisión de la propuesta técnica enviada el 08/09 para la automatización de la planta. 

Si necesitan ajustar algún punto del alcance presupuestario o resolver dudas con el directorio financiero, podemos coordinar una breve llamada de 15 minutos este jueves o viernes.

Quedo a tu disposición,
Esteban Ruiz · Enfoque360`,
        },
        successMessage: 'Borrador de email creado y listo para enviar en Gmail',
      },
    ],
  },
  {
    id: 'grupo-atlas',
    name: 'Grupo Atlas',
    tagline: 'Transformación de procesos de distribución',
    dealValue: '$6,8M ARS',
    dealValueRaw: 6800000,
    stage: 'Negociación final',
    urgency: 'high',
    statusBadge: 'Reunión sin confirmar',
    daysWithoutActivity: 4,
    summary: 'CEO manifestó interés en cerrar términos esta semana, pero la reunión no fue confirmada formalmente en calendario.',
    keyInsight: 'Oportunidad de alto valor ($6.8M) con 75% de probabilidad lista para cierre si se asegura el espacio con directores.',
    evidences: [
      {
        source: 'gmail',
        sourceName: 'Gmail Workspace',
        badgeColor: 'coral',
        title: 'Email de Laura Méndez (CEO)',
        detail: '"Coordinemos el martes o jueves por la tarde para cerrar los términos finales del contrato marco."',
        date: '18/09/2026',
        relevanceNote: 'Intención explícita de compra y coordinación.',
      },
      {
        source: 'crm',
        sourceName: 'CRM Comercial',
        badgeColor: 'orange',
        title: 'Etapa: Negociación de Términos · $6.8M',
        detail: 'Probabilidad asignada: 75%. Hito requerido: Confirmación de contrato de servicios.',
        date: '18/09/2026',
        relevanceNote: 'El deal está en su fase decisiva.',
      },
      {
        source: 'calendar',
        sourceName: 'Google Calendar',
        badgeColor: 'bordo',
        title: 'Hueco disponible: Jueves 15:00 hs',
        detail: 'Disponibilidad cruzada encontrada entre equipo consultor y directores de Atlas.',
        date: '24/09/2026',
        relevanceNote: 'Horario óptimo para confirmar sin colisiones.',
      },
      {
        source: 'drive',
        sourceName: 'Google Drive',
        badgeColor: 'magenta',
        title: 'Contrato_Marco_Servicios_Atlas_v3.docx',
        detail: 'Revisión final lista con cláusulas de SLA aprobadas por legales.',
        date: '19/09/2026',
        relevanceNote: 'Documentación lista para firma.',
      },
    ],
    proposedActions: [
      {
        id: 'action-atlas-meeting',
        type: 'meeting',
        title: 'Confirmar reunión pendiente y enviar agenda',
        buttonLabel: 'Agendar reunión',
        requiresApproval: true,
        status: 'pending',
        previewData: {
          meetingTitle: 'Cierre de términos y acuerdo marco · Enfoque360 × Grupo Atlas',
          participants: 'Laura Méndez (CEO), Esteban Ruiz, Directora de Operaciones',
          dateTime: 'Jueves 24/09 · 15:00 - 15:45 hs (Google Meet)',
          meetingAgenda: `1. Validación de alcances y cronograma de despliegue Q4
2. Revisión de SLAs y equipo asignado
3. Procedimiento de firma digital del acuerdo marco`,
        },
        successMessage: 'Reunión agendada y link de Meet enviado a participantes',
      },
    ],
  },
  {
    id: 'novatech',
    name: 'NovaTech',
    tagline: 'Tableros directivos e integración de sistemas',
    dealValue: '$3,1M ARS',
    dealValueRaw: 3100000,
    stage: 'Desfasaje en CRM ($2.4M vs $3.1M)',
    urgency: 'medium',
    statusBadge: 'Actualización requerida',
    daysWithoutActivity: 2,
    summary: 'El cliente solicitó sumar 2 sucursales adicionales ($3.1M total), pero el CRM todavía figura con $2.4M en etapa inicial.',
    keyInsight: 'El valor real del pipeline está subestimado en $700k ARS en los reportes comerciales directivos.',
    evidences: [
      {
        source: 'gmail',
        sourceName: 'Gmail Workspace',
        badgeColor: 'coral',
        title: 'Mensaje de Santiago Silva (CTO)',
        detail: '"Aprobamos en comité sumar las sucursales Rosario y Mendoza. El total del proyecto asciende a $3.1M."',
        date: '19/09/2026',
        relevanceNote: 'Confirmación formal del nuevo alcance pactado.',
      },
      {
        source: 'crm',
        sourceName: 'CRM Comercial',
        badgeColor: 'orange',
        title: 'Registro actual desactualizado: $2.4M',
        detail: 'Etapa anterior: "Evaluación Técnica". No refleja la ampliación solicitada.',
        date: '10/09/2026',
        relevanceNote: 'Inconsistencia de datos entre correo y sistema.',
      },
      {
        source: 'drive',
        sourceName: 'Google Drive',
        badgeColor: 'magenta',
        title: 'Anexo_Alcance_3_Sucursales_NovaTech.pdf',
        detail: 'Subido el 20/09 con detalle de arquitectura e infraestructura distribuida.',
        date: '20/09/2026',
        relevanceNote: 'Especificación técnica completa ya disponible.',
      },
    ],
    proposedActions: [
      {
        id: 'action-novatech-crm',
        type: 'crm_update',
        title: 'Actualizar valor y etapa de oportunidad en CRM',
        buttonLabel: 'Actualizar CRM',
        requiresApproval: true,
        status: 'pending',
        previewData: {
          dealName: 'NovaTech · Tableros Directivos & 3 Sucursales',
          oldValue: '$2,400,000 ARS',
          newValue: '$3,100,000 ARS (+29%)',
          oldStage: 'Evaluación Técnica (40%)',
          newStage: 'Negociación / Cierre Técnico (80%)',
          notes: 'Actualización automática basada en confirmación de Santiago Silva (19/09) y Anexo técnico en Drive.',
        },
        successMessage: 'Oportunidad actualizada exitosamente en el CRM comercial',
      },
    ],
  },
  {
    id: 'delta-logistica',
    name: 'Delta Logística',
    tagline: 'Optimización de ruteo y control de flota',
    dealValue: '$2,5M ARS',
    dealValueRaw: 2500000,
    stage: 'Diagnóstico realizado',
    urgency: 'medium',
    statusBadge: 'Minuta lista para propuesta',
    daysWithoutActivity: 5,
    summary: 'Reunión de relevamiento completada con éxito. Se detectó oportunidad de ahorro del 18% en combustible.',
    keyInsight: 'Cliente altamente calificado esperando propuesta adaptada a su flota de 45 camiones.',
    evidences: [
      {
        source: 'calendar',
        sourceName: 'Google Calendar',
        badgeColor: 'bordo',
        title: 'Reunión de Relevamiento Ejecutada',
        detail: 'Realizada el 17/09 con Gerente de Logística y Jefe de Operaciones.',
        date: '17/09/2026',
        relevanceNote: 'Entrevista técnica completada.',
      },
      {
        source: 'drive',
        sourceName: 'Google Drive',
        badgeColor: 'magenta',
        title: 'Minuta_Relevamiento_DeltaLogistica.docx',
        detail: 'Transcripción y análisis: Foco prioritario en reducción de desvíos de ruta.',
        date: '17/09/2026',
        relevanceNote: 'Diagnóstico inicial consolidado.',
      },
    ],
    proposedActions: [
      {
        id: 'action-delta-email',
        type: 'email',
        title: 'Enviar propuesta formal de optimización',
        buttonLabel: 'Preparar propuesta',
        requiresApproval: true,
        status: 'pending',
        previewData: {
          to: 'Carlos Benítez <c.benitez@deltalogistica.com.ar>',
          subject: 'Propuesta de Optimización de Flota · Enfoque360 / Delta Logística',
          body: `Estimado Carlos,

En función de nuestra reunión del 17/09, te compartimos la propuesta técnica y comercial enfocada en la reducción del 18% en desvíos y optimización de consumo en sus 45 unidades.

Quedamos a disposición para presentarla junto a tu equipo operativo.

Saludos cordiales,
Equipo Comercial · Enfoque360`,
        },
        successMessage: 'Propuesta y correo enviados a Carlos Benítez',
      },
    ],
  },
  {
    id: 'andes-foods',
    name: 'Andes Foods',
    tagline: 'Automatización de pedidos mayoristas B2B',
    dealValue: '$1,8M ARS',
    dealValueRaw: 1800000,
    stage: 'Contrato en firma',
    urgency: 'normal',
    statusBadge: 'En firma legal',
    daysWithoutActivity: 1,
    summary: 'Legales dio el visto bueno. Reunión de kick-off tentativa agendada para el viernes.',
    keyInsight: 'Deal en etapa final de formalización sin riesgos detectados.',
    evidences: [
      {
        source: 'gmail',
        sourceName: 'Gmail Workspace',
        badgeColor: 'coral',
        title: 'Email de Compras Andes Foods',
        detail: '"Aprobado por el departamento legal, remitimos firmado durante el día."',
        date: '21/09/2026',
        relevanceNote: 'Confirmación administrativa.',
      },
      {
        source: 'calendar',
        sourceName: 'Google Calendar',
        badgeColor: 'bordo',
        title: 'Kick-off operativo Andes Foods',
        detail: 'Viernes 25/09 · 10:30 hs (Presencial / Sede Central)',
        date: '25/09/2026',
        relevanceNote: 'Reunión ya agendada y aceptada.',
      },
    ],
    proposedActions: [
      {
        id: 'action-andes-crm',
        type: 'crm_update',
        title: 'Avanzar deal a "Ganado / En Implementación"',
        buttonLabel: 'Actualizar estado',
        requiresApproval: true,
        status: 'pending',
        previewData: {
          dealName: 'Andes Foods · Pedidos B2B Mayoristas',
          oldValue: '$1,800,000 ARS',
          newValue: '$1,800,000 ARS',
          oldStage: 'Contrato Enviado',
          newStage: 'Ganado / Pase a Operaciones',
          notes: 'Recepción de contrato firmado confirmada por compras.',
        },
        successMessage: 'Deal pasado a Implementación con notificación automática al equipo operativo',
      },
    ],
  },
  {
    id: 'lumina-retail',
    name: 'Lumina Retail',
    tagline: 'Control inteligente de inventario y reposición',
    dealValue: '$3,9M ARS',
    dealValueRaw: 3900000,
    stage: 'Presentación comercial',
    urgency: 'normal',
    statusBadge: 'Reunión mañana 11:00 hs',
    daysWithoutActivity: 0,
    summary: 'Reunión comercial confirmada para mañana miércoles a las 11:00 hs con el equipo directivo.',
    keyInsight: 'Preparación de demo y presentación comercial requerida para la sesión de mañana.',
    evidences: [
      {
        source: 'calendar',
        sourceName: 'Google Calendar',
        badgeColor: 'bordo',
        title: 'Demo de Solución Lumina Retail',
        detail: 'Miércoles 23/09 · 11:00 a 11:45 hs (Google Meet con 4 asistentes)',
        date: 'Mañana 11:00',
        relevanceNote: 'Reunión de alta prioridad en agenda.',
      },
      {
        source: 'drive',
        sourceName: 'Google Drive',
        badgeColor: 'magenta',
        title: 'Presentacion_Comercial_Lumina_v4.pdf',
        detail: 'Actualizada hoy con casos de éxito del sector retail.',
        date: 'Hoy',
        relevanceNote: 'Material de soporte actualizado.',
      },
    ],
    proposedActions: [
      {
        id: 'action-lumina-meeting',
        type: 'meeting',
        title: 'Enviar recordatorio con agenda a los 4 directores',
        buttonLabel: 'Enviar recordatorio',
        requiresApproval: true,
        status: 'pending',
        previewData: {
          meetingTitle: 'Recordatorio · Presentación Enfoque360 × Lumina Retail',
          participants: 'Directorio Lumina Retail (4 invitados)',
          dateTime: 'Miércoles 23/09 · 11:00 hs (Google Meet)',
          meetingAgenda: 'Presentación de caso, demo interactiva de reposición y sesión de preguntas.',
        },
        successMessage: 'Recordatorio y agenda enviados a los 4 asistentes',
      },
    ],
  },
];
