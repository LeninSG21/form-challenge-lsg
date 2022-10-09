import { useMemo } from 'react';

import {
  useTable,
  Column,
  useSortBy,
  useFlexLayout,
  useFilters,
  useGlobalFilter,
} from 'react-table';

import {
  ExtendedColumn,
  ExtendedHeaderGroup,
  ExtendedTableInstance,
} from './Table.types';

import './Table.scss';
import { GlobalFilter } from './GlobalFilter';

export type TableProps<TData extends object> = {
  data: TData[];
  columns: ReadonlyArray<Column<TData>>;
  withGlobalFilter?: boolean;
};

export function Table<TData extends object>({
  data,
  columns,
  withGlobalFilter,
}: TableProps<TData>) {
  const defaultColumn = useMemo<ExtendedColumn<TData>>(
    () => ({
      Filter: '',
      columns: [],
      id: '',
    }),
    [],
  );
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
    state: { filters, globalFilter },
    setAllFilters,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    { columns, data, defaultColumn },
    useFlexLayout,
    useFilters,
    useGlobalFilter,
    useSortBy,
  ) as ExtendedTableInstance<TData>;

  const handleResetFilters = () => {
    setGlobalFilter(undefined);
    setAllFilters([]);
  };

  return (
    <>
      <div className="general-filters">
        {withGlobalFilter && (
          <GlobalFilter
            totalCount={preGlobalFilteredRows.length}
            setGlobalFilter={setGlobalFilter}
            filterValue={globalFilter}
          />
        )}
        {(!!filters.length || globalFilter) && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="reset-btn"
          >
            Reset filters
          </button>
        )}
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                //* This workaround is needed since the typings of react-table with plugins do not work as expected.
                //* It is better than using any
                const extendedColumn = column as ExtendedHeaderGroup<TData>;
                return (
                  <th {...extendedColumn.getHeaderProps()}>
                    <div {...extendedColumn.getSortByToggleProps()}>
                      {extendedColumn.render('Header')}
                      {extendedColumn.canSort &&
                        !extendedColumn.isSorted &&
                        ' ↕️'}
                      {extendedColumn.isSorted && (
                        <span>
                          {extendedColumn.isSortedDesc ? ' 🔽' : ' 🔼'}
                        </span>
                      )}
                    </div>
                    {extendedColumn.canFilter && (
                      <div>{column.render('Filter')}</div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
