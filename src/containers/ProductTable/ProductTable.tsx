import { Table } from '../../components/Table';
import { useProducts } from '../../hooks/useProducts';
import { COLUMNS } from './columns.config';

export function ProductTable() {
  const { products, isLoading, isRejected, fetchProducts } = useProducts();

  if (isLoading) return <div>Loading data...</div>;
  if (isRejected) {
    return (
      <div>
        Something went wrong. Please, try again.{' '}
        <button type="button" onClick={fetchProducts}>
          Retry
        </button>
      </div>
    );
  }
  return <Table columns={COLUMNS} data={products} />;
}
