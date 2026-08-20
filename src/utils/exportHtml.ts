import { PageConfig } from '../types';

export function generateStandaloneHtml(config: PageConfig): string {
  const { theme, header, hero, features, about, testimonials, ctaBanner, faq, footer } = config;

  const gradientCss = `linear-gradient(${theme.gradientAngle}deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`;

  const navLinksHtml = header.navLinks
    .map((link) => `                <li><a href="${link.url}">${escapeHtml(link.label)}</a></li>`)
    .join('\n');

  const featureCardsHtml = features.items
    .map(
      (item) => `                <div class="feature-card">
                    <h3>${item.icon ? `${item.icon} ` : ''}${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.description)}</p>
                </div>`
    )
    .join('\n');

  const statsHtml =
    about.showStats && about.stats.length > 0
      ? `\n            <div class="stats-grid">
${about.stats
  .map(
    (s) => `                <div class="stat-box">
                    <div class="stat-val">${escapeHtml(s.value)}</div>
                    <div class="stat-lbl">${escapeHtml(s.label)}</div>
                </div>`
  )
  .join('\n')}
            </div>`
      : '';

  const testimonialsHtml =
    testimonials.enabled && testimonials.items.length > 0
      ? `\n        <!-- Testimonials Section -->
        <section id="testimonials" class="testimonials-section">
            <h2 style="text-align: center; margin-bottom: 2rem;">${escapeHtml(testimonials.sectionTitle)}</h2>
            <div class="testimonials-grid">
${testimonials.items
  .map(
    (t) => `                <div class="testimonial-card">
                    <p class="quote">"${escapeHtml(t.quote)}"</p>
                    <div class="author">
                        <span class="avatar">${t.avatar}</span>
                        <div>
                            <strong>${escapeHtml(t.name)}</strong>
                            <small>${escapeHtml(t.role)}</small>
                        </div>
                    </div>
                </div>`
  )
  .join('\n')}
            </div>
        </section>`
      : '';

  const faqHtml =
    faq.enabled && faq.items.length > 0
      ? `\n        <!-- FAQ Section -->
        <section id="faq" class="faq-section">
            <h2 style="text-align: center; margin-bottom: 2rem;">${escapeHtml(faq.sectionTitle)}</h2>
            <div class="faq-list">
${faq.items
  .map(
    (f) => `                <div class="faq-item">
                    <h4>${escapeHtml(f.question)}</h4>
                    <p>${escapeHtml(f.answer)}</p>
                </div>`
  )
  .join('\n')}
            </div>
        </section>`
      : '';

  const ctaBannerHtml = ctaBanner.enabled
    ? `\n    <!-- CTA Banner Section -->
    <section class="cta-banner">
        <h2>${escapeHtml(ctaBanner.title)}</h2>
        <p>${escapeHtml(ctaBanner.subtitle)}</p>
        <a href="${ctaBanner.buttonUrl}" class="btn">${escapeHtml(ctaBanner.buttonText)}</a>
    </section>`
    : '';

  const footerLinksHtml = footer.links
    .map((link) => `<a href="${link.url}">${escapeHtml(link.label)}</a>`)
    .join(' | \n            ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(hero.title)} - ${escapeHtml(header.brandName)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;600;700;800&family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@500;700;800&family=Poppins:wght@500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: ${theme.fontFamily};
            line-height: 1.6;
            color: ${theme.bodyTextColor};
            background-color: ${theme.bodyBgColor};
        }

        header {
            background: ${gradientCss};
            color: ${theme.heroTextColor};
            padding: 1rem 0;
            position: ${header.isSticky ? 'sticky' : 'relative'};
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        nav {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2rem;
        }

        nav h1 {
            font-size: 1.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        nav ul {
            list-style: none;
            display: flex;
            gap: 2rem;
        }

        nav a {
            color: ${theme.heroTextColor};
            text-decoration: none;
            transition: opacity 0.3s;
        }

        nav a:hover {
            opacity: 0.8;
        }

        .hero {
            background: ${gradientCss};
            color: ${theme.heroTextColor};
            text-align: ${hero.alignment};
            padding: ${hero.paddingY}rem 2rem;
        }

        .hero h2 {
            font-size: 3rem;
            margin-bottom: 1rem;
            line-height: 1.2;
        }

        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.95;
            max-width: 700px;
            ${hero.alignment === 'center' ? 'margin-left: auto; margin-right: auto;' : ''}
        }

        .btn {
            display: inline-block;
            padding: 0.8rem 2rem;
            background-color: white;
            color: ${theme.primaryColor};
            text-decoration: none;
            border-radius: ${theme.borderRadius}px;
            font-weight: bold;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(${features.columns === 4 ? '240px' : features.columns === 2 ? '400px' : '300px'}, 1fr));
            gap: 2rem;
            margin: 4rem 0;
        }

        .feature-card {
            background: ${theme.cardBgColor};
            color: ${theme.cardTextColor};
            padding: 2rem;
            border-radius: ${theme.borderRadius}px;
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        ${
          features.cardHoverEffect
            ? `.feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }`
            : ''
        }

        .feature-card h3 {
            color: ${theme.primaryColor};
            margin-bottom: 1rem;
            font-size: 1.35rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1.5rem;
            margin: 2.5rem 0 1rem;
        }

        .stat-box {
            background: ${theme.cardBgColor};
            padding: 1.5rem;
            border-radius: ${theme.borderRadius}px;
            text-align: center;
        }

        .stat-val {
            font-size: 2rem;
            font-weight: bold;
            color: ${theme.primaryColor};
        }

        .stat-lbl {
            font-size: 0.9rem;
            opacity: 0.8;
            margin-top: 0.25rem;
        }

        .testimonials-section, .faq-section {
            margin: 4rem 0;
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .testimonial-card {
            background: ${theme.cardBgColor};
            color: ${theme.cardTextColor};
            padding: 2rem;
            border-radius: ${theme.borderRadius}px;
        }

        .testimonial-card .quote {
            font-style: italic;
            margin-bottom: 1.25rem;
        }

        .testimonial-card .author {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .testimonial-card .avatar {
            font-size: 2rem;
        }

        .faq-list {
            max-width: 800px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .faq-item {
            background: ${theme.cardBgColor};
            padding: 1.5rem;
            border-radius: ${theme.borderRadius}px;
        }

        .faq-item h4 {
            color: ${theme.primaryColor};
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }

        .cta-banner {
            background: ${gradientCss};
            color: ${theme.heroTextColor};
            text-align: center;
            padding: 4rem 2rem;
            margin-top: 4rem;
        }

        .cta-banner h2 {
            font-size: 2.2rem;
            margin-bottom: 1rem;
        }

        .cta-banner p {
            font-size: 1.1rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }

        footer {
            background: ${theme.footerBgColor};
            color: ${theme.footerTextColor};
            text-align: center;
            padding: 2.5rem 1rem;
            margin-top: 4rem;
        }

        footer a {
            color: ${theme.footerLinkColor};
            text-decoration: none;
        }

        footer a:hover {
            text-decoration: underline;
        }

        @media (max-width: 768px) {
            nav {
                flex-direction: column;
                gap: 1rem;
            }

            nav ul {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }

            .hero h2 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <header>
        <nav>
            <h1>${header.brandIcon ? `${header.brandIcon} ` : ''}${escapeHtml(header.brandName)}</h1>
            <ul>
${navLinksHtml}
            </ul>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <h2>${escapeHtml(hero.title)}</h2>
        <p>${escapeHtml(hero.subtitle)}</p>
        <a href="${hero.ctaUrl}" class="btn">${escapeHtml(hero.ctaText)}</a>
    </section>

    <!-- Main Content -->
    <main class="container">
        <section id="features">
            <h2 style="text-align: center; margin-bottom: 2rem;">${escapeHtml(features.sectionTitle)}</h2>
            <div class="features">
${featureCardsHtml}
            </div>
        </section>

        <section id="about">
            <h2 style="margin: 3rem 0 1rem;">${escapeHtml(about.sectionTitle)}</h2>
            <p>${escapeHtml(about.content)}</p>${statsHtml}
        </section>${testimonialsHtml}${faqHtml}
    </main>${ctaBannerHtml}

    <!-- Footer -->
    <footer id="contact">
        <p>${escapeHtml(footer.copyright)}</p>
        <p>
            ${footerLinksHtml}
        </p>
    </footer>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
