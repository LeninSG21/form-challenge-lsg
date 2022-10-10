import {
  ExtendedColumn,
  ImageCell,
  SubstringFilter,
} from '../../components/Table';
import { NumberRangeFilter } from '../../components/Table/NumberRangeFilter';
import { ProductModel } from '../../data-types/models';

export const COLUMNS: ExtendedColumn<ProductModel>[] = [
  {
    Header: 'Code',
    accessor: (props) => props.code,
    //* The typing for react-table is not generic enough to know the plugins used. Thus, the column typing
    //* is not updated and some important props do not appear as column instance. To solve this, a custom
    //* react-table.d.ts can be made to manually select the plugins and update the column instance. For the
    //* purpose of this challenge, this was ommited, which is why the "any" solution was used. However, in a real
    //* implementation, the custom typing could be the best option.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Filter: SubstringFilter as any,
  },
  {
    Header: 'Position',
    accessor: (props) => props.position,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Filter: NumberRangeFilter as any, //* Same comment as above
    filter: 'between',
  },
  {
    Header: 'Quantity',
    accessor: (props) => props.quantity,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Filter: NumberRangeFilter as any, //* Same comment as above
    filter: 'between',
  },
  {
    Header: 'Price',
    accessor: (props) => props.price,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Filter: NumberRangeFilter as any, //* Same comment as above
    filter: 'between',
  },
  {
    Header: 'Image',
    accessor: (props) => props.image,
    disableSortBy: true,
    Cell: ImageCell,
    width: 300,
  },
  {
    Header: 'Description',
    accessor: (props) => props.description,
    disableSortBy: true,
    width: 300,
  },
];
