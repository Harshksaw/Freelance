'use client';

import { useState } from 'react';
import { Button } from '../ui/button';

import { Card } from '../ui/card';
import { Filter, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

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
  lenderName?: string;
  minLoanAmount?: number;
  maxLoanAmount?: number;
}

const approvalTimeOptions = [
  { value: '', label: 'Any approval time' },
  { value: '24h', label: 'Within 24 hours' },
  { value: '48h', label: 'Within 48 hours' },
  { value: '1week', label: 'Within 1 week' },
  { value: '2weeks', label: 'Within 2 weeks' }
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

  const handleFilterChange = (key: keyof QuoteFilters, value: string | number | boolean | undefined) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setFilters({});
    onReset();
  };

  const handleNumberChange = (key: keyof QuoteFilters, value: string) => {
    const numValue = value === '' ? undefined : parseFloat(value);
    handleFilterChange(key, numValue);
  };

  const activeFiltersCount = Object.values(filters).filter(
    value => value !== undefined && value !== '' && value !== false
  ).length;

  return (
    <Card className="border-0 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Filter Quotes
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {activeFiltersCount} active
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              className="text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                Expand
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Filters - Always Visible */}
      <div className="flex flex-wrap gap-2 mb-4">
        <label className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-md border border-gray-200">
          <input
            type="checkbox"
            checked={filters.hasNoFees || false}
            onChange={(e) => handleFilterChange('hasNoFees', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>No processing fees</span>
        </label>
        
        <select
          value={filters.riskCategory || ''}
          onChange={(e) => handleFilterChange('riskCategory', e.target.value || undefined)}
          className="text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {riskCategoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={filters.minApprovalTime || ''}
          onChange={(e) => handleFilterChange('minApprovalTime', e.target.value || undefined)}
          className="text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {approvalTimeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700">Advanced Filters</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Max Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="50"
                placeholder="e.g. 8.5"
                value={filters.maxRate || ''}
                onChange={(e) => handleNumberChange('maxRate', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Max Monthly Payment (£)
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 2500"
                value={filters.maxMonthlyPayment || ''}
                onChange={(e) => handleNumberChange('maxMonthlyPayment', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Lender Name
              </label>
              <input
                type="text"
                placeholder="Search lender..."
                value={filters.lenderName || ''}
                onChange={(e) => handleFilterChange('lenderName', e.target.value || undefined)}
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Min Loan Amount (£)
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 10000"
                value={filters.minLoanAmount || ''}
                onChange={(e) => handleNumberChange('minLoanAmount', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Max Loan Amount (£)
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 500000"
                value={filters.maxLoanAmount || ''}
                onChange={(e) => handleNumberChange('maxLoanAmount', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filter Presets */}
          <div className="pt-4 border-t border-gray-200">
            <h5 className="text-xs font-medium text-gray-700 mb-2">Quick Presets</h5>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const presetFilters = { riskCategory: 'low', hasNoFees: true };
                  setFilters(presetFilters);
                  onFilterChange(presetFilters);
                }}
                className="text-xs"
              >
                Low Risk + No Fees
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const presetFilters = { maxRate: 7, minApprovalTime: '24h' };
                  setFilters(presetFilters);
                  onFilterChange(presetFilters);
                }}
                className="text-xs"
              >
                Best Rate + Fast Approval
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const presetFilters = { minApprovalTime: '24h', hasNoFees: true };
                  setFilters(presetFilters);
                  onFilterChange(presetFilters);
                }}
                className="text-xs"
              >
                Quick + Cheap
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && !isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-1 text-xs">
            <span className="text-gray-500">Active filters:</span>
            {filters.maxRate && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Rate ≤ {filters.maxRate}%
              </span>
            )}
            {filters.maxMonthlyPayment && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Payment ≤ £{filters.maxMonthlyPayment}
              </span>
            )}
            {filters.riskCategory && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {filters.riskCategory} risk
              </span>
            )}
            {filters.hasNoFees && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                No fees
              </span>
            )}
            {filters.minApprovalTime && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {approvalTimeOptions.find(opt => opt.value === filters.minApprovalTime)?.label}
              </span>
            )}
            {filters.lenderName && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Lender: {filters.lenderName}
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}