import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProductsApi } from '../../../api/ProductsApi';
import { ProductsModel } from '../../../data-types/models';
import { ProductTable } from '../ProductTable';

const renderComponent = () => <ProductTable />;

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

const mockError = new Error('Mock error');

describe('ProductTable', () => {
  const spy = jest.spyOn(ProductsApi, 'getProducts');

  beforeEach(() => {
    spy.mockClear();
  });

  describe('loading', () => {
    it('should render loading message when fetching', async () => {
      // arrange
      jest.useFakeTimers();
      spy.mockImplementationOnce(
        () =>
          new Promise((res) => {
            setTimeout(() => res(mockProductsModel), 1000);
          }),
      );
      render(renderComponent());

      // assert
      expect(screen.getByText(/Loading/)).toBeInTheDocument();
      jest.advanceTimersToNextTimer();
      await waitFor(() =>
        expect(screen.queryByText(/Loading/)).not.toBeInTheDocument(),
      );
      jest.useRealTimers();
    });
  });

  describe('rejected', () => {
    it('should render retry button when rejected', async () => {
      // arrange
      spy.mockRejectedValueOnce(mockError);
      render(renderComponent());

      // assert
      expect(
        await screen.findByRole('button', { name: /Retry/ }),
      ).toBeInTheDocument();
    });

    it('should refetch when retry button is clicked', async () => {
      // arrange
      spy.mockRejectedValueOnce(mockError);
      render(renderComponent());

      // act
      const button = await screen.findByRole('button', { name: /Retry/ });
      spy.mockResolvedValue(mockProductsModel);
      userEvent.click(button);

      // assert
      await waitFor(() => expect(spy).toHaveBeenCalledTimes(2));
    });
  });

  describe('Table', () => {
    beforeEach(() => {
      spy.mockResolvedValue(mockProductsModel);
    });

    it('should match table snapshot', async () => {
      // arrange
      const { container } = render(renderComponent());

      // act
      await waitFor(() =>
        expect(screen.queryByText(/Loading/)).not.toBeInTheDocument(),
      );

      // assert
      expect(container).toMatchSnapshot();
    });
  });
});
