export interface ConnectedSource {
  id: 'crm' | 'gmail' | 'calendar' | 'drive';
  name: string;
  type: string;
  iconName: string;
  status: 'connected' | 'syncing' | 'error';
  lastSync: string;
  itemCount: number;
  description: string;
  simulatedRecords: {
    title: string;
    detail: string;
    timestamp: string;
  }[];
}

export const CONNECTED_SOURCES: ConnectedSource[] = [
  {
    id: 'crm',
    name: 'CRM Comercial',
    type: 'HubSpot / Salesforce Mock',
    iconName: 'Database',
    status: 'connected',
    lastSync: 'Hace 4 minutos',
    itemCount: 14,
    description: '14 oportunidades activas, 6 cuentas prioritarias y pipeline de $18.4M ARS',
    simulatedRecords: [
      {
        title: 'Norte Industrial · Cotización de planta',
        detail: 'Etapa: Propuesta enviada ($4.2M) · Asignado a Esteban Ruiz',
        timestamp: '08/09/2026 11:30',
      },
      {
        title: 'Grupo Atlas · Transformación de distribución',
        detail: 'Etapa: Negociación de términos ($6.8M) · Probabilidad 75%',
        timestamp: '18/09/2026 17:45',
      },
      {
        title: 'NovaTech · Tableros directivos',
        detail: 'Etapa: Propuesta ($2.4M) [Alerta: Cliente pidió ampliación a $3.1M]',
        timestamp: '19/09/2026 14:15',
      },
      {
        title: 'Delta Logística · Optimización de ruteo',
        detail: 'Etapa: Diagnóstico técnico ($2.5M) · Reunión realizada',
        timestamp: '17/09/2026 16:00',
      },
    ],
  },
  {
    id: 'gmail',
    name: 'Gmail Workspace',
    type: 'Google Mail Mock',
    iconName: 'Mail',
    status: 'connected',
    lastSync: 'Hace 2 minutos',
    itemCount: 38,
    description: '38 conversaciones analizadas en los últimos 15 días con clientes clave',
    simulatedRecords: [
      {
        title: 'Marcelo Gómez (Norte Industrial)',
        detail: '"Revisando la propuesta técnica con el directorio financiero..."',
        timestamp: '09/09/2026 15:20 (Hace 12 días)',
      },
      {
        title: 'Laura Méndez (Grupo Atlas)',
        detail: '"Coordinemos el martes o miércoles para cerrar los términos finales..."',
        timestamp: '18/09/2026 10:12',
      },
      {
        title: 'Santiago Silva (NovaTech)',
        detail: '"Aprobamos internamente ampliar el alcance a 3 sucursales ($3.1M)..."',
        timestamp: '19/09/2026 18:04',
      },
    ],
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    type: 'Agenda Corporativa Mock',
    iconName: 'Calendar',
    status: 'connected',
    lastSync: 'Hace 1 minuto',
    itemCount: 12,
    description: '4 reuniones comerciales programadas para esta semana',
    simulatedRecords: [
      {
        title: 'Reunión Comercial Lumina Retail',
        detail: 'Miércoles 23/09 · 11:00 - 11:45 hs (Google Meet)',
        timestamp: 'Mañana',
      },
      {
        title: 'Reunión Tentativa Grupo Atlas',
        detail: 'Jueves 24/09 · 15:00 hs (Pendiente de confirmación y envío de link)',
        timestamp: 'En 2 días',
      },
      {
        title: 'Kick-off Andes Foods',
        detail: 'Viernes 25/09 · 10:30 hs (Presencial / Sede Central)',
        timestamp: 'En 3 días',
      },
    ],
  },
  {
    id: 'drive',
    name: 'Google Drive',
    type: 'Documentos & Minutas Mock',
    iconName: 'FileText',
    status: 'connected',
    lastSync: 'Hace 6 minutos',
    itemCount: 24,
    description: '24 propuestas, contratos y minutas indexadas con análisis semántico',
    simulatedRecords: [
      {
        title: 'Propuesta_Tecnica_NorteIndustrial_v2.pdf',
        detail: 'Drive/Comercial/2026/Norte · Modificado 08/09 · Visualizado hace 11 días',
        timestamp: '08/09/2026',
      },
      {
        title: 'Contrato_Marco_Servicios_Atlas_v3.docx',
        detail: 'Drive/Legales/Contratos/Atlas · 2 comentarios sin resolver',
        timestamp: '18/09/2026',
      },
      {
        title: 'Minuta_Relevamiento_DeltaLogistica.docx',
        detail: 'Drive/Operaciones/Relevamientos · Transcripción de audio validada',
        timestamp: '17/09/2026',
      },
    ],
  },
];
