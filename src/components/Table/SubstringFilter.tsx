import { ExtendedHeaderGroup } from './Table.types';

type SubstringFilterProps<TData extends object> = {
  column: ExtendedHeaderGroup<TData>;
};

export function SubstringFilter<TData extends object>({
  column: { preFilteredRows, filterValue, setFilter },
}: SubstringFilterProps<TData>) {
  const count = preFilteredRows.length;

  return (
    <input
      className="substring-filter"
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} items...`}
    />
  );
}
