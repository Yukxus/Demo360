import { useState, useEffect } from 'react';
import type { ActiveModule, AppViewMode, ToastMessage } from './lib/types';
import { EntryScreen } from './components/entry/EntryScreen';
import { Header } from './components/workspace/Header';
import { Sidebar } from './components/workspace/Sidebar';
import { MobileNav } from './components/workspace/MobileNav';
import { HomeOverview } from './components/home/HomeOverview';
import { CommercialModule } from './components/commercial/CommercialModule';
import { DiagnosticModule } from './components/diagnostic/DiagnosticModule';
import { OperationsModule } from './components/operations/OperationsModule';
import { AdministrationModule } from './components/administration/AdministrationModule';
import { HowItWorksView } from './components/flow/HowItWorksView';
import { ConnectedSourcesModal } from './components/sources/ConnectedSourcesModal';
import { EvidenceDrawer } from './components/evidence/EvidenceDrawer';
import { SupervisedActionModal } from './components/actions/SupervisedActionModal';
import { ClosureModal } from './components/closure/ClosureModal';
import { ToastContainer } from './components/ui/ToastContainer';
import type { CommercialClient, ProposedAction } from './data/commercial';

export function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [activeModule, setActiveModule] = useState<ActiveModule>('inicio');
  const [viewMode, setViewMode] = useState<AppViewMode>('experience');
  
  // Modals & Drawers state
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);
  const [isClosureModalOpen, setIsClosureModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Evidence Drawer state
  const [evidenceDrawerState, setEvidenceDrawerState] = useState<{
    isOpen: boolean;
    client: CommercialClient | null;
  }>({
    isOpen: false,
    client: null,
  });

  // Supervised Action Modal state
  const [actionModalState, setActionModalState] = useState<{
    isOpen: boolean;
    client: CommercialClient | null;
    action: ProposedAction | null;
  }>({
    isOpen: false,
    client: null,
    action: null,
  });

  // Approved actions list (reactive state)
  const [approvedActionIds, setApprovedActionIds] = useState<string[]>([]);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      title,
      message,
      timestamp: Date.now(),
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut listener for ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSourcesModalOpen(false);
        setIsClosureModalOpen(false);
        setIsMobileNavOpen(false);
        setEvidenceDrawerState((prev) => ({ ...prev, isOpen: false }));
        setActionModalState((prev) => ({ ...prev, isOpen: false }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleEnterDemo = () => {
    setHasEntered(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCommercialMeeting = () => {
    setActiveModule('comercial');
    setViewMode('experience');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEvidence = (client: CommercialClient) => {
    setEvidenceDrawerState({
      isOpen: true,
      client,
    });
  };

  const handleOpenActionModal = (client: CommercialClient, action: ProposedAction) => {
    setActionModalState({
      isOpen: true,
      client,
      action,
    });
  };

  const handleApproveAction = (actionId: string, _updatedData?: any) => {
    setApprovedActionIds((prev) => [...prev, actionId]);
    
    const client = actionModalState.client;
    const action = actionModalState.action;
    
    const actionTitle = action?.type === 'email' 
      ? 'Borrador de Correo Creado' 
      : action?.type === 'meeting' 
      ? 'Reunión Comercial Agendada' 
      : 'CRM Actualizado';

    addToast(
      'success',
      actionTitle,
      `Acción aprobada para ${client?.name || 'el cliente'}. ${action?.successMessage || ''}`
    );
  };

  const handleResetDemo = () => {
    setApprovedActionIds([]);
    setActiveModule('inicio');
    setViewMode('experience');
    setEvidenceDrawerState({ isOpen: false, client: null });
    setActionModalState({ isOpen: false, client: null, action: null });
    addToast('info', 'Simulación Reiniciada', 'Se restablecieron todos los datos y estados locales.');
  };

  if (!hasEntered) {
    return <EntryScreen onEnter={handleEnterDemo} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0507] text-[#FAF5EF] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#F97316]/30 selection:text-white">
      {/* Top Header */}
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
        onOpenClosureModal={() => setIsClosureModalOpen(true)}
        onToggleMobileNav={() => setIsMobileNavOpen(true)}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Left Sidebar (Desktop) */}
        <Sidebar
          activeModule={activeModule}
          onSelectModule={(mod) => {
            setActiveModule(mod);
            setViewMode('experience');
          }}
          onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
          onResetDemo={handleResetDemo}
          approvedActionsCount={approvedActionIds.length}
        />

        {/* Center Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {viewMode === 'how-it-works' ? (
            <HowItWorksView />
          ) : (
            <>
              {activeModule === 'inicio' && (
                <HomeOverview
                  onSelectModule={setActiveModule}
                  onStartCommercialMeeting={handleStartCommercialMeeting}
                  onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
                />
              )}

              {activeModule === 'comercial' && (
                <CommercialModule
                  onOpenEvidence={handleOpenEvidence}
                  onOpenActionModal={handleOpenActionModal}
                  approvedActionIds={approvedActionIds}
                />
              )}

              {activeModule === 'diagnostico' && (
                <DiagnosticModule />
              )}

              {activeModule === 'operaciones' && (
                <OperationsModule
                  onTriggerNotification={(title, msg) => addToast('info', title, msg)}
                />
              )}

              {activeModule === 'administracion' && (
                <AdministrationModule
                  onTriggerNotification={(title, msg) => addToast('info', title, msg)}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Navigation Drawer & Bottom Bar */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        activeModule={activeModule}
        onSelectModule={(mod) => {
          setActiveModule(mod);
          setViewMode('experience');
        }}
        onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
        onOpenClosureModal={() => setIsClosureModalOpen(true)}
        onResetDemo={handleResetDemo}
      />

      {/* Connected Sources Modal */}
      <ConnectedSourcesModal
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
      />

      {/* Evidence Drawer */}
      <EvidenceDrawer
        isOpen={evidenceDrawerState.isOpen}
        onClose={() => setEvidenceDrawerState({ isOpen: false, client: null })}
        entityName={evidenceDrawerState.client?.name || ''}
        keyInsight={evidenceDrawerState.client?.keyInsight}
        summary={evidenceDrawerState.client?.summary}
        evidences={evidenceDrawerState.client?.evidences || []}
        actionButtonText={evidenceDrawerState.client?.proposedActions[0]?.buttonLabel}
        onTakeAction={() => {
          if (evidenceDrawerState.client && evidenceDrawerState.client.proposedActions[0]) {
            handleOpenActionModal(
              evidenceDrawerState.client,
              evidenceDrawerState.client.proposedActions[0]
            );
          }
        }}
      />

      {/* Supervised Action Modal */}
      <SupervisedActionModal
        isOpen={actionModalState.isOpen}
        onClose={() => setActionModalState({ isOpen: false, client: null, action: null })}
        action={actionModalState.action}
        clientName={actionModalState.client?.name || ''}
        onApprove={handleApproveAction}
      />

      {/* Closure / Conclusion Screen Modal */}
      <ClosureModal
        isOpen={isClosureModalOpen}
        onClose={() => setIsClosureModalOpen(false)}
        onRestartDemo={() => {
          handleResetDemo();
          setHasEntered(false);
        }}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
