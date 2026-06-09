import './datepicker.scss';
import { h } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { generateId } from '../../utils/generateId';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Returns 0=Mon … 6=Sun for the first day of month
function getFirstDayOffset(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return (d + 6) % 7;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDate(date: Date, fmt: string): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return fmt.replace('YYYY', String(y)).replace('MM', m).replace('DD', d);
}

function parseDate(str: string, fmt: string): Date | null {
  const yIdx = fmt.indexOf('YYYY');
  const mIdx = fmt.indexOf('MM');
  const dIdx = fmt.indexOf('DD');
  if (yIdx === -1 || mIdx === -1 || dIdx === -1) return null;
  try {
    const y = parseInt(str.slice(yIdx, yIdx + 4), 10);
    const m = parseInt(str.slice(mIdx, mIdx + 2), 10) - 1;
    const d = parseInt(str.slice(dIdx, dIdx + 2), 10);
    const date = new Date(y, m, d);
    if (isNaN(date.getTime())) return null;
    return date;
  } catch {
    return null;
  }
}

export interface DatePickerProps {
  /** Currently selected date */
  value?: Date | null;
  /** Called when user selects a date */
  onChange?: (date: Date) => void;
  /** Display format for the input (default: 'YYYY-MM-DD') */
  format?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disable specific dates */
  disabledDates?: Date[];
  /** Label shown above the input */
  label?: string;
  /** Error message */
  error?: string;
  /** Hint below the input */
  hint?: string;
  /** Disable the picker entirely */
  disabled?: boolean;
  class?: string;
}

export function DatePicker({
  value,
  onChange,
  format = 'YYYY-MM-DD',
  placeholder,
  minDate,
  maxDate,
  disabledDates = [],
  label,
  error,
  hint,
  disabled = false,
  class: className = '',
}: DatePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState((value ?? today).getFullYear());
  const [viewMonth, setViewMonth] = useState((value ?? today).getMonth());
  const [inputVal, setInputVal] = useState(value ? formatDate(value, format) : '');
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useRef(generateId('dp')).current;
  const popupId = `${id}-popup`;

  // Sync display when value prop changes externally
  useEffect(() => {
    setInputVal(value ? formatDate(value, format) : '');
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
  }, [value, format]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const isDisabled = useCallback(
    (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return disabledDates.some(d => isSameDay(d, date));
    },
    [minDate, maxDate, disabledDates],
  );

  function selectDate(date: Date) {
    if (isDisabled(date)) return;
    setInputVal(formatDate(date, format));
    onChange?.(date);
    setOpen(false);
    inputRef.current?.focus();
  }

  function handleInputChange(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    setInputVal(val);
    const parsed = parseDate(val, format);
    if (parsed) {
      setViewYear(parsed.getFullYear());
      setViewMonth(parsed.getMonth());
      onChange?.(parsed);
    }
  }

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear(y => y - 1);
      setViewMonth(11);
    } else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear(y => y + 1);
      setViewMonth(0);
    } else setViewMonth(m => m + 1);
  }

  // Build calendar grid
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstOffset = getFirstDayOffset(viewYear, viewMonth);
  const prevDays = getDaysInMonth(viewYear, viewMonth === 0 ? 11 : viewMonth - 1);
  const cells: { date: Date; current: boolean }[] = [];

  // Trailing days from previous month
  for (let i = firstOffset - 1; i >= 0; i--) {
    const d =
      viewMonth === 0 ? new Date(viewYear - 1, 11, prevDays - i) : new Date(viewYear, viewMonth - 1, prevDays - i);
    cells.push({ date: d, current: false });
  }
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ date: new Date(viewYear, viewMonth, i), current: true });
  }
  // Leading days from next month
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    const d = viewMonth === 11 ? new Date(viewYear + 1, 0, i) : new Date(viewYear, viewMonth + 1, i);
    cells.push({ date: d, current: false });
  }

  const ph = placeholder ?? format.toLowerCase();

  return (
    <div class={['k-dp-wrap', className].filter(Boolean).join(' ')} ref={wrapRef}>
      {label && (
        <label class="k-label" for={id}>
          {label}
        </label>
      )}

      <div class="k-dp-input-row">
        <div class="k-input-field-wrap">
          <input
            id={id}
            ref={inputRef}
            class={['k-input', 'k-dp-input', error ? 'k-input-error' : ''].filter(Boolean).join(' ')}
            type="text"
            value={inputVal}
            placeholder={ph}
            disabled={disabled}
            role="combobox"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={popupId}
            onInput={handleInputChange}
            onFocus={() => !disabled && setOpen(true)}
            readOnly
          />
          <button
            class="k-dp-icon-btn"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Open calendar"
            onClick={() => !disabled && setOpen(o => !o)}
            type="button"
          >
            <CalendarIcon />
          </button>
        </div>
      </div>

      {error && <span class="k-error-msg">{error}</span>}
      {hint && !error && <span class="k-hint">{hint}</span>}

      {open && (
        <div id={popupId} class="k-dp-popover" role="dialog" aria-label="Date picker">
          {/* Header */}
          <div class="k-dp-header">
            <button class="k-dp-nav" onClick={prevMonth} aria-label="Previous month" type="button">
              <ChevronLeftIcon />
            </button>
            <div class="k-dp-heading">
              {MONTHS[viewMonth]} {viewYear}
            </div>
            <button class="k-dp-nav" onClick={nextMonth} aria-label="Next month" type="button">
              <ChevronRightIcon />
            </button>
          </div>

          {/* Day names */}
          <div class="k-dp-grid">
            {DAYS.map(d => (
              <div key={d} class="k-dp-day-name">
                {d}
              </div>
            ))}

            {/* Day cells */}
            {cells.map(({ date, current }, i) => {
              const isToday = isSameDay(date, today);
              const isSelected = value ? isSameDay(date, value) : false;
              const isOff = isDisabled(date);

              const cls = [
                'k-dp-cell',
                !current && 'k-dp-cell--outside',
                isToday && 'k-dp-cell--today',
                isSelected && 'k-dp-cell--selected',
                isOff && 'k-dp-cell--disabled',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={i}
                  class={cls}
                  type="button"
                  disabled={isOff}
                  aria-label={formatDate(date, 'YYYY-MM-DD')}
                  aria-pressed={isSelected}
                  onClick={() => selectDate(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer — Today shortcut */}
          <div class="k-dp-footer">
            <button
              class="k-dp-today-btn"
              type="button"
              disabled={isDisabled(today)}
              onClick={() => {
                setViewYear(today.getFullYear());
                setViewMonth(today.getMonth());
                selectDate(today);
              }}
            >
              Today
            </button>
            <button
              class="k-dp-clear-btn"
              type="button"
              onClick={() => {
                setInputVal('');
                onChange?.(null!);
                setOpen(false);
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function CalendarIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function ChevronLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
