export interface NavLinkItem {
  id: string;
  label: string;
  url: string;
}

export interface FeatureItem {
  id: string;
  icon: string; // emoji or icon name
  title: string;
  description: string;
  tag?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating?: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
}

export interface PageTheme {
  primaryColor: string; // e.g. #667eea
  secondaryColor: string; // e.g. #764ba2
  accentColor: string; // e.g. #38bdf8
  gradientAngle: number; // e.g. 135
  fontFamily: string; // 'Segoe UI', 'Inter', 'Poppins', etc.
  borderRadius: number; // in px
  cardBgColor: string; // e.g. #f4f4f4
  cardTextColor: string; // e.g. #333333
  bodyBgColor: string; // e.g. #ffffff
  bodyTextColor: string; // e.g. #333333
  heroTextColor: string; // e.g. #ffffff
  footerBgColor: string; // e.g. #333333
  footerTextColor: string; // e.g. #ffffff
  footerLinkColor: string; // e.g. #667eea
}

export interface HeaderConfig {
  brandName: string;
  brandIcon: string;
  navLinks: NavLinkItem[];
  isSticky: boolean;
  headerBgStyle: 'gradient' | 'solid' | 'transparent';
  headerBgColor: string;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  alignment: 'center' | 'left' | 'right';
  paddingY: number; // in rem
  showBadge: boolean;
  badgeText: string;
}

export interface FeaturesConfig {
  sectionTitle: string;
  sectionSubtitle?: string;
  columns: 2 | 3 | 4;
  items: FeatureItem[];
  cardHoverEffect: boolean;
}

export interface AboutConfig {
  sectionTitle: string;
  content: string;
  showStats: boolean;
  stats: StatItem[];
  imageSide?: 'none' | 'right' | 'left';
  imageUrl?: string;
}

export interface TestimonialsConfig {
  enabled: boolean;
  sectionTitle: string;
  items: TestimonialItem[];
}

export interface CtaBannerConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
}

export interface FaqConfig {
  enabled: boolean;
  sectionTitle: string;
  items: FaqItem[];
}

export interface FooterConfig {
  copyright: string;
  links: NavLinkItem[];
  showSocials: boolean;
  socials: { platform: string; url: string }[];
}

export interface PageConfig {
  theme: PageTheme;
  header: HeaderConfig;
  hero: HeroConfig;
  features: FeaturesConfig;
  about: AboutConfig;
  testimonials: TestimonialsConfig;
  ctaBanner: CtaBannerConfig;
  faq: FaqConfig;
  footer: FooterConfig;
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export type ActiveTab = 'content' | 'theme' | 'sections' | 'export';
