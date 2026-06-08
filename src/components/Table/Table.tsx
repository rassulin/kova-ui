import './table.scss';
import { type ComponentChildren, h } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';

// ─── Checkbox (inline — avoids circular import) ────────────────────────────────

interface InlineCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label?: string;
}

function Cb({ checked, indeterminate = false, onChange, label }: InlineCheckboxProps) {
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: label handles interaction
    <label
      class="k-table-cb-wrap"
      onClick={e => {
        e.stopPropagation();
        onChange();
      }}
      onKeyDown={e => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.stopPropagation();
          onChange();
        }
      }}
    >
      <span class="k-table-cb">
        <input
          type="checkbox"
          checked={checked}
          // biome-ignore lint/suspicious/noExplicitAny: indeterminate is a DOM property
          ref={(el: any) => {
            if (el) el.indeterminate = indeterminate;
          }}
          onChange={onChange}
          aria-checked={indeterminate ? 'mixed' : checked}
          aria-label={label}
        />
        <span class="k-table-cb-box">
          {/* Check mark */}
          <svg
            aria-hidden="true"
            class="k-table-cb-check"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="#fff"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="1.5,5 4,7.5 8.5,2" />
          </svg>
          {/* Dash for indeterminate */}
          <svg
            aria-hidden="true"
            class="k-table-cb-dash"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
          >
            <line x1="2" y1="5" x2="8" y2="5" />
          </svg>
        </span>
      </span>
    </label>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Column<T = Record<string, unknown>> {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T, index: number) => ComponentChildren;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  rowKey?: string | ((row: T) => string);
  /** Enable row selection checkboxes */
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  pagination?: boolean | { defaultPage?: number; defaultPageSize?: number; pageSizeOptions?: number[] };
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  total?: number;
  class?: string;
  emptyText?: string;
  loading?: boolean;
  onRowClick?: (row: T) => void;
  striped?: boolean;
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

function SortIcon({ dir }: { dir: 'asc' | 'desc' | null }) {
  return (
    <span class={`k-table-sort-icon${dir ? ` k-table-sort-${dir}` : ''}`} aria-hidden="true">
      <svg
        aria-hidden="true"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
      >
        {dir === 'asc' && <path d="M12 19V5M5 12l7-7 7 7" />}
        {dir === 'desc' && <path d="M12 5v14M19 12l-7 7-7-7" />}
        {!dir && (
          <>
            <path d="M5 10l7-7 7 7" opacity="0.3" />
            <path d="M5 14l7 7 7-7" opacity="0.3" />
          </>
        )}
      </svg>
    </span>
  );
}

