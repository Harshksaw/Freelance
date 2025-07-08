import { useState, useEffect, useCallback } from 'react';

interface Deal {
  id: string;
  companyName: string;
  companyNumber?: string;
  businessTurnover: number;
  fundingType: string;
  purpose: string;
  loanAmount: number;
  notes?: string;
  createdAt: string;
}

interface DealsResponse {
  success: boolean;
  deals: Deal[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface UseDealsReturn {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  fetchDeals: (params?: {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
  }) => Promise<void>;
  deleteDeal: (id: string) => Promise<boolean>;
  refreshDeals: () => Promise<void>;
}

export function useDeals(): UseDealsReturn {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [lastParams, setLastParams] = useState({});

  const fetchDeals = useCallback(async (params: {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
  } = {}) => {
    setLoading(true);
    setError(null);
    setLastParams(params);

    try {
      const searchParams = new URLSearchParams();
      
      if (params.search) searchParams.set('search', params.search);
      if (params.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params.page) searchParams.set('page', params.page.toString());

      const response = await fetch(`/api/deals?${searchParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch deals');
      }

      const data: DealsResponse = await response.json();
      
      if (data.success) {
        setDeals(data.deals);
        setPagination(data.pagination);
      } else {
        throw new Error('Failed to fetch deals');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setDeals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDeal = useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/deals/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        // Remove deal from local state
        setDeals(prev => prev.filter(deal => deal.id !== id));
        return true;
      } else {
        throw new Error(data.error || 'Failed to delete deal');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete deal');
      return false;
    }
  }, []);

  const refreshDeals = useCallback(async () => {
    await fetchDeals(lastParams);
  }, [fetchDeals, lastParams]);

  // Fetch deals on component mount
  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  return {
    deals,
    loading,
    error,
    pagination,
    fetchDeals,
    deleteDeal,
    refreshDeals
  };
}