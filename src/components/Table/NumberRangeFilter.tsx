import { useEffect, useRef } from 'react';
import { useAsyncDebounce } from 'react-table';
import { ExtendedHeaderGroup } from './Table.types';

type NumberRangeFilterProps<TData extends object> = {
  column: ExtendedHeaderGroup<TData>;
};

export function NumberRangeFilter<TData extends object>({
  column: { setFilter, filterValue = [] },
}: NumberRangeFilterProps<TData>) {
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const handleOnChangeDebounced = useAsyncDebounce(
    (value: string, type: 'min' | 'max') => {
      const numberValue = value ? parseInt(value, 10) : undefined;
      if (type === 'min') {
        setFilter((prev = []) => [numberValue, prev[1]]);
      } else {
        setFilter((prev = []) => [prev[0], numberValue]);
      }
    },
    300,
  );

  //* Doing a controlled input affects user experience since a debounce is used to change the filter type
  //* However, when resetting the filters, it is important to control the value shown in the input
  //* That is why a reference is created, to change the ref value whenever the filters change. This yields
  //* a "hybrid" experience, since React is only rendering once, when the debounce is called, but still we
  //* can control what is shown in the input with an external state.
  //* Another approach to solve this same issue is shown in the component GlobalFilter
  useEffect(() => {
    if (minRef.current) {
      minRef.current.value = filterValue[0] ?? '';
    }
    if (maxRef.current) {
      maxRef.current.value = filterValue[1] ?? '';
    }
  }, [filterValue]);

  return (
    <div className="range-filter">
      <input
        ref={minRef}
        type="number"
        onChange={(e) => handleOnChangeDebounced(e.target.value, 'min')}
        placeholder="Min"
      />
      to
      <input
        ref={maxRef}
        type="number"
        onChange={(e) => handleOnChangeDebounced(e.target.value, 'max')}
        placeholder="Max"
      />
    </div>
  );
}
