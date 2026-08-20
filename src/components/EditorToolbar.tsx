import React from 'react';
import { ViewportMode, PageTheme } from '../types';
import { THEME_PRESETS } from '../defaultConfig';
import {
  Monitor,
  Tablet,
  Smartphone,
  Edit,
  Eye,
  Undo2,
  Redo2,
  RotateCcw,
  Download,
  Sliders,
  Palette,
  Sparkles,
} from 'lucide-react';

interface EditorToolbarProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  viewport: ViewportMode;
  onChangeViewport: (mode: ViewportMode) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onOpenInspector: () => void;
  onOpenExport: () => void;
  onSelectThemePreset: (preset: Partial<PageTheme>) => void;
  currentPrimaryColor: string;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  isEditMode,
  onToggleEditMode,
  viewport,
  onChangeViewport,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
  onOpenInspector,
  onOpenExport,
  onSelectThemePreset,
  currentPrimaryColor,
}) => {
  return (
    <header
      className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between text-slate-200 z-40 select-none shadow-sm"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Left: Branding & Edit/Preview Toggle */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Sparkles size={16} />
          </div>
          <div className="hidden md:block">
            <div className="font-bold text-sm text-white tracking-tight leading-none">Welcome Page</div>
            <div className="text-[11px] text-slate-400 leading-none mt-0.5">Live Editor & Builder</div>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-800 hidden sm:block" />

        {/* Edit Mode / Preview Mode Switch */}
        <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={onToggleEditMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              isEditMode
                ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Edit size={13} />
            <span>Edit Mode</span>
          </button>
          <button
            onClick={onToggleEditMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              !isEditMode
                ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye size={13} />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Center: Device Viewports & Undo/Redo */}
      <div className="flex items-center gap-2">
        {/* Device Viewport switchers */}
        <div className="hidden sm:flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => onChangeViewport('desktop')}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              viewport === 'desktop'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop View"
          >
            <Monitor size={15} />
          </button>
          <button
            onClick={() => onChangeViewport('tablet')}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              viewport === 'tablet'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet size={15} />
          </button>
          <button
            onClick={() => onChangeViewport('mobile')}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              viewport === 'mobile'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone size={15} />
          </button>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={15} />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={15} />
          </button>
        </div>
      </div>

      {/* Right: Quick Themes, Inspector, Export */}
      <div className="flex items-center gap-2">
        {/* Quick Theme Presets Dropdown */}
        <div className="relative group/theme hidden lg:block">
          <button
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-xs text-slate-200 transition-colors"
            title="Quick theme switcher"
          >
            <div
              className="w-3.5 h-3.5 rounded-full shadow-xs"
              style={{ backgroundColor: currentPrimaryColor }}
            />
            <Palette size={13} className="text-slate-400" />
            <span>Theme</span>
          </button>
          <div className="absolute right-0 top-full mt-1.5 hidden group-hover/theme:block p-2 bg-slate-900 border border-slate-800 rounded-xl shadow-xl w-52 space-y-1 z-50">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
              Preset Themes
            </div>
            {THEME_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => onSelectThemePreset(p.theme)}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: p.theme.primaryColor }}
                />
                <span className="truncate">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
          title="Reset to Original Welcome Page Template"
        >
          <RotateCcw size={15} />
        </button>

        {/* Customizer Inspector button */}
        <button
          onClick={onOpenInspector}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 text-white rounded-lg text-xs font-medium transition-colors"
        >
          <Sliders size={14} className="text-indigo-400" />
          <span className="hidden sm:inline">Customize</span>
        </button>

        {/* Export HTML Button */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all hover:shadow-indigo-500/25"
        >
          <Download size={14} />
          <span>Export HTML</span>
        </button>
      </div>
    </header>
  );
};
