import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PageConfig, ViewportMode, ActiveTab, PageTheme } from './types';
import { DEFAULT_PAGE_CONFIG } from './defaultConfig';
import { EditorToolbar } from './components/EditorToolbar';
import { LivePageView } from './components/LivePageView';
import { InspectorDrawer } from './components/InspectorDrawer';
import { ExportModal } from './components/ExportModal';

const STORAGE_KEY = 'welcome_page_builder_config_v1';

export default function App() {
  // Load initial config from local storage if available
  const [config, setConfig] = useState<PageConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_PAGE_CONFIG;
  });

  // History stack for Undo / Redo
  const [history, setHistory] = useState<PageConfig[]>([config]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const isHistoryUpdate = useRef<boolean>(false);

  // Editor states
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [inspectorTab, setInspectorTab] = useState<ActiveTab>('content');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Push new state to history & local storage
  const updateConfig = useCallback(
    (updater: (prev: PageConfig) => PageConfig) => {
      setConfig((prev) => {
        const next = updater(prev);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }

        // Push to history unless doing an undo/redo
        if (!isHistoryUpdate.current) {
          setHistory((prevHist) => {
            const upToCurrent = prevHist.slice(0, historyIndex + 1);
            return [...upToCurrent, next];
          });
          setHistoryIndex((prevIdx) => prevIdx + 1);
        }
        return next;
      });
    },
    [historyIndex]
  );

  // Undo / Redo handlers
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      isHistoryUpdate.current = true;
      const targetIndex = historyIndex - 1;
      const targetConfig = history[targetIndex];
      setHistoryIndex(targetIndex);
      setConfig(targetConfig);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(targetConfig));
      isHistoryUpdate.current = false;
      showToast('Undo applied');
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isHistoryUpdate.current = true;
      const targetIndex = historyIndex + 1;
      const targetConfig = history[targetIndex];
      setHistoryIndex(targetIndex);
      setConfig(targetConfig);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(targetConfig));
      isHistoryUpdate.current = false;
      showToast('Redo applied');
    }
  }, [history, historyIndex]);

  // Reset to original template
  const handleReset = () => {
    if (window.confirm('Reset all changes back to the original Welcome Page template?')) {
      updateConfig(() => DEFAULT_PAGE_CONFIG);
      showToast('Reset to original template');
    }
  };

  // Quick theme preset apply
  const handleSelectThemePreset = (presetTheme: Partial<PageTheme>) => {
    updateConfig((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...presetTheme },
    }));
    showToast('Theme palette updated');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        setIsExportOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  const openSectionInInspector = (tab: ActiveTab = 'content') => {
    setInspectorTab(tab);
    setIsInspectorOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans select-none">
      {/* Top Main Toolbar */}
      <EditorToolbar
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode((prev) => !prev)}
        viewport={viewport}
        onChangeViewport={setViewport}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        onOpenInspector={() => setIsInspectorOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onSelectThemePreset={handleSelectThemePreset}
        currentPrimaryColor={config.theme.primaryColor}
      />

      {/* Main Workspace Canvas */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Page Container Area */}
        <div className="flex-1 overflow-y-auto bg-slate-900/90 flex flex-col items-center p-0 sm:p-4 transition-all">
          <div
            className={`w-full transition-all duration-300 shadow-2xl overflow-x-hidden ${
              viewport === 'desktop'
                ? 'max-w-full min-h-full sm:rounded-none'
                : viewport === 'tablet'
                ? 'max-w-[768px] min-h-[900px] my-4 rounded-2xl border-8 border-slate-800 bg-white ring-1 ring-slate-700/50'
                : 'max-w-[380px] min-h-[780px] my-4 rounded-3xl border-8 border-slate-800 bg-white ring-1 ring-slate-700/50'
            }`}
          >
            {/* Live Rendered Landing Page */}
            <LivePageView
              config={config}
              isEditMode={isEditMode}
              onUpdateConfig={updateConfig}
              onOpenSectionSettings={() => openSectionInInspector('content')}
            />
          </div>
        </div>

        {/* Customizer Inspector Drawer */}
        <InspectorDrawer
          config={config}
          isOpen={isInspectorOpen}
          onClose={() => setIsInspectorOpen(false)}
          onUpdateConfig={updateConfig}
          initialTab={inspectorTab}
        />
      </div>

      {/* Standalone HTML Export Modal */}
      <ExportModal
        config={config}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        onImportConfig={(imported) => {
          updateConfig(() => imported);
          showToast('Configuration successfully restored!');
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
