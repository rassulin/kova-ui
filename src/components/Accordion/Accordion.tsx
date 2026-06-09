import './accordion.scss';
import { ComponentChildren, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

export interface AccordionItem {
  key: string;
  title: string;
  content: ComponentChildren;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string[];
  multiple?: boolean;
  class?: string;
}

function AccordionItemEl({ item, open, onToggle }: { item: AccordionItem; open: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) setHeight(bodyRef.current.scrollHeight);
  }, [item.content, open]);

  return (
    <div class={['k-accordion-item', open ? 'k-accordion-open' : ''].filter(Boolean).join(' ')}>
      <button class="k-accordion-trigger" onClick={onToggle} aria-expanded={open}>
        {item.title}
        <svg
          class="k-accordion-chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div class="k-accordion-body" style={{ maxHeight: open ? `${height}px` : '0' }}>
        <div class="k-accordion-content" ref={bodyRef}>
          {item.content}
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items, defaultOpen = [], multiple = false, class: className = '' }: AccordionProps) {
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpen);

  function toggle(key: string) {
    setOpenKeys(prev => {
      if (prev.includes(key)) return prev.filter(k => k !== key);
      return multiple ? [...prev, key] : [key];
    });
  }

  return (
    <div class={['k-accordion', className].filter(Boolean).join(' ')}>
      {items.map(item => (
        <AccordionItemEl
          key={item.key}
          item={item}
          open={openKeys.includes(item.key)}
          onToggle={() => toggle(item.key)}
        />
      ))}
    </div>
  );
}
