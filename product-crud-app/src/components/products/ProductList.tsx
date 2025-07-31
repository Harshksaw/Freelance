'use client';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { useEffect, useState } from 'react';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  sortProducts: string;
}

export function ProductList({ products, loading, onEdit, onDelete, sortProducts }: ProductListProps) {

  console.log('🚀 ~ :15 ~ ProductList ~ products::==', products)
  const [sortedProducts, setSortedProducts] = useState([...products]);
  useEffect(() => {
    if (sortProducts === "low") {
      const sorted = products.sort((a, b) => a.price - b.price);
      setSortedProducts(sorted);
    } else if (sortProducts === "high") {
      const sorted = products.sort((a, b) => b.price - a.price);
      setSortedProducts(sorted);
    }
  }, [sortProducts, products]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found.</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }




  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
