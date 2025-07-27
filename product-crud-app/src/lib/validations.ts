import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  discountPercentage: z.number().min(0).max(100),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  brand: z.string().min(1, 'Brand is required'),
  category: z.string().min(1, 'Category is required'),
  thumbnail: z.string().url('Please enter a valid image URL').optional().or(z.literal('')),
  images: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
