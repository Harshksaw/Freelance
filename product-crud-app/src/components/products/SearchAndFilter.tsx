'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/product';

interface SearchAndFilterProps {
  categories: Category[];
  onSearch: (params: { search?: string; category?: string }) => void;
  className?: string;
}

export function SearchAndFilter({ categories, onSearch, className }: SearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleSearch = () => {
    onSearch({
      search: searchTerm.trim() || undefined,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    onSearch({});
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="pl-10"
        />
      </div>
      
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.slug} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="flex gap-2">
        <Button onClick={handleSearch} className="flex-1 sm:flex-none">
          Search
        </Button>
        <Button variant="outline" onClick={handleReset} className="flex-1 sm:flex-none">
          Reset
        </Button>
      </div>
    </div>
  );
}
