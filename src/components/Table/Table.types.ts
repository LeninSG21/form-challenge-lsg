import {
  Column,
  HeaderGroup,
  UseSortByColumnProps,
  UseSortByColumnOptions,
  UseFiltersColumnProps,
  UseFiltersColumnOptions,
  TableInstance,
  UseSortByInstanceProps,
  UseFiltersInstanceProps,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersColumnOptions,
  UseFiltersState,
  UseSortByState,
  UseGlobalFiltersState,
} from 'react-table';

export type ExtendedHeaderGroup<TData extends object> = HeaderGroup<TData> &
  UseSortByColumnProps<TData> &
  UseFiltersColumnProps<TData>;

export type ExtendedColumn<TData extends object> = Column<TData> &
  UseSortByColumnOptions<TData> &
  UseFiltersColumnOptions<TData> &
  UseGlobalFiltersColumnOptions<TData>;

export type ExtendedTableInstance<TData extends object> = TableInstance<TData> &
  UseSortByInstanceProps<TData> &
  UseFiltersInstanceProps<TData> &
  UseGlobalFiltersInstanceProps<TData> & {
    state: TableInstance<TData>['state'] &
      UseFiltersState<TData> &
      UseGlobalFiltersState<TData> &
      UseSortByState<TData>;
  };
