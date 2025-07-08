'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '../ui/input';
import { Loading } from '../ui/loading';
import { useCompanies } from '../../hooks/use-companies';
import { MockCompany } from '../../lib/mock-data/companies';
import { cn } from '../../lib/utils/cn';
import { Building2, Check } from 'lucide-react';

interface CompanySearchProps {
  label?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onCompanySelect: (company: MockCompany | null) => void;
  required?: boolean;
}

export function CompanySearch({
  label = "Company Name",
  placeholder = "Search for a company...",
  error,
  value = "",
  onCompanySelect,
  required
}: CompanySearchProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<MockCompany | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const { companies, loading, error: searchError, searchCompanies, clearResults } = useCompanies();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    setSelectedCompany(null);
    setHighlightedIndex(-1);
    
    if (query.length >= 2) {
      searchCompanies(query);
      setIsOpen(true);
    } else {
      clearResults();
      setIsOpen(false);
    }
    
    onCompanySelect(null);
  };

  // Handle company selection
  const handleCompanySelect = (company: MockCompany) => {
    setInputValue(company.title);
    setSelectedCompany(company);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onCompanySelect(company);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || companies.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < companies.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : companies.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && companies[highlightedIndex]) {
          handleCompanySelect(companies[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          ref={inputRef}
          label={label}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (companies.length > 0) setIsOpen(true);
          }}
          error={error || searchError || undefined}
          required={required}
          className={cn(
            selectedCompany && 'pr-10'
          )}
        />
        
        {selectedCompany && (
          <div className="absolute inset-y-0 right-0 top-6 flex items-center pr-3">
            <Check className="h-4 w-4 text-green-500" />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
          {loading && (
            <div className="p-4">
              <Loading size="sm" text="Searching companies..." />
            </div>
          )}
          
          {!loading && companies.length === 0 && inputValue.length >= 2 && (
            <div className="p-4 text-sm text-gray-500 text-center">
              No companies found for "{inputValue}"
            </div>
          )}
          
          {!loading && companies.length > 0 && (
            <ul ref={listRef} className="max-h-60 overflow-auto">
              {companies.map((company, index) => (
                <li
                  key={company.company_number}
                  className={cn(
                    'px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0',
                    'hover:bg-gray-50 transition-colors',
                    highlightedIndex === index && 'bg-blue-50',
                    company.company_status !== 'active' && 'opacity-60'
                  )}
                  onClick={() => handleCompanySelect(company)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Building2 className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {company.title}
                        </p>
                        <span className={cn(
                          'text-xs px-2 py-1 rounded-full',
                          company.company_status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        )}>
                          {company.company_status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        #{company.company_number} • {company.address_snippet}
                      </p>
                      {company.description && (
                        <p className="text-xs text-gray-400 mt-1 truncate">
                          {company.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}