import React from 'react';
import { PageConfig, FeatureItem, NavLinkItem } from '../types';
import { InlineText } from './InlineText';
import { Plus, Trash2, ArrowUp, ArrowDown, Settings, Sparkles } from 'lucide-react';

interface LivePageViewProps {
  config: PageConfig;
  isEditMode: boolean;
  onUpdateConfig: (updater: (prev: PageConfig) => PageConfig) => void;
  onOpenSectionSettings?: (section: string) => void;
}

export const LivePageView: React.FC<LivePageViewProps> = ({
  config,
  isEditMode,
  onUpdateConfig,
  onOpenSectionSettings,
}) => {
  const { theme, header, hero, features, about, testimonials, ctaBanner, faq, footer } = config;

  const gradientBackground = `linear-gradient(${theme.gradientAngle}deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`;

  // Header Handlers
  const handleUpdateBrandName = (name: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      header: { ...prev.header, brandName: name },
    }));
  };

  const handleUpdateNavLink = (id: string, newLabel: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        navLinks: prev.header.navLinks.map((l) => (l.id === id ? { ...l, label: newLabel } : l)),
      },
    }));
  };

  const handleAddNavLink = () => {
    const newId = Date.now().toString();
    onUpdateConfig((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        navLinks: [...prev.header.navLinks, { id: newId, label: 'New Link', url: '#new' }],
      },
    }));
  };

  const handleDeleteNavLink = (id: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        navLinks: prev.header.navLinks.filter((l) => l.id !== id),
      },
    }));
  };

  // Hero Handlers
  const handleUpdateHeroTitle = (title: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      hero: { ...prev.hero, title },
    }));
  };

  const handleUpdateHeroSubtitle = (subtitle: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      hero: { ...prev.hero, subtitle },
    }));
  };

  const handleUpdateHeroCta = (ctaText: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      hero: { ...prev.hero, ctaText },
    }));
  };

  // Features Handlers
  const handleUpdateFeatureTitle = (title: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      features: { ...prev.features, sectionTitle: title },
    }));
  };

  const handleUpdateFeatureItem = (id: string, field: keyof FeatureItem, val: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        items: prev.features.items.map((item) => (item.id === id ? { ...item, [field]: val } : item)),
      },
    }));
  };

  const handleAddFeature = () => {
    const newId = Date.now().toString();
    const newFeature: FeatureItem = {
      id: newId,
      icon: '✨',
      title: 'Modern & Clean',
      description: 'Engineered with pixel-perfect attention to typography and layout.',
      tag: 'New',
    };
    onUpdateConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        items: [...prev.features.items, newFeature],
      },
    }));
  };

  const handleDeleteFeature = (id: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        items: prev.features.items.filter((item) => item.id !== id),
      },
    }));
  };

  const handleMoveFeature = (index: number, direction: 'up' | 'down') => {
    const newItems = [...features.items];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx >= 0 && targetIdx < newItems.length) {
      const temp = newItems[index];
      newItems[index] = newItems[targetIdx];
      newItems[targetIdx] = temp;
      onUpdateConfig((prev) => ({
        ...prev,
        features: { ...prev.features, items: newItems },
      }));
    }
  };

  // About Handlers
  const handleUpdateAboutTitle = (title: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      about: { ...prev.about, sectionTitle: title },
    }));
  };

  const handleUpdateAboutContent = (content: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      about: { ...prev.about, content },
    }));
  };

  // Footer Handlers
  const handleUpdateFooterCopyright = (copyright: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      footer: { ...prev.footer, copyright },
    }));
  };

  const handleUpdateFooterLink = (id: string, newLabel: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        links: prev.footer.links.map((l) => (l.id === id ? { ...l, label: newLabel } : l)),
      },
    }));
  };

  const handleAddFooterLink = () => {
    const newId = Date.now().toString();
    onUpdateConfig((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        links: [...prev.footer.links, { id: newId, label: 'New Link', url: '#' }],
      },
    }));
  };

  const handleDeleteFooterLink = (id: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        links: prev.footer.links.filter((l) => l.id !== id),
      },
    }));
  };

  return (
    <div
      id="welcome-page-root"
      className="min-h-full transition-colors duration-200"
      style={{
        fontFamily: theme.fontFamily,
        backgroundColor: theme.bodyBgColor,
        color: theme.bodyTextColor,
      }}
    >
      {/* Navigation Header */}
      <header
        id="header-section"
        className={`w-full py-4 shadow-sm z-30 transition-all ${
          header.isSticky ? 'sticky top-0 backdrop-blur-xs' : 'relative'
        }`}
        style={{
          background: gradientBackground,
          color: theme.heroTextColor,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <InlineText
                id="brand-name"
                value={header.brandName}
                onChange={handleUpdateBrandName}
                isEditMode={isEditMode}
                tag="h1"
                className="text-2xl font-bold tracking-tight"
              />
            </h1>
          </div>

          <nav className="flex items-center gap-6">
            <ul className="flex flex-wrap items-center gap-6 text-sm font-medium">
              {header.navLinks.map((link) => (
                <li key={link.id} className="relative group/nav">
                  <a
                    href={link.url}
                    onClick={(e) => {
                      if (isEditMode) e.preventDefault();
                    }}
                    className="hover:opacity-80 transition-opacity"
                    style={{ color: theme.heroTextColor }}
                  >
                    <InlineText
                      id={`nav-link-${link.id}`}
                      value={link.label}
                      onChange={(val) => handleUpdateNavLink(link.id, val)}
                      isEditMode={isEditMode}
                      tag="span"
                    />
                  </a>
                  {isEditMode && header.navLinks.length > 1 && (
                    <button
                      onClick={() => handleDeleteNavLink(link.id)}
                      className="opacity-0 group-hover/nav:opacity-100 transition-opacity absolute -top-2 -right-3 bg-red-500 text-white rounded-full p-0.5 text-[10px] hover:bg-red-600 shadow"
                      title="Remove link"
                    >
                      <Trash2 size={10} />
                    </button>
                  )}
                </li>
              ))}
              {isEditMode && (
                <li>
                  <button
                    onClick={handleAddNavLink}
                    className="flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded transition-colors"
                    title="Add navigation link"
                  >
                    <Plus size={12} /> Add Link
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="w-full text-center relative overflow-hidden transition-all"
        style={{
          background: gradientBackground,
          color: theme.heroTextColor,
          paddingTop: `${hero.paddingY}rem`,
          paddingBottom: `${hero.paddingY}rem`,
          textAlign: hero.alignment,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          {hero.showBadge && (
            <div className="mb-4 inline-block">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm shadow-sm">
                <Sparkles size={13} />
                <InlineText
                  id="hero-badge"
                  value={hero.badgeText}
                  onChange={(val) =>
                    onUpdateConfig((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, badgeText: val },
                    }))
                  }
                  isEditMode={isEditMode}
                  tag="span"
                />
              </span>
            </div>
          )}

          <h2
            id="hero-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight"
          >
            <InlineText
              id="hero-title-text"
              value={hero.title}
              onChange={handleUpdateHeroTitle}
              isEditMode={isEditMode}
              tag="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            />
          </h2>

          <p
            id="hero-subtitle"
            className={`text-lg md:text-xl opacity-95 mb-8 max-w-2xl ${
              hero.alignment === 'center' ? 'mx-auto' : hero.alignment === 'right' ? 'ml-auto' : ''
            }`}
          >
            <InlineText
              id="hero-subtitle-text"
              value={hero.subtitle}
              onChange={handleUpdateHeroSubtitle}
              isEditMode={isEditMode}
              tag="p"
              multiline
              className="text-lg md:text-xl opacity-95"
            />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              id="hero-cta-btn"
              href={hero.ctaUrl}
              onClick={(e) => {
                if (isEditMode) e.preventDefault();
              }}
              className="inline-block px-8 py-3.5 bg-white font-bold transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
              style={{
                color: theme.primaryColor,
                borderRadius: `${theme.borderRadius}px`,
              }}
            >
              <InlineText
                id="hero-cta-text"
                value={hero.ctaText}
                onChange={handleUpdateHeroCta}
                isEditMode={isEditMode}
                tag="span"
              />
            </a>

            {isEditMode && onOpenSectionSettings && (
              <button
                onClick={() => onOpenSectionSettings('hero')}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs bg-black/25 hover:bg-black/40 text-white rounded transition-colors backdrop-blur-sm"
                title="Open Hero Settings"
              >
                <Settings size={13} /> Customize Hero
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Features Section */}
        <section id="features" className="my-12">
          <div className="text-center mb-8 relative">
            <h2
              id="features-title"
              className="text-3xl font-bold tracking-tight mb-2"
              style={{ color: theme.bodyTextColor }}
            >
              <InlineText
                id="features-title-text"
                value={features.sectionTitle}
                onChange={handleUpdateFeatureTitle}
                isEditMode={isEditMode}
                tag="h2"
                className="text-3xl font-bold tracking-tight"
              />
            </h2>
            {features.sectionSubtitle && (
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                <InlineText
                  id="features-subtitle-text"
                  value={features.sectionSubtitle}
                  onChange={(val) =>
                    onUpdateConfig((prev) => ({
                      ...prev,
                      features: { ...prev.features, sectionSubtitle: val },
                    }))
                  }
                  isEditMode={isEditMode}
                  tag="p"
                />
              </p>
            )}
          </div>

          <div
            className={`grid gap-8 ${
              features.columns === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : features.columns === 4
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                : 'grid-cols-1 md:grid-cols-3'
            }`}
          >
            {features.items.map((item, idx) => (
              <div
                key={item.id}
                id={`feature-card-${item.id}`}
                className={`feature-card relative group/card p-8 text-center transition-all duration-300 border border-neutral-700/40 shadow-xs ${
                  features.cardHoverEffect ? 'hover:-translate-y-1 hover:shadow-lg' : ''
                }`}
                style={{
                  backgroundColor: theme.cardBgColor,
                  color: theme.cardTextColor,
                  borderRadius: `${theme.borderRadius}px`,
                }}
              >
                {/* Edit Controls Toolbar for Card */}
                {isEditMode && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity bg-slate-900/80 text-white rounded p-1 shadow z-20">
                    <button
                      onClick={() => handleMoveFeature(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 hover:bg-slate-700 rounded disabled:opacity-30"
                      title="Move left/up"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      onClick={() => handleMoveFeature(idx, 'down')}
                      disabled={idx === features.items.length - 1}
                      className="p-1 hover:bg-slate-700 rounded disabled:opacity-30"
                      title="Move right/down"
                    >
                      <ArrowDown size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteFeature(item.id)}
                      className="p-1 hover:bg-red-600 rounded text-red-300 hover:text-white"
                      title="Delete card"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}

                <h3
                  className="text-xl font-bold mb-3 flex items-center justify-center gap-2"
                  style={{ color: theme.primaryColor }}
                >
                  <InlineText
                    id={`feature-icon-${item.id}`}
                    value={item.icon}
                    onChange={(val) => handleUpdateFeatureItem(item.id, 'icon', val)}
                    isEditMode={isEditMode}
                    tag="span"
                    className="text-2xl"
                    placeholder="⚡"
                  />
                  <InlineText
                    id={`feature-title-${item.id}`}
                    value={item.title}
                    onChange={(val) => handleUpdateFeatureItem(item.id, 'title', val)}
                    isEditMode={isEditMode}
                    tag="span"
                  />
                </h3>

                <p className="text-base leading-relaxed opacity-90">
                  <InlineText
                    id={`feature-desc-${item.id}`}
                    value={item.description}
                    onChange={(val) => handleUpdateFeatureItem(item.id, 'description', val)}
                    isEditMode={isEditMode}
                    tag="p"
                    multiline
                  />
                </p>
              </div>
            ))}

            {isEditMode && (
              <button
                onClick={handleAddFeature}
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/30 text-slate-500 hover:text-indigo-600 transition-all min-h-[160px] group/add"
                style={{ borderRadius: `${theme.borderRadius}px` }}
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 group-hover/add:bg-indigo-100 flex items-center justify-center mb-2 transition-colors">
                  <Plus size={20} />
                </div>
                <span className="font-semibold text-sm">Add Feature Card</span>
                <span className="text-xs text-slate-400 mt-1">Click to add a new card</span>
              </button>
            )}
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="my-16 pt-8 border-t border-neutral-700/40">
          <div className="max-w-3xl">
            <h2
              id="about-title"
              className="text-3xl font-bold tracking-tight mb-4"
              style={{ color: theme.bodyTextColor }}
            >
              <InlineText
                id="about-title-text"
                value={about.sectionTitle}
                onChange={handleUpdateAboutTitle}
                isEditMode={isEditMode}
                tag="h2"
                className="text-3xl font-bold tracking-tight"
              />
            </h2>

            <p className="text-lg leading-relaxed opacity-90">
              <InlineText
                id="about-content-text"
                value={about.content}
                onChange={handleUpdateAboutContent}
                isEditMode={isEditMode}
                tag="p"
                multiline
                className="text-lg leading-relaxed"
              />
            </p>
          </div>

          {/* Optional Stats Display */}
          {about.showStats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {about.stats.map((stat) => (
                <div
                  key={stat.id}
                  className="p-6 text-center border border-neutral-700/40 shadow-sm"
                  style={{
                    backgroundColor: theme.cardBgColor,
                    borderRadius: `${theme.borderRadius}px`,
                  }}
                >
                  <div
                    className="text-3xl font-extrabold mb-1"
                    style={{ color: theme.primaryColor }}
                  >
                    <InlineText
                      value={stat.value}
                      onChange={(val) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          about: {
                            ...prev.about,
                            stats: prev.about.stats.map((s) =>
                              s.id === stat.id ? { ...s, value: val } : s
                            ),
                          },
                        }))
                      }
                      isEditMode={isEditMode}
                    />
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    <InlineText
                      value={stat.label}
                      onChange={(val) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          about: {
                            ...prev.about,
                            stats: prev.about.stats.map((s) =>
                              s.id === stat.id ? { ...s, label: val } : s
                            ),
                          },
                        }))
                      }
                      isEditMode={isEditMode}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Optional Testimonials Section */}
        {testimonials.enabled && (
          <section id="testimonials" className="my-16 pt-8 border-t border-neutral-700/40">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
              <InlineText
                value={testimonials.sectionTitle}
                onChange={(val) =>
                  onUpdateConfig((prev) => ({
                    ...prev,
                    testimonials: { ...prev.testimonials, sectionTitle: val },
                  }))
                }
                isEditMode={isEditMode}
                tag="h2"
              />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.items.map((t) => (
                <div
                  key={t.id}
                  className="p-6 border border-neutral-700/40 shadow-sm flex flex-col justify-between"
                  style={{
                    backgroundColor: theme.cardBgColor,
                    color: theme.cardTextColor,
                    borderRadius: `${theme.borderRadius}px`,
                  }}
                >
                  <p className="italic text-base mb-4 opacity-90">
                    "
                    <InlineText
                      value={t.quote}
                      onChange={(val) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          testimonials: {
                            ...prev.testimonials,
                            items: prev.testimonials.items.map((item) =>
                              item.id === t.id ? { ...item, quote: val } : item
                            ),
                          },
                        }))
                      }
                      isEditMode={isEditMode}
                      multiline
                    />
                    "
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{t.avatar}</span>
                    <div>
                      <h4 className="font-bold text-sm">
                        <InlineText
                          value={t.name}
                          onChange={(val) =>
                            onUpdateConfig((prev) => ({
                              ...prev,
                              testimonials: {
                                ...prev.testimonials,
                                items: prev.testimonials.items.map((item) =>
                                  item.id === t.id ? { ...item, name: val } : item
                                ),
                              },
                            }))
                          }
                          isEditMode={isEditMode}
                        />
                      </h4>
                      <p className="text-xs opacity-75">
                        <InlineText
                          value={t.role}
                          onChange={(val) =>
                            onUpdateConfig((prev) => ({
                              ...prev,
                              testimonials: {
                                ...prev.testimonials,
                                items: prev.testimonials.items.map((item) =>
                                  item.id === t.id ? { ...item, role: val } : item
                                ),
                              },
                            }))
                          }
                          isEditMode={isEditMode}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Optional FAQ Section */}
        {faq.enabled && (
          <section id="faq" className="my-16 pt-8 border-t border-neutral-700/40">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
              <InlineText
                value={faq.sectionTitle}
                onChange={(val) =>
                  onUpdateConfig((prev) => ({
                    ...prev,
                    faq: { ...prev.faq, sectionTitle: val },
                  }))
                }
                isEditMode={isEditMode}
                tag="h2"
              />
            </h2>
            <div className="max-w-2xl mx-auto space-y-4">
              {faq.items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 border border-neutral-700/40 shadow-xs"
                  style={{
                    backgroundColor: theme.cardBgColor,
                    color: theme.cardTextColor,
                    borderRadius: `${theme.borderRadius}px`,
                  }}
                >
                  <h4
                    className="font-bold text-base mb-2"
                    style={{ color: theme.primaryColor }}
                  >
                    <InlineText
                      value={item.question}
                      onChange={(val) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          faq: {
                            ...prev.faq,
                            items: prev.faq.items.map((f) =>
                              f.id === item.id ? { ...f, question: val } : f
                            ),
                          },
                        }))
                      }
                      isEditMode={isEditMode}
                    />
                  </h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    <InlineText
                      value={item.answer}
                      onChange={(val) =>
                        onUpdateConfig((prev) => ({
                          ...prev,
                          faq: {
                            ...prev.faq,
                            items: prev.faq.items.map((f) =>
                              f.id === item.id ? { ...f, answer: val } : f
                            ),
                          },
                        }))
                      }
                      isEditMode={isEditMode}
                      multiline
                    />
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Optional CTA Banner */}
      {ctaBanner.enabled && (
        <section
          className="w-full text-center py-16 px-6 text-white"
          style={{ background: gradientBackground }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <InlineText
                value={ctaBanner.title}
                onChange={(val) =>
                  onUpdateConfig((prev) => ({
                    ...prev,
                    ctaBanner: { ...prev.ctaBanner, title: val },
                  }))
                }
                isEditMode={isEditMode}
                tag="h2"
              />
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
              <InlineText
                value={ctaBanner.subtitle}
                onChange={(val) =>
                  onUpdateConfig((prev) => ({
                    ...prev,
                    ctaBanner: { ...prev.ctaBanner, subtitle: val },
                  }))
                }
                isEditMode={isEditMode}
                tag="p"
              />
            </p>
            <a
              href={ctaBanner.buttonUrl}
              className="inline-block px-8 py-3.5 bg-white font-bold transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
              style={{
                color: theme.primaryColor,
                borderRadius: `${theme.borderRadius}px`,
              }}
            >
              <InlineText
                value={ctaBanner.buttonText}
                onChange={(val) =>
                  onUpdateConfig((prev) => ({
                    ...prev,
                    ctaBanner: { ...prev.ctaBanner, buttonText: val },
                  }))
                }
                isEditMode={isEditMode}
              />
            </a>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        id="contact"
        className="w-full text-center py-10 px-6 transition-colors"
        style={{
          backgroundColor: theme.footerBgColor,
          color: theme.footerTextColor,
        }}
      >
        <div className="max-w-[1200px] mx-auto space-y-3">
          <p className="text-sm">
            <InlineText
              id="footer-copyright"
              value={footer.copyright}
              onChange={handleUpdateFooterCopyright}
              isEditMode={isEditMode}
              tag="span"
            />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
            {footer.links.map((link, idx) => (
              <React.Fragment key={link.id}>
                {idx > 0 && <span className="opacity-40">|</span>}
                <span className="relative group/footlink">
                  <a
                    href={link.url}
                    onClick={(e) => {
                      if (isEditMode) e.preventDefault();
                    }}
                    className="hover:underline transition-all"
                    style={{ color: theme.footerLinkColor }}
                  >
                    <InlineText
                      id={`footer-link-${link.id}`}
                      value={link.label}
                      onChange={(val) => handleUpdateFooterLink(link.id, val)}
                      isEditMode={isEditMode}
                      tag="span"
                    />
                  </a>
                  {isEditMode && footer.links.length > 1 && (
                    <button
                      onClick={() => handleDeleteFooterLink(link.id)}
                      className="opacity-0 group-hover/footlink:opacity-100 transition-opacity absolute -top-2 -right-3 bg-red-500 text-white rounded-full p-0.5 text-[9px] hover:bg-red-600 shadow"
                      title="Remove footer link"
                    >
                      <Trash2 size={9} />
                    </button>
                  )}
                </span>
              </React.Fragment>
            ))}
            {isEditMode && (
              <button
                onClick={handleAddFooterLink}
                className="ml-2 text-xs opacity-75 hover:opacity-100 flex items-center gap-1 border border-white/20 rounded px-1.5 py-0.5"
                title="Add footer link"
              >
                <Plus size={11} /> Link
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
