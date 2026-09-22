export interface DiagnosticFinding {
  id: string;
  pillar: 'PERSONAS' | 'ESTRUCTURA' | 'PROCESOS' | 'RESULTADOS';
  title: string;
  severity: 'critical' | 'moderate' | 'opportunity';
  impactDescription: string;
  evidence: {
    type: 'interview' | 'document' | 'metric' | 'erp';
    label: string;
    description: string;
    sourceRef: string;
  }[];
  recommendation: string;
}

export interface DiagnosticMissingData {
  id: string;
  pillar: 'PERSONAS' | 'ESTRUCTURA' | 'PROCESOS' | 'RESULTADOS';
  title: string;
  whyNeeded: string;
  impactIfResolved: string;
}

export interface DiagnosticData {
  pymeName: string;
  industry: string;
  employees: number;
  overallHealthScore: number;
  findingsCount: number;
  missingDataCount: number;
  priorityAreasCount: number;
  findings: DiagnosticFinding[];
  missingData: DiagnosticMissingData[];
  priorityAreas: {
    area: string;
    pillar: string;
    summary: string;
    expectedROI: string;
  }[];
}

export const DIAGNOSTIC_MOCK_DATA: DiagnosticData = {
  pymeName: 'Industrias Metalmecánicas Austral S.A.',
  industry: 'Manufactura y Equipamiento B2B',
  employees: 48,
  overallHealthScore: 68,
  findingsCount: 5,
  missingDataCount: 3,
  priorityAreasCount: 2,
  priorityAreas: [
    {
      area: 'Estandarización del Embudo Comercial & CRM',
      pillar: 'PROCESOS',
      summary: 'Eliminar fugas de oportunidades y retrasos de 12+ días en cotizaciones de alto valor.',
      expectedROI: '+22% conversión de propuestas y visibilidad directiva semanal',
    },
    {
      area: 'Descompresión Operativa en Mandos Medios',
      pillar: 'ESTRUCTURA',
      summary: 'Reducir el 70% de carga reactiva y manual en jefes de planta y operaciones.',
      expectedROI: 'Recuperación de 15 hs/semana por jefe dedicadas a planificación',
    },
  ],
  missingData: [
    {
      id: 'miss-1',
      pillar: 'RESULTADOS',
      title: 'Desglose de costo por hora máquina real en línea 2',
      whyNeeded: 'El sistema contable consolida costos generales sin discriminar paradas no planificadas.',
      impactIfResolved: 'Permitirá calcular el margen neto real por lote cotizado.',
    },
    {
      id: 'miss-2',
      pillar: 'PERSONAS',
      title: 'Matriz de polivalencia técnica del turno noche',
      whyNeeded: 'Se detecta cuello de botella en armado cuando falta el técnico principal.',
      impactIfResolved: 'Permitirá armar plan de capacitación cruzada de 3 semanas.',
    },
    {
      id: 'miss-3',
      pillar: 'PROCESOS',
      title: 'Registro de motivos de cotizaciones perdidas Q1-Q2',
      whyNeeded: 'No hay registro unificado de por qué no cerraron 28 propuestas anteriores.',
      impactIfResolved: 'Ajuste de política de precios y propuesta de valor.',
    },
  ],
  findings: [
    {
      id: 'find-1',
      pillar: 'PROCESOS',
      title: 'Seguimiento comercial no estandarizado y desfasajes en CRM',
      severity: 'critical',
      impactDescription: 'El 60% de las oportunidades mayores a $2M quedan sin contacto formal por más de 10 días tras el envío de propuesta.',
      evidence: [
        {
          type: 'interview',
          label: 'Entrevistas a 3 ejecutivos comerciales',
          description: 'Los ejecutivos llevan notas paralelas en hojas de cálculo y WhatsApp personal sin registrar avances en el CRM común.',
          sourceRef: 'Entrevista #03 y #05 · 15/09/2026',
        },
        {
          type: 'metric',
          label: 'Auditoría de CRM (HubSpot)',
          description: '14 oportunidades activas, 8 sin fecha de próximo paso programada.',
          sourceRef: 'Log de Actividad CRM Q3',
        },
        {
          type: 'document',
          label: 'Procedimiento Comercial Vigente',
          description: 'Manual de ventas desactualizado desde 2021, sin SLA de respuesta a cotizaciones.',
          sourceRef: 'Drive/Calidad/PROC-COM-01.pdf',
        },
      ],
      recommendation: 'Implementar flujo supervisado de alertas automáticas y borradores contextuales para seguimiento a las 72hs.',
    },
    {
      id: 'find-2',
      pillar: 'ESTRUCTURA',
      title: 'Sobrecarga operativa y reactiva en mandos medios',
      severity: 'critical',
      impactDescription: 'Jefes de producción y logística dedican el 70% de su jornada a resolver consultas rutinarias por chat y llamadas.',
      evidence: [
        {
          type: 'interview',
          label: 'Entrevistas a Jefatura de Planta',
          description: '"Paso 4 horas al día respondiendo qué lote sale primero y buscando remitos en carpetas compartidas."',
          sourceRef: 'Entrevista #02 · Ing. Roberto V.',
        },
        {
          type: 'document',
          label: 'Organigrama Operativo',
          description: 'Falta nivel intermedio de coordinación; todo el flujo escala directamente al Jefe de Planta.',
          sourceRef: 'Drive/RRHH/Org_Austral_2026.pdf',
        },
      ],
      recommendation: 'Diseñar tablero centralizado con copiloto operativo que responda estado de órdenes sin interrumpir al jefe.',
    },
    {
      id: 'find-3',
      pillar: 'PERSONAS',
      title: 'Falta de claridad en roles y traspaso post-venta',
      severity: 'moderate',
      impactDescription: 'Confusión entre Comercial y Servicio Técnico sobre quién da seguimiento al cliente durante el primer mes de garantía.',
      evidence: [
        {
          type: 'interview',
          label: 'Entrevistas de Calidad y Clientes',
          description: '2 clientes corporativos reportaron retrasos en atención porque el reclamo quedó en la casilla del vendedor.',
          sourceRef: 'Registro de Incidentes de Clientes Agosto 2026',
        },
        {
          type: 'document',
          label: 'Definición de Perfiles de Puesto',
          description: 'No existe matriz RACI para la entrega de maquinaria instalada.',
          sourceRef: 'Drive/RRHH/Perfiles_2024.docx',
        },
      ],
      recommendation: 'Automatizar ticket de traspaso comercial-técnico con verificación de entrega.',
    },
    {
      id: 'find-4',
      pillar: 'RESULTADOS',
      title: 'Dispersión de margen bruto entre líneas de producto',
      severity: 'moderate',
      impactDescription: 'Variación no presupuestada de 14 puntos entre la cotización estimada y el costo real ejecutado en taller.',
      evidence: [
        {
          type: 'erp',
          label: 'Cruce ERP vs. Contabilidad de Costos',
          description: 'Los insumos importados sufrieron reajustes de flete no recalculados en la lista de precios base.',
          sourceRef: 'Reporte ERP Tango / Módulo Costos Q2',
        },
        {
          type: 'document',
          label: 'Planilla de Cotizador Estándar',
          description: 'Fórmula de amortización indirecta desactualizada.',
          sourceRef: 'Drive/Finanzas/Cotizador_Oficial_v5.xlsx',
        },
      ],
      recommendation: 'Conectar cálculo dinámico de costo de reposición al módulo de generación de cotizaciones.',
    },
    {
      id: 'find-5',
      pillar: 'PROCESOS',
      title: 'Demoras en aprobación de órdenes de compra mayores a $500k',
      severity: 'opportunity',
      impactDescription: 'Tiempo promedio de autorización: 6.4 días hábiles, generando cuellos de botella en insumos críticos.',
      evidence: [
        {
          type: 'metric',
          label: 'Registro de Tiempos de Firma en Compras',
          description: 'Las solicitudes esperan en bandeja de correo sin recordatorio.',
          sourceRef: 'Drive/Administracion/Compras_2026.xlsx',
        },
      ],
      recommendation: 'Implementar aprobación ágil con resumen ejecutivo directo vía interfaz móvil.',
    },
  ],
};
