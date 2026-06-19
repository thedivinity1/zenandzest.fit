/**
 * Theme-aware background and color helpers for Zen and Zest.
 * Use isDark from useTheme() to select the correct value.
 *
 * All dark values are the original deep-space gradients.
 * All light values are the 2026 premium "Liquid Glass + Dopamine Gradients" system.
 */

// ─── SECTION BACKGROUNDS ─────────────────────────────────────────────────────

/** Hero / main page container */
export const BG_VOID = {
  dark:  '#030405',
  light: 'linear-gradient(135deg, #fdfbfb 0%, #f0f2f5 100%)',
};

/** Deep navy sections -> Vibrant Blue/Purple Mesh */
export const BG_NAVY = {
  dark:  'linear-gradient(135deg, #06081a 0%, #0a0c1f 50%, #060814 100%)',
  light: 'radial-gradient(circle at 10% 20%, rgba(14, 165, 233, 0.12) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%), linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
};

/** Forest / botanical sections -> Vibrant Emerald Mesh */
export const BG_FOREST = {
  dark:  'linear-gradient(135deg, #050a08 0%, #071510 50%, #030705 100%)',
  light: 'radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(52, 211, 153, 0.1) 0%, transparent 50%), linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
};

/** Warm / amber / gold sections -> Dopamine Amber/Coral */
export const BG_WARM = {
  dark:  'linear-gradient(135deg, #0e0a02 0%, #1c1304 60%, #0a0800 100%)',
  light: 'radial-gradient(circle at 80% 10%, rgba(245, 158, 11, 0.15) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(251, 113, 133, 0.12) 0%, transparent 50%), linear-gradient(150deg, #fffbeb 0%, #fef3c7 100%)',
};

/** Indigo / cosmic sections -> Electric Violet Mesh */
export const BG_INDIGO = {
  dark:  'linear-gradient(180deg, #060509 0%, #09060f 40%, #0c0714 100%)',
  light: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 60%), linear-gradient(160deg, #faf5ff 0%, #f3e8ff 100%)',
};

/** Multi-dark sections (articles, content) -> Crisp Slate Base with soft glows */
export const BG_MULTI_DARK = {
  dark:  'linear-gradient(180deg, #040609 0%, #060814 40%, #080a18 100%)',
  light: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.08) 0%, transparent 40%), linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
};

/** Teal / wellness sections -> Aquamarine Pop */
export const BG_TEAL = {
  dark:  'linear-gradient(180deg, #020608 0%, #030a0e 50%, #040c0f 100%)',
  light: 'radial-gradient(circle at 30% 70%, rgba(45, 212, 191, 0.15) 0%, transparent 60%), linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 100%)',
};

/** Dark purple / expert sections -> Soft Fuchsia/Rose */
export const BG_PURPLE = {
  dark:  'linear-gradient(180deg, #070509 0%, #0d0814 50%, #0f091a 100%)',
  light: 'radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), linear-gradient(180deg, #fdf2f8 0%, #fbcfe8 100%)',
};

/** Newsletter / CTA — VIBRANT on both themes */
export const BG_NEWSLETTER = {
  dark:  'linear-gradient(135deg, #070410 0%, #0d0620 50%, #080316 100%)',
  light: 'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.25) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 60%), linear-gradient(135deg, #10b981 0%, #f59e0b 50%, #fb7185 100%)',
};

/** Stats / Trust bar — KEEP DARK GREEN on both themes (brand impact) */
export const BG_STATS = {
  dark:  'linear-gradient(135deg, #06081a 0%, #0a0c1f 50%, #060814 100%)',
  light: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #065f46 100%)',
};

/** Footer -> Refined Cloud White */
export const BG_FOOTER = {
  dark:  '#030405',
  light: '#f8fafc',
};

// ─── CARD / ELEMENT BACKGROUNDS ──────────────────────────────────────────────

/** Dark glass card -> 2026 Premium Liquid Glass */
export const BG_GLASS_CARD = {
  dark:  'rgba(255,255,255,0.04)',
  light: 'rgba(255,255,255,0.6)',
};

/** Featured article card dark gradient */
export const BG_ARTICLE_CARD = {
  dark:  'linear-gradient(135deg, rgba(13,36,24,0.8) 0%, rgba(21,62,42,0.6) 100%)',
  light: 'rgba(255,255,255,0.8)',
};

/** Inner tool card */
export const BG_TOOL_CARD = {
  dark:  'rgba(255,255,255,0.04)',
  light: 'rgba(255,255,255,0.7)',
};

/** Announcement ticker */
export const BG_TICKER = {
  dark:  'rgba(10, 26, 15, 0.97)',
  light: 'linear-gradient(90deg, #10b981, #059669)',
};

// ─── TEXT COLORS ─────────────────────────────────────────────────────────────

export const TEXT_PRIMARY = { dark: '#ffffff',              light: '#0f172a' };
export const TEXT_MUTED   = { dark: 'rgba(255,255,255,0.7)',light: '#334155' };
export const TEXT_SUBTLE  = { dark: 'rgba(255,255,255,0.5)',light: '#475569' };
export const TEXT_DIMMED  = { dark: 'rgba(255,255,255,0.45)',light: '#64748b' };

// ─── BORDER COLORS ───────────────────────────────────────────────────────────

export const BORDER_DEFAULT = { dark: 'rgba(229,197,117,0.15)', light: 'rgba(255,255,255,0.8)' };
export const BORDER_CARD    = { dark: 'rgba(255,255,255,0.08)',  light: 'rgba(255,255,255,0.9)' };

// ─── HELPER ──────────────────────────────────────────────────────────────────

/** Pick dark or light value based on isDark flag */
export function t<T>(isDark: boolean, token: { dark: T; light: T }): T {
  return isDark ? token.dark : token.light;
}
