'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Card } from '../ui/card';
import { Filter, RotateCcw } from 'lucide-react';

interface QuoteFiltersProps {
  onFilterChange: (filters: QuoteFilters) => void;
  onReset: () => void;
}

export interface QuoteFilters {
  maxRate?: number;
  maxMonthlyPayment?: number;
  minApprovalTime?: string;
  riskCategory?: string;
  hasNoFees?: boolean;
}

const approvalTimeOptions = [
  { value: '', label: 'Any approval time' },
  { value: '24h', label: 'Within 24 hours' },
  { value: '48h', label: 'Within 48 hours' },
  { value: '1week', label: 'Within 1 week' }
];

const riskCategoryOptions = [
  { value: '', label: 'All risk categories' },
  { value: 'low', label: 'Low risk only' },
  { value: 'medium', label: 'Medium risk or better' },
  { value: 'high', label: 'All including high risk' }
];

export function QuoteFilters({ onFilterChange, onReset }: QuoteFiltersProps) {
  const [filters, setFilters] = useState<QuoteFilters>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof QuoteFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setFilters({});
    onReset();
  };

  return (
    <Card className="border-0 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter Quotes</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
            className="text-xs"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            label="Max Interest Rate (%)"
            type="number"
            placeholder="e.g. 8.5"
            value={filters.maxRate || ''}
            onChange={(e) => handleFilterChange('maxRate', parseFloat(e.target.value) || undefined)}
          />
          
          <Input
            label="Max Monthly Payment"
            type="number"
            currency
            placeholder="0"
            value={filters.maxMonthlyPayment || ''}
            onChange={(e) => handleFilterChange('maxMonthlyPayment', parseFloat(e.target.value) || undefined)}
          />
          
          <Select
            label="Approval Time"
            options={approvalTimeOptions}
            value={filters.minApprovalTime || ''}
            onChange={(e) => handleFilterChange('minApprovalTime', e.target.value || undefined)}
          />
          
          <Select
            label="Risk Category"
            options={riskCategoryOptions}
            value={filters.riskCategory || ''}
            onChange={(e) => handleFilterChange('riskCategory', e.target.value || undefined)}
          />
        </div>
      )}

      <div className="mt-4 flex items-center">
        <label className="flex items-center space-x-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={filters.hasNoFees || false}
            onChange={(e) => handleFilterChange('hasNoFees', e.target.checked)}
            className="rounded border-gray-300"
          />
          <span>No processing fees only</span>
        </label>
      </div>
    </Card>
  );
}