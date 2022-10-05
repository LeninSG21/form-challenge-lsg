import { ExtendedColumn } from '../../components/Table';
import { ProductModel } from '../../data-types/models';

export const COLUMNS: ExtendedColumn<ProductModel>[] = [
  {
    Header: 'Code',
    accessor: (props) => props.code,
  },
  {
    Header: 'Position',
    accessor: (props) => props.position,
  },
  {
    Header: 'Quantity',
    accessor: (props) => props.quantity,
  },
  {
    Header: 'Price',
    accessor: (props) => props.price,
  },
  {
    Header: 'Image',
    accessor: (props) => props.image,
    disableSortBy: true,
  },
  {
    Header: 'Description',
    accessor: (props) => props.description,
    disableSortBy: true,
  },
];
