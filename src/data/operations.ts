export interface OperationProcess {
  id: string;
  name: string;
  status: 'delayed' | 'at_risk' | 'on_track';
  statusLabel: string;
  leadTime: string;
  delayHours: number;
  responsible: string;
  responsibleRole: string;
  bottleneck: string;
  suggestedAction: string;
  evidence: string;
}

export const OPERATIONS_MOCK_DATA: OperationProcess[] = [
  {
    id: 'op-1',
    name: 'Despacho Línea Austral · Pedido #4820 (Norte Industrial)',
    status: 'delayed',
    statusLabel: 'Demora crítica (+48 hs)',
    leadTime: '6 días (esperado: 4)',
    delayHours: 48,
    responsible: 'Ing. Roberto Valenzuela',
    responsibleRole: 'Jefe de Planta y Despachos',
    bottleneck: 'Falta validación de remito de entrega por parte de control de calidad.',
    suggestedAction: 'Notificar automáticamente a Calidad con pre-inspección digital para liberar despacho hoy antes de las 16:00 hs.',
    evidence: 'ERP Módulo Despacho: remito bloqueado en estado "Esperando firma técnica" desde el lunes 08:30 hs.',
  },
  {
    id: 'op-2',
    name: 'Abastecimiento de Rodamientos Especiales · Proveedor SKF',
    status: 'at_risk',
    statusLabel: 'En riesgo de quiebre',
    leadTime: 'Stock para 3 días',
    delayHours: 24,
    responsible: 'Mariana Costa',
    responsibleRole: 'Responsable de Compras Técnicas',
    bottleneck: 'Orden de compra enviada pero sin confirmación de fecha de entrega del flete marítimo.',
    suggestedAction: 'Disparar consulta de tracking automática al despachante de aduana.',
    evidence: 'Gmail: Proveedor envió factura comercial sin adjuntar número de guía de seguimiento.',
  },
  {
    id: 'op-3',
    name: 'Mantenimiento Preventivo Torno CNC #4',
    status: 'delayed',
    statusLabel: 'Vencido hace 3 días',
    leadTime: 'Programado: 18/09',
    delayHours: 72,
    responsible: 'Esteban Morales',
    responsibleRole: 'Líder de Mantenimiento',
    bottleneck: 'Reprogramado dos veces por sobrecarga de turnos de mecanizado.',
    suggestedAction: 'Bloquear ventana de 3 horas el sábado a la mañana para calibración obligatoria.',
    evidence: 'Planilla de Mantenimiento en Drive: Horas de husillo superaron el límite de alerta en 14%.',
  },
  {
    id: 'op-4',
    name: 'Línea de Ensamble B · Pedidos Mayoristas Andes Foods',
    status: 'on_track',
    statusLabel: 'En tiempo y forma',
    leadTime: 'Avance: 85%',
    delayHours: 0,
    responsible: 'Lucía Benítez',
    responsibleRole: 'Supervisora de Armado',
    bottleneck: 'Ninguno registrado.',
    suggestedAction: 'Continuar con el ritmo planificado; entrega prevista para el viernes 25/09.',
    evidence: 'Checklist de línea completado al día con cero rechazos técnicos.',
  },
];
