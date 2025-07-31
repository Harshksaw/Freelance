'use client';
import { useState, useEffect } from 'react';
import { Product, Category } from '@/types/product';
import { ProductFormData } from '@/lib/validations';
import { api } from '@/lib/api';


export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchProducts = async (params?: {
    search?: string;
    category?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await api.getProducts(params);
      setProducts(data.products || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await api.getCategories();

      const customCats  = JSON.parse(localStorage.getItem('custom_categories') || '[]');

      const allCategories = [...data, ...customCats]

      setCategories(allCategories);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const createNewCategory = (category: string) => {

    const existingCategory = JSON.parse(localStorage.getItem('custom_categories') || '[]')
    if(existingCategory.some((c: Category) => c.slug === category.slug)) {
      console.warn('Category already exists:', category);
      return;
    }
    const updateCategories = [...existingCategory, category];

    localStorage.setItem('custom_categories',JSON.stringify(updateCategories));
    setCategories(prev => [...prev, category]);
  }

  const createProduct = async (productData: ProductFormData) => {
    try {
      const newProduct = await api.createProduct(productData);
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create product');
    }
  };

  const updateProduct = async (id: number, productData: ProductFormData) => {
    try {
      const updatedProduct = await api.updateProduct(id, productData);
      setProducts(prev => 
        prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
      );
      return updatedProduct;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update product');
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await api.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return {
    products,
    loading,
    error,
    categories,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
createNewCategory
  };
}
