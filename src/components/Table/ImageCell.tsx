import { CellProps } from 'react-table';

export function ImageCell<TData extends object>({ value }: CellProps<TData>) {
  return <img src={value} alt={value} />;
}
