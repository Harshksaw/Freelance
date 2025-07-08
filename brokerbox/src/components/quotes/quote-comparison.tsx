'use client';

import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { LenderQuote } from '../../app/quotes/page';
import { CheckCircle, X, TrendingUp, Clock, PoundSterling } from 'lucide-react';

interface QuoteComparisonProps {
  quotes: LenderQuote[];
  onClose: () => void;
}

export function QuoteComparison({ quotes, onClose }: QuoteComparisonProps) {
  const [selectedQuotes, setSelectedQuotes] = useState<LenderQuote[]>(quotes.slice(0, 3));

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (rate: number): string => {
    return `${rate.toFixed(2)}%`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Compare Quotes</h2>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedQuotes.map((quote) => (
              <Card key={quote.id} className="border-2">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg">{quote.lenderName}</h3>
                  {quote.recommended && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Interest Rate */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Interest Rate</span>
                    <span className="font-semibold">{formatPercentage(quote.interestRate)}</span>
                  </div>

                  {/* Monthly Payment */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly Payment</span>
                    <span className="font-semibold">{formatCurrency(quote.monthlyPayment)}</span>
                  </div>

                  {/* Total Repayment */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Cost</span>
                    <span className="font-semibold">{formatCurrency(quote.totalRepayment)}</span>
                  </div>

                  {/* Processing Fee */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Processing Fee</span>
                    <span className="font-semibold">
                      {quote.processingFee > 0 ? formatCurrency(quote.processingFee) : 'Free'}
                    </span>
                  </div>

                  {/* Approval Time */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Approval Time</span>
                    <span className="font-semibold">{quote.approvalTime}</span>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                    <ul className="space-y-1">
                      {quote.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full">Apply Now</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
