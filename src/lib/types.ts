export type ActiveModule = 'inicio' | 'comercial' | 'diagnostico' | 'operaciones' | 'administracion';

export type AppViewMode = 'experience' | 'how-it-works';

export interface ActionHistoryItem {
  id: string;
  actionId: string;
  clientId?: string;
  clientName: string;
  actionType: 'email' | 'meeting' | 'crm_update';
  title: string;
  approvedAt: string;
  summary: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: number;
}
