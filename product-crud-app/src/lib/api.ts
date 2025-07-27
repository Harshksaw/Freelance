import { Product, CreateProductData, ProductsResponse, Category } from '@/types/product';

const API_BASE = 'https://dummyjson.com';

export const api = {
  async getProducts(params?: {
    search?: string;
    category?: string;
    limit?: number;
    skip?: number;
  }): Promise<ProductsResponse> {
    let url = `${API_BASE}/products`;
    
    if (params?.search) {
      url = `${API_BASE}/products/search?q=${encodeURIComponent(params.search)}`;
    } else if (params?.category && params.category !== 'all') {
      url = `${API_BASE}/products/category/${encodeURIComponent(params.category)}`;
    }
    
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.skip) searchParams.set('skip', params.skip.toString());
    
    if (searchParams.toString() && !params?.search) {
      url += `?${searchParams}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    const response = await fetch(`${API_BASE}/products/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  async updateProduct(id: number, data: Partial<CreateProductData>): Promise<Product> {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  async deleteProduct(id: number): Promise<{ id: number; isDeleted: boolean }> {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  },

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
    

  },
};