function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
    >
      {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
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
  class: className = '',
  emptyText = 'No data',
  loading = false,
  onRowClick,
  striped = false,
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

  // ── Sorted + paginated rows ────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey] as string | number;
      const bv = b[sortKey] as string | number;
      const c = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? c : -c;
    });
  }, [data, sortKey, sortDir]);

  const isPaged = !!pagCfg;
  const total = extTotal ?? sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / activePageSize));

  const rows = useMemo(() => {
    if (!isPaged) return sorted;
    if (extTotal !== undefined) return sorted;
    const s = (activePage - 1) * activePageSize;
    return sorted.slice(s, s + activePageSize);
  }, [isPaged, sorted, activePage, activePageSize, extTotal]);

  const rowKeys = useMemo(() => rows.map((r, i) => getKey(r, i, rowKey)), [rows, rowKey]);

  // Selection state for current page
  const selectedOnPage = rowKeys.filter(k => selected.includes(k));
  const allPageSelected = rowKeys.length > 0 && selectedOnPage.length === rowKeys.length;
  const someSelected = selectedOnPage.length > 0 && !allPageSelected;

  function toggleAll() {
    if (allPageSelected) {
      setSelected(selected.filter(k => !rowKeys.includes(k)));
    } else {
      setSelected([...new Set([...selected, ...rowKeys])]);
    }
  }

  function toggleRow(key: string) {
    setSelected(selected.includes(key) ? selected.filter(k => k !== key) : [...selected, key]);
  }

  const fromRow = total === 0 ? 0 : (activePage - 1) * activePageSize + 1;
  const toRow = Math.min(activePage * activePageSize, total);

  return (
    <div class={['k-table-outer', className].filter(Boolean).join(' ')}>
      {/* Selection bar */}
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

      <div class={['k-table-wrap', loading ? 'k-table-loading' : ''].filter(Boolean).join(' ')}>
        <table
          class={[
            'k-table',
            columns.some(c => c.sortable) ? 'k-table-sortable' : '',
            striped ? 'k-table-striped' : '',
            selectable ? 'k-table-selectable' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <thead>
            <tr>
              {selectable && (
                <th class="k-table-th-check">
                  <Cb checked={allPageSelected} indeterminate={someSelected} onChange={toggleAll} label="Select all" />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={col.key}
                  style={{ ...(col.width ? { width: col.width } : {}), ...(col.align ? { textAlign: col.align } : {}) }}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    col.sortable && sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined
                  }
                >
                  <span class="k-table-th-inner">
                    {col.title}
                    {col.sortable && <SortIcon dir={sortKey === col.key ? sortDir : null} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && rows.length === 0 ? (
              Array.from({ length: Math.min(activePageSize, 5) }).map((_, i) => (
                <tr key={`sk-${i}`} class="k-table-skeleton-row">
                  {selectable && (
                    <td>
                      <span class="k-table-skeleton-cell" style={{ width: '18px' }} />
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={col.key}>
                      <span class="k-table-skeleton-cell" />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={selectable ? columns.length + 1 : columns.length} class="k-table-empty">
                  {emptyText}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => {
                const key = rowKeys[i];
                const checked = selected.includes(key);
                return (
                  <tr
                    key={key}
                    class={[
                      onRowClick ? 'k-table-row-clickable' : '',
                      selectable && checked ? 'k-table-row-selected' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-selected={selectable ? checked : undefined}
                  >
                    {selectable && (
                      <td class="k-table-td-check">
                        {/* Checkbox cell — stopPropagation so it never triggers onRowClick */}
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
                        {col.render
                          ? col.render(row[col.key as keyof T], row, i)
                          : String(row[col.key as keyof T] ?? '')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {isPaged && (
        <div class="k-table-pagination">
          <div class="k-table-pagination-left">
            <span class="k-table-row-count">{total === 0 ? 'No results' : `${fromRow}–${toRow} of ${total}`}</span>
            <div class="k-table-page-size">
              <label class="k-table-page-size-label" htmlFor="k-pg-size">
                Rows
              </label>
              <select
                id="k-pg-size"
                class="k-table-page-size-select"
                value={activePageSize}
                onChange={e => handlePageSizeChange(Number((e.target as HTMLSelectElement).value))}
              >
                {pageSizeOpts.map(o => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div class="k-table-pagination-right">
            <button
              type="button"
              class="k-table-pg-btn"
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage <= 1}
              aria-label="Previous page"
            >
              <ChevronIcon dir="left" />
            </button>
            {pageRange(activePage, totalPages).map((p, i) =>
              p === '…' ? (
                // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis positions are stable
                <span key={`el-${i}`} class="k-table-pg-ellipsis">
                  …
                </span>
              ) : (
                <button
                  type="button"
                  key={p}
                  class={['k-table-pg-btn', p === activePage ? 'k-table-pg-active' : ''].filter(Boolean).join(' ')}
                  onClick={() => handlePageChange(p as number)}
                  aria-current={p === activePage ? 'page' : undefined}
                >
                  {p}
                </button>
              ),
            )}
            <button
              type="button"
              class="k-table-pg-btn"
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage >= totalPages}
              aria-label="Next page"
            >
              <ChevronIcon dir="right" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
