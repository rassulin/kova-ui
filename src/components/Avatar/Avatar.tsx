import './avatar.scss';
import { h } from 'preact';

const COLORS = ['#8b5cf6', '#22d3ee', '#4ade80', '#f472b6', '#fbbf24', '#f87171', '#60a5fa'];

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase();
}

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  class?: string;
}

export function Avatar({ src, name = '', size = 'md', class: className = '' }: AvatarProps) {
  const color = getColor(name);
  return (
    <span
      class={['k-avatar', `k-avatar-${size}`, className].filter(Boolean).join(' ')}
      style={!src ? { background: `${color}22`, color } : {}}
      title={name}
    >
      {src ? <img src={src} alt={name} /> : initials(name)}
    </span>
  );
}

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarSize;
}

export function AvatarGroup({ avatars, max = 4, size = 'md' }: AvatarGroupProps) {
  const shown = avatars.slice(0, max);
  const rest = avatars.length - max;
  return (
    <div class="k-avatar-group">
      {shown.map((a, i) => (
        <Avatar key={i} {...a} size={size} />
      ))}
      {rest > 0 && (
        <span class={`k-avatar k-avatar-${size}`} style={{ background: 'var(--k-surface-3)', color: 'var(--k-muted)' }}>
          +{rest}
        </span>
      )}
    </div>
  );
}
