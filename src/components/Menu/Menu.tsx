import './menu.scss';
import { ComponentChildren, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';

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
  const [pos, setPos] = useState({ top: 0, left: 0, minWidth: 0, flipY: false });
  const triggerRef = useRef<HTMLDivElement>(null);

  function openMenu() {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const GAP = 6;
    const POPUP_W = Math.max(rect.width, 200);
    // Estimate height: ~38px per visible item + 12px padding
    const visibleItems = items.filter(i => i.type !== 'separator' && i.type !== 'label').length;
    const separators = items.filter(i => i.type === 'separator').length;
    const estimatedH = visibleItems * 38 + separators * 13 + 12;

    const spaceBelow = window.innerHeight - rect.bottom - GAP;
    const spaceAbove = rect.top - GAP;
    const flipY = spaceBelow < estimatedH && spaceAbove > spaceBelow;

    const top = flipY ? rect.top - estimatedH - GAP : rect.bottom + GAP;

    let left = align === 'right' ? rect.right - POPUP_W : rect.left;
    // Clamp horizontally
    if (left + POPUP_W > window.innerWidth - 8) left = window.innerWidth - POPUP_W - 8;
    if (left < 8) left = 8;

    setPos({ top, left, minWidth: rect.width, flipY });
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      const menu = document.querySelector('.k-menu-portal');
      if (triggerRef.current?.contains(e.target as Node)) return;
      if (menu && menu.contains(e.target as Node)) return;
      setOpen(false);
    }
    function onScroll() {
      setOpen(false);
    }
    document.addEventListener('mousedown', onMouseDown);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [open]);

  const menuEl = open
    ? createPortal(
        <div
          class={['k-menu', 'k-menu-portal', pos.flipY ? 'k-menu--flip' : ''].filter(Boolean).join(' ')}
          role="menu"
          style={{ top: `${pos.top}px`, left: `${pos.left}px`, minWidth: `${Math.max(pos.minWidth, 200)}px` }}
        >
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
        </div>,
        document.body,
      )
    : null;

  return (
    <div class={['k-menu-wrap', className].filter(Boolean).join(' ')} ref={triggerRef}>
      <div
        role="button"
        tabIndex={0}
        onClick={openMenu}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') openMenu();
        }}
        style={{ display: 'inline-flex', cursor: 'pointer' }}
      >
        {trigger}
      </div>
      {menuEl}
    </div>
  );
}
