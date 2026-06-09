import './menu.scss';
import { ComponentChildren, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

export interface MenuItem {
  key: string;
  label: string;
  icon?: ComponentChildren;
  danger?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  type?: 'item' | 'separator' | 'label';
}

export interface MenuProps {
  trigger: ComponentChildren;
  items: MenuItem[];
  align?: 'left' | 'right';
  class?: string;
}

export function Menu({ trigger, items, align = 'left', class: className = '' }: MenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div class={['k-menu-wrap', className].filter(Boolean).join(' ')} ref={ref}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(o => !o)}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') setOpen(o => !o);
        }}
        style={{ display: 'inline-flex', cursor: 'pointer' }}
      >
        {trigger}
      </div>
      {open && (
        <div class={['k-menu', align === 'right' ? 'k-menu-right' : ''].filter(Boolean).join(' ')} role="menu">
          {items.map(item => {
            if (item.type === 'separator') return <div key={item.key} class="k-menu-separator" role="separator" />;
            if (item.type === 'label')
              return (
                <div key={item.key} class="k-menu-label">
                  {item.label}
                </div>
              );
            const cls = ['k-menu-item', item.danger ? 'k-menu-item-danger' : ''].filter(Boolean).join(' ');
            function handleClick() {
              if (!item.disabled) {
                item.onClick?.();
                setOpen(false);
              }
            }
            if (item.href) {
              return (
                <a key={item.key} href={item.href} class={cls} role="menuitem">
                  {item.icon && <span class="k-menu-item-icon">{item.icon}</span>}
                  {item.label}
                </a>
              );
            }
            return (
              <button key={item.key} class={cls} role="menuitem" onClick={handleClick} disabled={item.disabled}>
                {item.icon && <span class="k-menu-item-icon">{item.icon}</span>}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
