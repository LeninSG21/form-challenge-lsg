import { useTable, Column, useSortBy } from 'react-table';

import { ExtendedHeaderGroup } from './Table.types';

import './Table.scss';

export type TableProps<TData extends object> = {
  data: TData[];
  columns: ReadonlyArray<Column<TData>>;
};

export function Table<TData extends object>({
  data,
  columns,
}: TableProps<TData>) {
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              //* This workaround is needed since the typings of react-table with plugins do not work as expected.
              //* It is better than using any
              const extendedColumn = column as ExtendedHeaderGroup<TData>;
              return (
                <th
                  {...extendedColumn.getHeaderProps(
                    extendedColumn.getSortByToggleProps(),
                  )}
                >
                  {extendedColumn.render('Header')}
                  {extendedColumn.isSorted && (
                    <span>{extendedColumn.isSortedDesc ? ' ↕️' : ' 🔼'}</span>
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
  );
}
