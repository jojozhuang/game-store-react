// Products.test.js
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Products from './Products';
import productApi from '../../api/ProductsApi';
import AlertSimple from '../controls/AlertSimple';

// Mock the API
jest.mock('../../api/ProductsApi');
jest.mock('../controls/AlertSimple', () => ({ error }) => <div>{error.message}</div>);

describe('Products component', () => {
  const mockProducts = [
    { id: 1, productName: 'Product 1', price: 10, image: 'img1.jpg' },
    { id: 2, productName: 'Product 2', price: 20, image: 'img2.jpg' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and displays products on mount', async () => {
    productApi.getAllProducts.mockResolvedValue(mockProducts);

    render(<Products />);

    // Wait for products to appear in the DOM
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  test('displays error alert when API fails', async () => {
    const error = { message: 'API Error' };
    productApi.getAllProducts.mockRejectedValue(error);

    render(<Products />);

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });

  test('deletes a product when confirmed', async () => {
    productApi.getAllProducts.mockResolvedValue(mockProducts);
    productApi.deleteProduct.mockResolvedValue({});

    // Mock window.confirm
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    render(<Products />);
    await waitFor(() => screen.getByText('Product 1'));

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(productApi.deleteProduct).toHaveBeenCalledWith(mockProducts[0]);
      expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    window.confirm.mockRestore();
  });

  test('does not delete product when confirmation is cancelled', async () => {
    productApi.getAllProducts.mockResolvedValue(mockProducts);

    jest.spyOn(window, 'confirm').mockReturnValue(false);

    render(<Products />);
    await waitFor(() => screen.getByText('Product 1'));

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(productApi.deleteProduct).not.toHaveBeenCalled();
    expect(screen.getByText('Product 1')).toBeInTheDocument();

    window.confirm.mockRestore();
  });
});
