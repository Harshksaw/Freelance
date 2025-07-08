import { useState, useCallback } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCompanies = useCallback(
    debounce(async (query: string) => {
      if (!query || query.length < 2) {
        setCompanies([]);
        setLoading(false);
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
        setError(err instanceof Error ? err.message : 'An error occurred');
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

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
    clearResults
  };
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}