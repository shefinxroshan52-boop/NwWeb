import React, { useState } from 'react';
import { PageConfig, ActiveTab } from '../types';
import { THEME_PRESETS, FONT_OPTIONS } from '../defaultConfig';
import {
  X,
  Type,
  Palette,
  LayoutGrid,
  Layers,
  Plus,
  Trash2,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Eye,
  Sliders,
} from 'lucide-react';

interface InspectorDrawerProps {
  config: PageConfig;
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig: (updater: (prev: PageConfig) => PageConfig) => void;
  initialTab?: ActiveTab;
}

export const InspectorDrawer: React.FC<InspectorDrawerProps> = ({
  config,
  isOpen,
  onClose,
  onUpdateConfig,
  initialTab = 'content',
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);
  const [openAccordion, setOpenAccordion] = useState<string>('hero');

  if (!isOpen) return null;

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? '' : key));
  };

  const { theme, header, hero, features, about, testimonials, ctaBanner, faq, footer } = config;

  return (
    <aside
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-slate-200 animate-in slide-in-from-right duration-200"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Sliders className="text-indigo-400" size={18} />
          <h2 className="font-semibold text-base text-white tracking-wide">Page Inspector & Editor</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Close panel"
        >
          <X size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/90 text-xs font-medium px-2">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'content'
              ? 'border-indigo-500 text-indigo-400 font-semibold bg-indigo-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Type size={14} /> Content
        </button>
        <button
          onClick={() => setActiveTab('theme')}
          className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'theme'
              ? 'border-indigo-500 text-indigo-400 font-semibold bg-indigo-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette size={14} /> Theme & Style
        </button>
        <button
          onClick={() => setActiveTab('sections')}
          className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'sections'
              ? 'border-indigo-500 text-indigo-400 font-semibold bg-indigo-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers size={14} /> Sections
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
        {/* ================= CONTENT TAB ================= */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {/* Header Accordion */}
            <div className="border border-slate-800 rounded-xl bg-slate-850 overflow-hidden">
              <button
                onClick={() => toggleAccordion('header')}
                className="w-full flex items-center justify-between p-3.5 bg-slate-800/60 hover:bg-slate-800 transition-colors text-left font-medium"
              >
                <span className="flex items-center gap-2">
                  <LayoutGrid size={15} className="text-indigo-400" /> Header & Navigation
                </span>
                {openAccordion === 'header' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {openAccordion === 'header' && (
                <div className="p-4 space-y-4 border-t border-slate-800/80 bg-slate-900/50">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Brand / Logo Text
                    </label>
                    <input
                      type="text"
                      value={header.brandName}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          header: { ...prev.header, brandName: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-300">Sticky Header</span>
                    <input
                      type="checkbox"
                      checked={header.isSticky}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          header: { ...prev.header, isSticky: e.target.checked },
                        }))
                      }
                      className="rounded accent-indigo-500 w-4 h-4"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Navigation Links
                      </label>
                      <button
                        onClick={() => {
                          const newId = Date.now().toString();
                          onUpdateConfig((prev) => ({
                            ...prev,
                            header: {
                              ...prev.header,
                              navLinks: [...prev.header.navLinks, { id: newId, label: 'New Link', url: '#section' }],
                            },
                          }));
                        }}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <Plus size={12} /> Add
                      </button>
                    </div>

                    <div className="space-y-2">
                      {header.navLinks.map((link) => (
                        <div key={link.id} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) =>
                              onUpdateConfig((prev) => ({
                                ...prev,
                                header: {
                                  ...prev.header,
                                  navLinks: prev.header.navLinks.map((l) =>
                                    l.id === link.id ? { ...l, label: e.target.value } : l
                                  ),
                                },
                              }))
                            }
                            className="w-1/2 px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-100"
                            placeholder="Label"
                          />
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) =>
                              onUpdateConfig((prev) => ({
                                ...prev,
                                header: {
                                  ...prev.header,
                                  navLinks: prev.header.navLinks.map((l) =>
                                    l.id === link.id ? { ...l, url: e.target.value } : l
                                  ),
                                },
                              }))
                            }
                            className="w-1/2 px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-100"
                            placeholder="#target"
                          />
                          {header.navLinks.length > 1 && (
                            <button
                              onClick={() =>
                                onUpdateConfig((prev) => ({
                                  ...prev,
                                  header: {
                                    ...prev.header,
                                    navLinks: prev.header.navLinks.filter((l) => l.id !== link.id),
                                  },
                                }))
                              }
                              className="text-slate-500 hover:text-red-400 p-1"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Hero Accordion */}
            <div className="border border-slate-800 rounded-xl bg-slate-850 overflow-hidden">
              <button
                onClick={() => toggleAccordion('hero')}
                className="w-full flex items-center justify-between p-3.5 bg-slate-800/60 hover:bg-slate-800 transition-colors text-left font-medium"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={15} className="text-amber-400" /> Hero Section
                </span>
                {openAccordion === 'hero' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {openAccordion === 'hero' && (
                <div className="p-4 space-y-4 border-t border-slate-800/80 bg-slate-900/50">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Main Headline
                    </label>
                    <input
                      type="text"
                      value={hero.title}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, title: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Subtitle / Tagline
                    </label>
                    <textarea
                      value={hero.subtitle}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, subtitle: e.target.value },
                        }))
                      }
                      rows={2}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={hero.ctaText}
                        onChange={(e) =>
                          onUpdateConfig((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, ctaText: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        CTA Button Link
                      </label>
                      <input
                        type="text"
                        value={hero.ctaUrl}
                        onChange={(e) =>
                          onUpdateConfig((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, ctaUrl: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Text Alignment
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['left', 'center', 'right'] as const).map((align) => (
                        <button
                          key={align}
                          onClick={() =>
                            onUpdateConfig((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, alignment: align },
                            }))
                          }
                          className={`py-1.5 rounded text-xs capitalize transition-all ${
                            hero.alignment === align
                              ? 'bg-indigo-600 text-white font-medium shadow'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Vertical Spacing ({hero.paddingY}rem)
                      </label>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={12}
                      step={0.5}
                      value={hero.paddingY}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, paddingY: parseFloat(e.target.value) },
                        }))
                      }
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-300">Show Top Badge</span>
                    <input
                      type="checkbox"
                      checked={hero.showBadge}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, showBadge: e.target.checked },
                        }))
                      }
                      className="rounded accent-indigo-500 w-4 h-4"
                    />
                  </div>
                  {hero.showBadge && (
                    <input
                      type="text"
                      value={hero.badgeText}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, badgeText: e.target.value },
                        }))
                      }
                      placeholder="Badge text"
                      className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-100"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Features Accordion */}
            <div className="border border-slate-800 rounded-xl bg-slate-850 overflow-hidden">
              <button
                onClick={() => toggleAccordion('features')}
                className="w-full flex items-center justify-between p-3.5 bg-slate-800/60 hover:bg-slate-800 transition-colors text-left font-medium"
              >
                <span className="flex items-center gap-2">
                  <LayoutGrid size={15} className="text-emerald-400" /> Features Grid ({features.items.length} cards)
                </span>
                {openAccordion === 'features' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {openAccordion === 'features' && (
                <div className="p-4 space-y-4 border-t border-slate-800/80 bg-slate-900/50">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={features.sectionTitle}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          features: { ...prev.features, sectionTitle: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <label className="col-span-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Grid Columns
                    </label>
                    {([2, 3, 4] as const).map((cols) => (
                      <button
                        key={cols}
                        onClick={() =>
                          onUpdateConfig((prev) => ({
                            ...prev,
                            features: { ...prev.features, columns: cols },
                          }))
                        }
                        className={`py-1.5 rounded text-xs transition-all ${
                          features.columns === cols
                            ? 'bg-indigo-600 text-white font-medium'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                        }`}
                      >
                        {cols} Columns
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Feature Cards
                      </label>
                      <button
                        onClick={() => {
                          const newId = Date.now().toString();
                          onUpdateConfig((prev) => ({
                            ...prev,
                            features: {
                              ...prev.features,
                              items: [
                                ...prev.features.items,
                                {
                                  id: newId,
                                  icon: '⭐',
                                  title: 'New Feature',
                                  description: 'Description of your new awesome feature.',
                                },
                              ],
                            },
                          }));
                        }}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <Plus size={12} /> Add Card
                      </button>
                    </div>

                    {features.items.map((card, idx) => (
                      <div
                        key={card.id}
                        className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 space-y-2 relative"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={card.icon}
                            onChange={(e) =>
                              onUpdateConfig((prev) => ({
                                ...prev,
                                features: {
                                  ...prev.features,
                                  items: prev.features.items.map((c) =>
                                    c.id === card.id ? { ...c, icon: e.target.value } : c
                                  ),
                                },
                              }))
                            }
                            className="w-12 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-center text-sm"
                            placeholder="⚡"
                          />
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) =>
                              onUpdateConfig((prev) => ({
                                ...prev,
                                features: {
                                  ...prev.features,
                                  items: prev.features.items.map((c) =>
                                    c.id === card.id ? { ...c, title: e.target.value } : c
                                  ),
                                },
                              }))
                            }
                            className="flex-1 px-2.5 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-slate-100 font-semibold"
                            placeholder="Card Title"
                          />
                          {features.items.length > 1 && (
                            <button
                              onClick={() =>
                                onUpdateConfig((prev) => ({
                                  ...prev,
                                  features: {
                                    ...prev.features,
                                    items: prev.features.items.filter((c) => c.id !== card.id),
                                  },
                                }))
                              }
                              className="text-slate-500 hover:text-red-400 p-1"
                              title="Delete card"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                        <textarea
                          value={card.description}
                          onChange={(e) =>
                            onUpdateConfig((prev) => ({
                              ...prev,
                              features: {
                                ...prev.features,
                                items: prev.features.items.map((c) =>
                                  c.id === card.id ? { ...c, description: e.target.value } : c
                                ),
                              },
                            }))
                          }
                          rows={2}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-slate-300"
                          placeholder="Card description"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About Section Accordion */}
            <div className="border border-slate-800 rounded-xl bg-slate-850 overflow-hidden">
              <button
                onClick={() => toggleAccordion('about')}
                className="w-full flex items-center justify-between p-3.5 bg-slate-800/60 hover:bg-slate-800 transition-colors text-left font-medium"
              >
                <span className="flex items-center gap-2">
                  <Type size={15} className="text-sky-400" /> About Us Section
                </span>
                {openAccordion === 'about' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {openAccordion === 'about' && (
                <div className="p-4 space-y-4 border-t border-slate-800/80 bg-slate-900/50">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={about.sectionTitle}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          about: { ...prev.about, sectionTitle: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      About Story / Text
                    </label>
                    <textarea
                      value={about.content}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          about: { ...prev.about, content: e.target.value },
                        }))
                      }
                      rows={4}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-300">Show Stats Counter</span>
                    <input
                      type="checkbox"
                      checked={about.showStats}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          about: { ...prev.about, showStats: e.target.checked },
                        }))
                      }
                      className="rounded accent-indigo-500 w-4 h-4"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Accordion */}
            <div className="border border-slate-800 rounded-xl bg-slate-850 overflow-hidden">
              <button
                onClick={() => toggleAccordion('footer')}
                className="w-full flex items-center justify-between p-3.5 bg-slate-800/60 hover:bg-slate-800 transition-colors text-left font-medium"
              >
                <span className="flex items-center gap-2">
                  <LayoutGrid size={15} className="text-purple-400" /> Footer Settings
                </span>
                {openAccordion === 'footer' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {openAccordion === 'footer' && (
                <div className="p-4 space-y-4 border-t border-slate-800/80 bg-slate-900/50">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Copyright Notice
                    </label>
                    <input
                      type="text"
                      value={footer.copyright}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          footer: { ...prev.footer, copyright: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Footer Links
                      </label>
                      <button
                        onClick={() => {
                          const newId = Date.now().toString();
                          onUpdateConfig((prev) => ({
                            ...prev,
                            footer: {
                              ...prev.footer,
                              links: [...prev.footer.links, { id: newId, label: 'New Link', url: '#' }],
                            },
                          }));
                        }}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <Plus size={12} /> Add Link
                      </button>
                    </div>

                    <div className="space-y-2">
                      {footer.links.map((link) => (
                        <div key={link.id} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) =>
                              onUpdateConfig((prev) => ({
                                ...prev,
                                footer: {
                                  ...prev.footer,
                                  links: prev.footer.links.map((l) =>
                                    l.id === link.id ? { ...l, label: e.target.value } : l
                                  ),
                                },
                              }))
                            }
                            className="w-1/2 px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-100"
                          />
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) =>
                              onUpdateConfig((prev) => ({
                                ...prev,
                                footer: {
                                  ...prev.footer,
                                  links: prev.footer.links.map((l) =>
                                    l.id === link.id ? { ...l, url: e.target.value } : l
                                  ),
                                },
                              }))
                            }
                            className="w-1/2 px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-100"
                          />
                          {footer.links.length > 1 && (
                            <button
                              onClick={() =>
                                onUpdateConfig((prev) => ({
                                  ...prev,
                                  footer: {
                                    ...prev.footer,
                                    links: prev.footer.links.filter((l) => l.id !== link.id),
                                  },
                                }))
                              }
                              className="text-slate-500 hover:text-red-400 p-1"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= THEME TAB ================= */}
        {activeTab === 'theme' && (
          <div className="space-y-5">
            {/* Theme Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Color Themes
              </label>
              <div className="grid grid-cols-2 gap-2">
                {THEME_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      onUpdateConfig((prev) => ({
                        ...prev,
                        theme: { ...prev.theme, ...preset.theme },
                      }))
                    }
                    className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-xl text-left transition-all group"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div
                        className="w-4 h-4 rounded-full shadow-xs"
                        style={{ backgroundColor: preset.theme.primaryColor }}
                      />
                      <div
                        className="w-4 h-4 rounded-full shadow-xs"
                        style={{ backgroundColor: preset.theme.secondaryColor }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-200 block truncate">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Palette Pickers */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Hero & Header Gradient Colors
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60">
                  <label className="block text-[11px] text-slate-400 mb-1">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, primaryColor: e.target.value },
                        }))
                      }
                      className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-300">{theme.primaryColor}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60">
                  <label className="block text-[11px] text-slate-400 mb-1">Secondary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, secondaryColor: e.target.value },
                        }))
                      }
                      className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-300">{theme.secondaryColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-slate-400">Gradient Angle ({theme.gradientAngle}°)</label>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={5}
                  value={theme.gradientAngle}
                  onChange={(e) =>
                    onUpdateConfig((prev) => ({
                      ...prev,
                      theme: { ...prev.theme, gradientAngle: parseInt(e.target.value) },
                    }))
                  }
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Typography Font Family
              </label>
              <select
                value={theme.fontFamily}
                onChange={(e) =>
                  onUpdateConfig((prev) => ({
                    ...prev,
                    theme: { ...prev.theme, fontFamily: e.target.value },
                  }))
                }
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm focus:border-indigo-500 focus:outline-none"
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Border Radius */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Corner Radius ({theme.borderRadius}px)
                </label>
              </div>
              <input
                type="range"
                min={0}
                max={24}
                step={2}
                value={theme.borderRadius}
                onChange={(e) =>
                  onUpdateConfig((prev) => ({
                    ...prev,
                    theme: { ...prev.theme, borderRadius: parseInt(e.target.value) },
                  }))
                }
                className="w-full accent-indigo-500"
              />
            </div>

            {/* Card & Footer Colors */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Surface & Footer Colors
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
                  <label className="block text-[11px] text-slate-400 mb-1">Card Background</label>
                  <input
                    type="color"
                    value={theme.cardBgColor}
                    onChange={(e) =>
                      onUpdateConfig((prev) => ({
                        ...prev,
                        theme: { ...prev.theme, cardBgColor: e.target.value },
                      }))
                    }
                    className="w-full h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                </div>

                <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
                  <label className="block text-[11px] text-slate-400 mb-1">Footer Background</label>
                  <input
                    type="color"
                    value={theme.footerBgColor}
                    onChange={(e) =>
                      onUpdateConfig((prev) => ({
                        ...prev,
                        theme: { ...prev.theme, footerBgColor: e.target.value },
                      }))
                    }
                    className="w-full h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SECTIONS TAB ================= */}
        {activeTab === 'sections' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Enable optional marketing sections to expand your welcome page.
            </p>

            {/* Testimonials Toggle */}
            <div className="p-4 bg-slate-800/70 rounded-xl border border-slate-700/70 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">Testimonials</h4>
                  <p className="text-xs text-slate-400">Display customer feedback and social proof</p>
                </div>
                <input
                  type="checkbox"
                  checked={testimonials.enabled}
                  onChange={(e) =>
                    onUpdateConfig((prev) => ({
                      ...prev,
                      testimonials: { ...prev.testimonials, enabled: e.target.checked },
                    }))
                  }
                  className="rounded accent-indigo-500 w-5 h-5"
                />
              </div>
            </div>

            {/* CTA Banner Toggle */}
            <div className="p-4 bg-slate-800/70 rounded-xl border border-slate-700/70 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">Call To Action Banner</h4>
                  <p className="text-xs text-slate-400">Full-width highlight banner before footer</p>
                </div>
                <input
                  type="checkbox"
                  checked={ctaBanner.enabled}
                  onChange={(e) =>
                    onUpdateConfig((prev) => ({
                      ...prev,
                      ctaBanner: { ...prev.ctaBanner, enabled: e.target.checked },
                    }))
                  }
                  className="rounded accent-indigo-500 w-5 h-5"
                />
              </div>
            </div>

            {/* FAQ Toggle */}
            <div className="p-4 bg-slate-800/70 rounded-xl border border-slate-700/70 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">FAQ Accordion</h4>
                  <p className="text-xs text-slate-400">Answers to common customer questions</p>
                </div>
                <input
                  type="checkbox"
                  checked={faq.enabled}
                  onChange={(e) =>
                    onUpdateConfig((prev) => ({
                      ...prev,
                      faq: { ...prev.faq, enabled: e.target.checked },
                    }))
                  }
                  className="rounded accent-indigo-500 w-5 h-5"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
