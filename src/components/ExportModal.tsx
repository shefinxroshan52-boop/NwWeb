import React, { useState } from 'react';
import { PageConfig } from '../types';
import { generateStandaloneHtml } from '../utils/exportHtml';
import { X, Copy, Check, Download, Code, FileJson, Sparkles } from 'lucide-react';

interface ExportModalProps {
  config: PageConfig;
  isOpen: boolean;
  onClose: () => void;
  onImportConfig: (imported: PageConfig) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  config,
  isOpen,
  onClose,
  onImportConfig,
}) => {
  const [tab, setTab] = useState<'html' | 'json' | 'import'>('html');
  const [copied, setCopied] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  if (!isOpen) return null;

  const htmlCode = generateStandaloneHtml(config);
  const jsonCode = JSON.stringify(config, null, 2);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonCode], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'welcome-page-config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePerformImport = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed.header || !parsed.hero || !parsed.theme) {
        throw new Error('Invalid configuration format: Missing header/hero/theme sections.');
      }
      onImportConfig(parsed);
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setImportError(err.message);
      } else {
        setImportError('Failed to parse JSON. Please verify the syntax.');
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col text-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Code size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Export & Standalone Code</h3>
              <p className="text-xs text-slate-400">
                Get the clean, ready-to-deploy HTML file with all your custom text and styles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-900/60 text-xs font-medium gap-2">
          <button
            onClick={() => setTab('html')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              tab === 'html'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code size={14} /> Standalone HTML / CSS
          </button>
          <button
            onClick={() => setTab('json')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              tab === 'json'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileJson size={14} /> Config JSON
          </button>
          <button
            onClick={() => setTab('import')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              tab === 'import'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles size={14} /> Import Backup
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'html' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Self-contained HTML5 file with embedded responsive CSS styles.</span>
                <span className="font-mono text-slate-500">{htmlCode.length} characters</span>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto max-h-[380px] leading-relaxed select-all">
                {htmlCode}
              </pre>
            </div>
          )}

          {tab === 'json' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                JSON schema representing the exact structured state of your customized welcome page.
              </p>
              <pre className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl text-xs font-mono text-indigo-300 overflow-x-auto max-h-[380px] leading-relaxed select-all">
                {jsonCode}
              </pre>
            </div>
          )}

          {tab === 'import' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Paste a previously exported config JSON below to restore all page settings:
              </p>
              <textarea
                value={importJsonText}
                onChange={(e) => {
                  setImportJsonText(e.target.value);
                  setImportError('');
                }}
                rows={10}
                placeholder="Paste your JSON configuration here..."
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              {importError && (
                <p className="text-xs text-red-400 bg-red-950/40 p-2.5 rounded-lg border border-red-800/50">
                  {importError}
                </p>
              )}
              <button
                onClick={handlePerformImport}
                disabled={!importJsonText.trim()}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Apply Imported Configuration
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {tab !== 'import' && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/50">
            <button
              onClick={() => handleCopy(tab === 'html' ? htmlCode : jsonCode)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium rounded-lg transition-colors border border-slate-700"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copied ? 'Copied to Clipboard!' : 'Copy Code'}
            </button>

            <button
              onClick={tab === 'html' ? handleDownloadHtml : handleDownloadJson}
              className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all hover:shadow-indigo-500/25"
            >
              <Download size={14} />
              {tab === 'html' ? 'Download index.html' : 'Download config.json'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
