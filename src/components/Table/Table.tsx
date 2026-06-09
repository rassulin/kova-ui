import './table.scss';
import { type ComponentChildren, h } from 'preact';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';

// ─── Inline checkbox ──────────────────────────────────────────────────────────
// Self-contained so Table has no circular import on Checkbox component

interface CbProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label?: string;
}

function Cb({ checked, indeterminate = false, onChange, label }: CbProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <span class="k-tcb">
      <input
        ref={ref}
        type="checkbox"
        class="k-tcb-input"
        checked={checked}
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-label={label}
        onChange={onChange}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      />
      <span class="k-tcb-box" aria-hidden="true">
        <svg
          class="k-tcb-check"
          viewBox="0 0 10 10"
          fill="none"
          stroke="#fff"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="1.5,5 4,7.5 8.5,2" />
        </svg>
        <svg class="k-tcb-dash" viewBox="0 0 10 10" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round">
          <line x1="2" y1="5" x2="8" y2="5" />
        </svg>
      </span>
    </span>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Column<T = Record<string, unknown>> {
  key: string;
  title: string;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T, index: number) => ComponentChildren;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  rowKey?: string | ((row: T) => string);
  /** Show checkboxes for row selection */
  selectable?: boolean;
  /** Controlled selected row keys */
  selectedKeys?: string[];
  /** Called when selection changes */
  onSelectionChange?: (keys: string[]) => void;
  /**
   * Enable pagination.
   * `true` = defaults (pageSize 10, options 10/25/50/100)
   * object = custom defaults
   */
  pagination?:
    | boolean
    | {
        defaultPage?: number;
        defaultPageSize?: number;
        pageSizeOptions?: number[];
      };
  /** Controlled current page (server-side) */
  page?: number;
  /** Controlled page size (server-side) */
  pageSize?: number;
  /** Called when page changes */
  onPageChange?: (page: number) => void;
  /** Called when page size changes */
  onPageSizeChange?: (size: number) => void;
  /** Total rows for server-side pagination */
  total?: number;
  /** Called when a data cell row is clicked */
  onRowClick?: (row: T) => void;
  /** Show loading skeleton */
  loading?: boolean;
  /** Alternate row backgrounds */
  striped?: boolean;
  emptyText?: string;
  class?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getKey<T extends Record<string, unknown>>(row: T, i: number, rk: string | ((r: T) => string)): string {
  if (typeof rk === 'function') return rk(row);
  return String(row[rk] ?? i);
}

function pageRange(cur: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (cur <= 4) return [1, 2, 3, 4, 5, '…', total];
  if (cur >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '…', cur - 1, cur, cur + 1, '…', total];
}

// ─── Table ────────────────────────────────────────────────────────────────────

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey = 'id',
  selectable = false,
  selectedKeys: ctrlSelected,
  onSelectionChange,
  pagination,
  page: ctrlPage,
  pageSize: ctrlPageSize,
  onPageChange,
  onPageSizeChange,
  total: extTotal,
  onRowClick,
  loading = false,
  striped = false,
  emptyText = 'No data',
  class: className = '',
}: TableProps<T>) {
  // ── Sort ──────────────────────────────────────────────────────────────────
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  function handleSort(key: string) {
    if (sortKey === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  // ── Selection ─────────────────────────────────────────────────────────────
  const [intSelected, setIntSelected] = useState<string[]>([]);
  const selected = ctrlSelected ?? intSelected;

  const setSelected = useCallback(
    (keys: string[]) => {
      setIntSelected(keys);
      onSelectionChange?.(keys);
    },
    [onSelectionChange],
  );

  // ── Pagination ────────────────────────────────────────────────────────────
  const pagCfg = pagination === true ? {} : pagination || null;
  const pageSizeOpts = pagCfg?.pageSizeOptions ?? [10, 25, 50, 100];

  const [intPage, setIntPage] = useState(pagCfg?.defaultPage ?? 1);
  const [intPageSize, setIntPageSize] = useState(pagCfg?.defaultPageSize ?? 10);

  const activePage = ctrlPage ?? intPage;
  const activePageSize = ctrlPageSize ?? intPageSize;

  const handlePageChange = useCallback(
    (p: number) => {
      setIntPage(p);
      onPageChange?.(p);
    },
    [onPageChange],
  );
  const handlePageSizeChange = useCallback(
    (s: number) => {
      setIntPageSize(s);
      setIntPage(1);
      onPageSizeChange?.(s);
      onPageChange?.(1);
    },
    [onPageChange, onPageSizeChange],
  );

  // ── Sorted rows ───────────────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey] as string | number;
      const bv = b[sortKey] as string | number;
      const c = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? c : -c;
    });
  }, [data, sortKey, sortDir]);

  // ── Paginated slice ───────────────────────────────────────────────────────
  const isPaged = !!pagCfg;
  const total = extTotal ?? sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / activePageSize));

  const rows = useMemo(() => {
    if (!isPaged) return sorted;
    if (extTotal !== undefined) return sorted; // server-side: data is already sliced
    const start = (activePage - 1) * activePageSize;
    return sorted.slice(start, start + activePageSize);
  }, [isPaged, sorted, activePage, activePageSize, extTotal]);

  const rowKeys = useMemo(() => rows.map((r, i) => getKey(r, i, rowKey)), [rows, rowKey]);

  // Selection helpers for current page
  const selOnPage = rowKeys.filter(k => selected.includes(k));
  const allSelected = rowKeys.length > 0 && selOnPage.length === rowKeys.length;
  const someSel = selOnPage.length > 0 && !allSelected;

  function toggleAll() {
    if (allSelected) setSelected(selected.filter(k => !rowKeys.includes(k)));
    else setSelected([...new Set([...selected, ...rowKeys])]);
  }

  function toggleRow(key: string) {
    setSelected(selected.includes(key) ? selected.filter(k => k !== key) : [...selected, key]);
  }

  const fromRow = total === 0 ? 0 : (activePage - 1) * activePageSize + 1;
  const toRow = Math.min(activePage * activePageSize, total);
  const colCount = selectable ? columns.length + 1 : columns.length;

  return (
    <div class={['k-table-outer', className].filter(Boolean).join(' ')}>
      {/* ── Selection summary bar ────────────────────────────────────────── */}
      {selectable && selected.length > 0 && (
        <div class="k-table-sel-bar">
          <span class="k-table-sel-count">
            {selected.length} row{selected.length !== 1 ? 's' : ''} selected
          </span>
          <button type="button" class="k-table-sel-clear" onClick={() => setSelected([])}>
            Clear
          </button>
        </div>
      )}

      {/* ── Table ────────────────────────────────────────────────────────── */}
      <div class={['k-table-wrap', loading ? 'k-table-loading' : ''].filter(Boolean).join(' ')}>
        <table
          class={['k-table', columns.some(c => c.sortable) ? 'k-table-sortable' : '', striped ? 'k-table-striped' : '']
            .filter(Boolean)
            .join(' ')}
        >
          <thead>
            <tr>
              {selectable && (
                <th class="k-table-th-check">
                  <Cb checked={allSelected} indeterminate={someSel} onChange={toggleAll} label="Select all rows" />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={col.key}
                  style={{
                    ...(col.width ? { width: col.width } : {}),
                    ...(col.align ? { textAlign: col.align } : {}),
                  }}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    col.sortable && sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined
                  }
                >
                  <span class="k-table-th-inner">
                    {col.title}
                    {col.sortable && (
                      <span
                        class={['k-table-sort', sortKey === col.key ? `k-table-sort--${sortDir}` : '']
                          .filter(Boolean)
                          .join(' ')}
                        aria-hidden="true"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.5"
                          stroke-linecap="round"
                        >
                          {sortKey === col.key && sortDir === 'asc' && <path d="M12 19V5M5 12l7-7 7 7" />}
                          {sortKey === col.key && sortDir === 'desc' && <path d="M12 5v14M19 12l-7 7-7-7" />}
                          {sortKey !== col.key && (
                            <>
                              <path d="M5 10l7-7 7 7" opacity="0.35" />
                              <path d="M5 14l7 7 7-7" opacity="0.35" />
                            </>
                          )}
                        </svg>
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Loading skeleton */}
            {loading &&
              rows.length === 0 &&
              Array.from({ length: Math.min(activePageSize, 5) }).map((_, i) => (
                <tr key={`sk-${i}`}>
                  {selectable && (
                    <td>
                      <span class="k-table-skel" style={{ width: '18px' }} />
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={col.key}>
                      <span class="k-table-skel" />
                    </td>
                  ))}
                </tr>
              ))}

            {/* Empty state */}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={colCount} class="k-table-empty">
                  {emptyText}
                </td>
              </tr>
            )}

            {/* Data rows */}
            {rows.map((row, i) => {
              const key = rowKeys[i];
              const checked = selected.includes(key);
              return (
                <tr
                  key={key}
                  class={[
                    selectable ? 'k-table-row-selectable' : '',
                    selectable && checked ? 'k-table-row-selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-selected={selectable ? checked : undefined}
                  onClick={selectable ? () => toggleRow(key) : undefined}
                >
                  {selectable && (
                    <td class="k-table-td-check">
                      <Cb checked={checked} onChange={() => toggleRow(key)} label={`Select row ${i + 1}`} />
                    </td>
                  )}
                  {columns.map(col => (
                    <td
                      key={col.key}
                      style={col.align ? { textAlign: col.align } : {}}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                      onKeyDown={
                        onRowClick
                          ? (e: KeyboardEvent) => {
                              if (e.key === 'Enter') onRowClick(row);
                            }
                          : undefined
                      }
                      class={onRowClick ? 'k-table-td-click' : ''}
                    >
                      {col.render ? col.render(row[col.key as keyof T], row, i) : String(row[col.key as keyof T] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Pagination bar ───────────────────────────────────────────────── */}
      {isPaged && (
        <div class="k-table-pagination">
          <div class="k-table-pag-left">
            <span class="k-table-pag-info">{total === 0 ? 'No results' : `${fromRow}–${toRow} of ${total}`}</span>
            <label class="k-table-pag-size-wrap">
              <span class="k-table-pag-size-label">Rows</span>
              <select
                class="k-table-pag-size-select"
                value={activePageSize}
                onChange={e => handlePageSizeChange(Number((e.target as HTMLSelectElement).value))}
              >
                {pageSizeOpts.map(o => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div class="k-table-pag-right">
            <button
              type="button"
              class="k-table-pag-btn"
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage <= 1}
              aria-label="Previous page"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {pageRange(activePage, totalPages).map((p, i) =>
              p === '…' ? (
                <span key={`el${i}`} class="k-table-pag-ellipsis">
                  …
                </span>
              ) : (
                <button
                  type="button"
                  key={p}
                  class={['k-table-pag-btn', p === activePage ? 'k-table-pag-btn--active' : '']
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handlePageChange(p as number)}
                  aria-current={p === activePage ? 'page' : undefined}
                >
                  {p}
                </button>
              ),
            )}

            <button
              type="button"
              class="k-table-pag-btn"
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage >= totalPages}
              aria-label="Next page"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
