import './icon.scss';
import { h } from 'preact';

// ─── Icon name union ──────────────────────────────────────────────────────────

export type IconName =
  // Navigation
  | 'arrow-left' | 'arrow-right' | 'arrow-up' | 'arrow-down'
  | 'chevron-left' | 'chevron-right' | 'chevron-up' | 'chevron-down'
  | 'external-link' | 'home'
  // Actions
  | 'plus' | 'minus' | 'x' | 'check' | 'search' | 'filter' | 'sort'
  | 'refresh' | 'download' | 'upload' | 'copy' | 'edit' | 'trash' | 'save' | 'share'
  // Status
  | 'info' | 'warning' | 'check-circle' | 'x-circle' | 'loader'
  // UI Controls
  | 'menu' | 'more-vertical' | 'more-horizontal' | 'settings' | 'bell'
  | 'calendar' | 'clock' | 'eye' | 'eye-off' | 'lock' | 'unlock'
  // Content
  | 'file' | 'folder' | 'image' | 'link' | 'mail' | 'user' | 'users'
  | 'tag' | 'star' | 'heart'
  // Dev / Technical
  | 'code' | 'terminal' | 'git-branch' | 'zap' | 'shield' | 'globe' | 'database' | 'server';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps {
  name: IconName;
  /** xs=12 sm=14 md=16 lg=20 xl=24 */
  size?: IconSize;
  /** Override size in px */
  px?: number;
  /** Accessible label — omit for decorative icons */
  label?: string;
  class?: string;
}

const SIZE_PX: Record<IconSize, number> = { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 };

/**
 * Renders an SVG icon from the kova-ui sprite sheet.
 * Mount <SpriteSheet /> once at your app root.
 *
 * @example
 * <Icon name="check" size="md" />                     // decorative
 * <Icon name="trash" size="sm" label="Delete item" /> // meaningful
 * <Icon name="loader" class="k-icon-spin" />           // spinning
 */
export function Icon({ name, size = 'md', px, label, class: className = '' }: IconProps) {
  const dim = px ?? SIZE_PX[size];
  const decorative = !label;

  return (
    <svg
      class={['k-icon', `k-icon-${size}`, className].filter(Boolean).join(' ')}
      width={dim}
      height={dim}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={!decorative ? label : undefined}
      role={!decorative ? 'img' : undefined}
      focusable="false"
    >
      <use href={`#k-icon-${name}`} />
    </svg>
  );
}

// ─── SpriteSheet ─────────────────────────────────────────────────────────────
// Mount once at your app root — renders a hidden SVG with all symbol defs.
// All Icon components reference these symbols via <use href="#k-icon-*" />

/**
 * @example
 * // In your App root:
 * import { SpriteSheet } from 'kova-ui'
 * function App() {
 *   return <><SpriteSheet /><Router /></>
 * }
 */
export function SpriteSheet() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'none', position: 'absolute', width: 0, height: 0 }}
    >
      {/* ── Navigation ──────────────────────────────────────────────────── */}
      <symbol id="k-icon-arrow-left"      viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" /></symbol>
      <symbol id="k-icon-arrow-right"     viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></symbol>
      <symbol id="k-icon-arrow-up"        viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></symbol>
      <symbol id="k-icon-arrow-down"      viewBox="0 0 24 24"><path d="M12 5v14M19 12l-7 7-7-7" /></symbol>
      <symbol id="k-icon-chevron-left"    viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></symbol>
      <symbol id="k-icon-chevron-right"   viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></symbol>
      <symbol id="k-icon-chevron-up"      viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6" /></symbol>
      <symbol id="k-icon-chevron-down"    viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></symbol>
      <symbol id="k-icon-external-link"   viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></symbol>
      <symbol id="k-icon-home"            viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></symbol>

      {/* ── Actions ─────────────────────────────────────────────────────── */}
      <symbol id="k-icon-plus"            viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></symbol>
      <symbol id="k-icon-minus"           viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" /></symbol>
      <symbol id="k-icon-x"               viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></symbol>
      <symbol id="k-icon-check"           viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></symbol>
      <symbol id="k-icon-search"          viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></symbol>
      <symbol id="k-icon-filter"          viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></symbol>
      <symbol id="k-icon-sort"            viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></symbol>
      <symbol id="k-icon-refresh"         viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></symbol>
      <symbol id="k-icon-download"        viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></symbol>
      <symbol id="k-icon-upload"          viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></symbol>
      <symbol id="k-icon-copy"            viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></symbol>
      <symbol id="k-icon-edit"            viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></symbol>
      <symbol id="k-icon-trash"           viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" /></symbol>
      <symbol id="k-icon-save"            viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></symbol>
      <symbol id="k-icon-share"           viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></symbol>

      {/* ── Status ──────────────────────────────────────────────────────── */}
      <symbol id="k-icon-info"            viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></symbol>
      <symbol id="k-icon-warning"         viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></symbol>
      <symbol id="k-icon-check-circle"    viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></symbol>
      <symbol id="k-icon-x-circle"        viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></symbol>
      <symbol id="k-icon-loader"          viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" /></symbol>

      {/* ── UI Controls ─────────────────────────────────────────────────── */}
      <symbol id="k-icon-menu"            viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></symbol>
      <symbol id="k-icon-more-vertical"   viewBox="0 0 24 24"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></symbol>
      <symbol id="k-icon-more-horizontal" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></symbol>
      <symbol id="k-icon-settings"        viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></symbol>
      <symbol id="k-icon-bell"            viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></symbol>
      <symbol id="k-icon-calendar"        viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></symbol>
      <symbol id="k-icon-clock"           viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></symbol>
      <symbol id="k-icon-eye"             viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></symbol>
      <symbol id="k-icon-eye-off"         viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></symbol>
      <symbol id="k-icon-lock"            viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></symbol>
      <symbol id="k-icon-unlock"          viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 019.9-1" /></symbol>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <symbol id="k-icon-file"            viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></symbol>
      <symbol id="k-icon-folder"          viewBox="0 0 24 24"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></symbol>
      <symbol id="k-icon-image"           viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></symbol>
      <symbol id="k-icon-link"            viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></symbol>
      <symbol id="k-icon-mail"            viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22 6 12 13 2 6" /></symbol>
      <symbol id="k-icon-user"            viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></symbol>
      <symbol id="k-icon-users"           viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></symbol>
      <symbol id="k-icon-tag"             viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></symbol>
      <symbol id="k-icon-star"            viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></symbol>
      <symbol id="k-icon-heart"           viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></symbol>

      {/* ── Dev / Technical ─────────────────────────────────────────────── */}
      <symbol id="k-icon-code"            viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></symbol>
      <symbol id="k-icon-terminal"        viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></symbol>
      <symbol id="k-icon-git-branch"      viewBox="0 0 24 24"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 01-9 9" /></symbol>
      <symbol id="k-icon-zap"             viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></symbol>
      <symbol id="k-icon-shield"          viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></symbol>
      <symbol id="k-icon-globe"           viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></symbol>
      <symbol id="k-icon-database"        viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></symbol>
      <symbol id="k-icon-server"          viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></symbol>
    </svg>
  );
}
