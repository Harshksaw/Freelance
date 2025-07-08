import { useState, useCallback, useMemo } from 'react';
import { MockCompany } from '../lib/mock-data/companies';

interface CompanySearchResult {
  kind: string;
  total_results: number;
  items: MockCompany[];
}

interface UseCompaniesReturn {
  companies: MockCompany[];
  loading: boolean;
  error: string | null;
  searchCompanies: (query: string) => void;
  clearResults: () => void;
}

export function useCompanies(): UseCompaniesReturn {
  const [companies, setCompanies] = useState<MockCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Core search logic with proper typing
  const performSearch = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setLoading(false);
      setCompanies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/companies/search?q=${encodeURIComponent(query)}&limit=10`
      );

      if (!response.ok) {
        throw new Error('Failed to search companies');
      }

      const data: CompanySearchResult = await response.json();
      setCompanies(data.items || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since it only uses setState functions

  // Debounced search function
  const searchCompanies = useMemo(
    () => debounce(performSearch, 300),
    [performSearch]
  );

  // Clear results utility
  const clearResults = useCallback(() => {
    setCompanies([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    companies,
    loading,
    error,
    searchCompanies,
    clearResults,
  };
}

// Debounce utility with proper TypeScript generics
function debounce<T extends (...args: string[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}