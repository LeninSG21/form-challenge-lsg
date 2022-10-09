import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProductsApi } from '../../api/ProductsApi';
import { ProductsModel } from '../../data-types/models';
import { useProducts } from '../useProducts';

function TestComponent({
  callInInitialRender,
}: {
  callInInitialRender: boolean;
}) {
  const { isLoading, isResolved, isRejected, fetchProducts } =
    useProducts(callInInitialRender);
  return (
    <div>
      {isLoading && <div data-testid="loading" />}
      {isResolved && <div data-testid="resolved" />}
      {isRejected && <div data-testid="rejected" />}
      <button type="button" onClick={fetchProducts}>
        refetch
      </button>
    </div>
  );
}

const mockProductsModel: ProductsModel = [
  {
    code: 'HWR16-03',
    position: 1,
    quantity: 1,
    image: '01.png',
    price: 500,
    description:
      'Upright for room designs incl. floor profile in stainless steel appearance, depth: 250 - 900 mm, edging on both sides, Plinth height 70 mm: 2253 mm Plinth height 100 mm: 2283 mm Plinth height 150 mm: 2333 mm Plinth height 200 mm: 2383 mm',
  },
];

describe('useProducts', () => {
  const spy = jest.spyOn(ProductsApi, 'getProducts');

  beforeEach(() => {
    spy.mockClear();
  });

  describe('status test', () => {
    it('should return isLoading=true before making the request', () => {
      // arrange
      render(<TestComponent callInInitialRender={false} />);

      // assert
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('should return isLoading=true while making the request', () => {
      // arrange
      render(<TestComponent callInInitialRender />);

      // assert
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('should return isPending=true when request is resolved', async () => {
      // arrange
      spy.mockResolvedValue(mockProductsModel);
      render(<TestComponent callInInitialRender />);

      // assert
      await waitFor(() =>
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument(),
      );
      expect(screen.getByTestId('resolved')).toBeInTheDocument();
    });

    it('should return isRejected=true when request is resolved', async () => {
      // arrange
      spy.mockRejectedValue(new Error('Something went wrong'));
      render(<TestComponent callInInitialRender />);

      // assert
      await waitFor(() =>
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument(),
      );
      expect(screen.getByTestId('rejected')).toBeInTheDocument();
    });
  });

  describe('refetch', () => {
    it('should refetch products when fetchProducts is called', async () => {
      // arrange
      spy.mockResolvedValue(mockProductsModel);
      render(<TestComponent callInInitialRender={false} />);

      // act
      userEvent.click(screen.getByRole('button'));
      await waitFor(() =>
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument(),
      );

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
