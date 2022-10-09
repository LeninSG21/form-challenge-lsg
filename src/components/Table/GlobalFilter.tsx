import { ChangeEventHandler, useEffect, useState } from 'react';
import { useAsyncDebounce } from 'react-table';

type GlobalFilterProps = {
  setGlobalFilter: (value: string | undefined) => void;
  filterValue: string;
  totalCount: number;
};

export function GlobalFilter({
  setGlobalFilter,
  filterValue,
  totalCount,
}: GlobalFilterProps) {
  const [value, setValue] = useState(filterValue);
  const handleChangeDebounced = useAsyncDebounce(
    (val: string) => setGlobalFilter(val || undefined),
    300,
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    handleChangeDebounced(e.target.value);
  };

  useEffect(() => {
    if (value !== filterValue) {
      setValue(filterValue ?? '');
    }
  }, [filterValue]);

  return (
    <input
      placeholder={`Search ${totalCount} items...`}
      onChange={handleChange}
      value={value}
    />
  );
}
