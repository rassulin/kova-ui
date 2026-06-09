import './tabs.scss';
import { ComponentChildren, h } from 'preact';
import { useState } from 'preact/hooks';

export interface Tab {
  key: string;
  label: ComponentChildren;
  content: ComponentChildren;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  variant?: 'pill' | 'line';
  class?: string;
}

export function Tabs({ tabs, defaultKey, activeKey, onChange, variant = 'pill', class: className = '' }: TabsProps) {
  const [internal, setInternal] = useState(defaultKey || tabs[0]?.key);
  const active = activeKey !== undefined ? activeKey : internal;

  function handleClick(key: string) {
    setInternal(key);
    onChange?.(key);
  }

  const current = tabs.find(t => t.key === active);

  return (
    <div class={['k-tabs', variant === 'line' ? 'k-tabs-line' : '', className].filter(Boolean).join(' ')}>
      <div class="k-tab-list" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.key}
            class={['k-tab', tab.key === active ? 'k-tab-active' : ''].filter(Boolean).join(' ')}
            role="tab"
            aria-selected={tab.key === active}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {current && (
        <div class="k-tab-panel" role="tabpanel">
          {current.content}
        </div>
      )}
    </div>
  );
}
