export interface AdminTask {
  id: string;
  title: string;
  category: 'Impuestos' | 'Facturación' | 'Contratos' | 'Sueldos' | 'Bancos';
  urgency: 'high' | 'medium' | 'low';
  dueDate: string;
  dueStatus: 'today' | 'tomorrow' | 'this_week' | 'overdue';
  responsible: string;
  responsibleRole: string;
  amount?: string;
  description: string;
  automationPotential: string;
  suggestedAction: string;
  evidenceRef: string;
}

export const ADMIN_MOCK_DATA: AdminTask[] = [
  {
    id: 'adm-1',
    title: 'Presentación DDJJ IVA y Libro Sueldos Digital (AFIP)',
    category: 'Impuestos',
    urgency: 'high',
    dueDate: '23/09/2026 (Mañana 18:00 hs)',
    dueStatus: 'tomorrow',
    responsible: 'Cra. Gabriela Rossi',
    responsibleRole: 'Responsable Contable & Impuestos',
    description: 'Falta conciliar 4 facturas de proveedores del interior con retenciones de IIBB aplicadas.',
    automationPotential: '90% automatizable · Detección y cruce automático de comprobantes AFIP vs ERP.',
    suggestedAction: 'Generar lote de pre-liquidación con las facturas ya conciliadas y alertar sobre las 4 inconsistencias.',
    evidenceRef: 'Drive/Contabilidad/Liquidaciones_Septiembre_2026.xlsx',
  },
  {
    id: 'adm-2',
    title: 'Emisión y envío de Facturas Proforma · Grupo Atlas & NovaTech',
    category: 'Facturación',
    urgency: 'high',
    dueDate: 'Hoy antes del cierre bancario',
    dueStatus: 'today',
    responsible: 'Martín Duarte',
    responsibleRole: 'Administración de Ventas',
    amount: '$9.9M ARS total',
    description: 'Anticipos correspondientes al 30% pactados en la firma preliminar de acuerdos.',
    automationPotential: '95% automatizable · Generación automática de proforma tras aprobación en CRM.',
    suggestedAction: 'Emitir borrador de proforma y disparar solicitud de CAE automática a AFIP.',
    evidenceRef: 'CRM Comercial: Acuerdos en estado pre-facturación.',
  },
  {
    id: 'adm-3',
    title: 'Renovación Póliza de Seguro de Caución y ART Línea Planta',
    category: 'Contratos',
    urgency: 'medium',
    dueDate: '28/09/2026 (En 6 días)',
    dueStatus: 'this_week',
    responsible: 'Cra. Gabriela Rossi',
    responsibleRole: 'Administración General',
    amount: '$420.000 ARS',
    description: 'Envío de nómina actualizada de personal de planta a la compañía de seguros.',
    automationPotential: '80% automatizable · Exportación directa de nómina activa y envío vía API broker.',
    suggestedAction: 'Preparar planilla de nómina del mes con altas y bajas validadas por RRHH.',
    evidenceRef: 'Gmail: Notificación de la aseguradora La Segunda con vencimiento de certificado.',
  },
  {
    id: 'adm-4',
    title: 'Conciliación Bancaria Cuenta Corriente Santander & Galicia',
    category: 'Bancos',
    urgency: 'low',
    dueDate: '25/09/2026',
    dueStatus: 'this_week',
    responsible: 'Martín Duarte',
    responsibleRole: 'Tesorería',
    description: 'Conciliación semanal de débitos automáticos y cobros con cheques electrónicos (Echeqs).',
    automationPotential: '85% automatizable · Matching de extractos bancarios en formato CBU/COELSA.',
    suggestedAction: 'Ejecutar robot de matching bancario que concilia el 92% de los movimientos estándar.',
    evidenceRef: 'Drive/Tesoreria/Extractos_Semana38.csv',
  },
];
