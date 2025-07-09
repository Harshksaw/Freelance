// src/hooks/use-quotes.ts
import { useState, useCallback } from 'react';
import { LenderQuote, QuoteFormData } from '../types/lender-quote';

interface QuoteResponse {
  success: boolean;
  quotes: LenderQuote[];
  riskCategory: string;
  message: string;
}

interface UseQuotesReturn {
  quotes: LenderQuote[];
  loading: boolean;
  error: string | null;
  generateQuotes: (data: QuoteFormData) => Promise<boolean>;
  clearQuotes: () => void;
}

export function useQuotes(): UseQuotesReturn {
  const [quotes, setQuotes] = useState<LenderQuote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuotes = useCallback(async (data: QuoteFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate quotes');
      }

      const result: QuoteResponse = await response.json();
      
      if (result.success) {
        setQuotes(result.quotes);
        return true;
      } else {
        throw new Error(result.message || 'Failed to generate quotes');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      setQuotes([]);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearQuotes = useCallback(() => {
    setQuotes([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    quotes,
    loading,
    error,
    generateQuotes,
    clearQuotes,
  };
}
