// ProductsApi.test.js
import ProductsApi from './ProductsApi';
import HttpHelper from './HttpHelper';

jest.mock('./HttpHelper');

describe('ProductsApi', () => {
  const API_URL = 'http://localhost:3000';
  beforeAll(() => {
    process.env.API_URL = API_URL;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllProducts calls HttpHelper.fetch with correct args', async () => {
    HttpHelper.fetch.mockResolvedValue([{ id: 1 }]);

    const result = await ProductsApi.getAllProducts();

    expect(HttpHelper.fetch).toHaveBeenCalledWith(
      `${API_URL}/api/products/`,
      'GET',
      { 'Content-Type': 'application/json' },
      null
    );
    expect(result).toEqual([{ id: 1 }]);
  });

  test('getProduct calls HttpHelper.fetch with correct args', async () => {
    HttpHelper.fetch.mockResolvedValue({ id: 1 });

    const result = await ProductsApi.getProduct(1);

    expect(HttpHelper.fetch).toHaveBeenCalledWith(
      `${API_URL}/api/products/1`,
      'GET',
      { 'Content-Type': 'application/json' },
      null
    );
    expect(result).toEqual({ id: 1 });
  });

  test('createProduct calls HttpHelper.fetch with correct args', async () => {
    const product = { productName: 'Test', price: 10 };
    HttpHelper.fetch.mockResolvedValue({ id: 1, ...product });

    const result = await ProductsApi.createProduct(product);

    expect(HttpHelper.fetch).toHaveBeenCalledWith(
      `${API_URL}/api/products/`,
      'POST',
      { 'Content-Type': 'application/json' },
      JSON.stringify(product)
    );
    expect(result).toEqual({ id: 1, ...product });
  });

  test('updateProduct calls HttpHelper.fetch with correct args', async () => {
    const product = { id: 1, productName: 'Updated', price: 20 };
    HttpHelper.fetch.mockResolvedValue(product);

    const result = await ProductsApi.updateProduct(product);

    expect(HttpHelper.fetch).toHaveBeenCalledWith(
      `${API_URL}/api/products/1`,
      'PUT',
      { 'Content-Type': 'application/json' },
      JSON.stringify(product)
    );
    expect(result).toEqual(product);
  });

  test('deleteProduct calls HttpHelper.fetch with correct args', async () => {
    const product = { id: 1 };
    HttpHelper.fetch.mockResolvedValue({ success: true });

    const result = await ProductsApi.deleteProduct(product);

    expect(HttpHelper.fetch).toHaveBeenCalledWith(
      `${API_URL}/api/products/1`,
      'DELETE',
      { 'Content-Type': 'application/json' },
      null
    );
    expect(result).toEqual({ success: true });
  });
});
