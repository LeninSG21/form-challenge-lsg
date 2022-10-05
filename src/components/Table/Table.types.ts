import {
  Column,
  HeaderGroup,
  UseSortByColumnProps,
  UseSortByColumnOptions,
} from 'react-table';

export type ExtendedHeaderGroup<TData extends object> = HeaderGroup<TData> &
  UseSortByColumnProps<TData>;

export type ExtendedColumn<TData extends object> = Column<TData> &
  UseSortByColumnOptions<TData>;
