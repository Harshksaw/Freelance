// src/components/quotes/quote-results.tsx
'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { QuoteDetailModal } from './quote-detail-modal';
import { LenderQuote, QuoteFormData } from '../../types/lender-quote';
import { 
  Star, 
  Clock, 
  Calculator,
  Shield, 
  CheckCircle,
  ArrowRight,
  Download,
  Trash2,
  Filter,
  TrendingUp,
  AlertCircle,
  Users,
  Phone
} from 'lucide-react';

interface QuoteResultsProps {
  quotes: LenderQuote[];
  businessData: QuoteFormData | null;
  onClear: () => void;
}

export function QuoteResults({ quotes, businessData, onClear }: QuoteResultsProps) {
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'rate' | 'payment' | 'total' | 'approval'>('rate');
  const [detailModalQuote, setDetailModalQuote] = useState<LenderQuote | null>(null);
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');

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

  const filteredQuotes = quotes.filter(quote => {
    if (filterRisk === 'all') return true;
    return quote.riskCategory === filterRisk;
  });

  const sortedQuotes = [...filteredQuotes].sort((a, b) => {
    switch (sortBy) {
      case 'rate':
        return a.interestRate - b.interestRate;
      case 'payment':
        return a.monthlyPayment - b.monthlyPayment;
      case 'total':
        return a.totalRepayment - b.totalRepayment;
      case 'approval':
        // Convert approval time to hours for sorting
        const getHours = (time: string) => {
          if (time.includes('hour')) return parseInt(time);
          if (time.includes('day')) return parseInt(time) * 24;
          return 1; // Same day
        };
        return getHours(a.approvalTime) - getHours(b.approvalTime);
      default:
        return 0;
    }
  });

  const toggleQuoteSelection = (quoteId: string) => {
    console.log('🔄 Toggling quote selection for ID:', quoteId);
    console.log('📋 Current selected quotes:', selectedQuotes);
    
    setSelectedQuotes(prev => {
      const isCurrentlySelected = prev.includes(quoteId);
      const newSelection = isCurrentlySelected 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId];
      
      console.log('✅ New selected quotes:', newSelection);
      return newSelection;
    });
  };

  const isQuoteSelected = (quoteId: string) => {
    const selected = selectedQuotes.includes(quoteId);
    console.log(`🎯 Quote ${quoteId} selected:`, selected);
    return selected;
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBestQuote = () => {
    if (sortedQuotes.length === 0) return null;
    return sortedQuotes[0];
  };

  const calculateSavings = (quote: LenderQuote) => {
    const bestRate = getBestQuote()?.interestRate || quote.interestRate;
    if (quote.interestRate <= bestRate) return 0;
    
    const savings = businessData?.loanAmount 
      ? ((quote.interestRate - bestRate) / 100) * businessData.loanAmount * (businessData.repaymentTerm / 12)
      : 0;
    return savings;
  };

  const exportToPDF = () => {
    // Mock PDF export functionality
    console.log('Exporting quotes to PDF...');
    alert('PDF export functionality would be implemented here');
  };

  const proceedWithApplications = () => {
    const selectedQuoteData = quotes.filter(q => selectedQuotes.includes(q.id));
    console.log('Proceeding with selected quotes:', selectedQuoteData);
    alert(`Proceeding with ${selectedQuotes.length} selected quote(s). This would redirect to application forms.`);
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Loan Quotes</h2>
          <p className="text-gray-600 mt-1">
            Found {filteredQuotes.length} competitive offers for {businessData?.companyName}
            {filterRisk !== 'all' && ` (${filterRisk} risk only)`}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Risk Filter */}
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value as 'all' | 'low' | 'medium' | 'high')}
            className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by risk level"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk Only</option>
            <option value="medium">Medium Risk Only</option>
            <option value="high">High Risk Only</option>
          </select>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rate' | 'payment' | 'total' | 'approval')}
            className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Sort quotes by"
          >
            <option value="rate">Sort by Interest Rate</option>
            <option value="payment">Sort by Monthly Payment</option>
            <option value="total">Sort by Total Cost</option>
            <option value="approval">Sort by Approval Speed</option>
          </select>
          
          <Button variant="outline" size="sm" onClick={exportToPDF}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          
          <Button variant="outline" size="sm" onClick={onClear}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Results
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      {filteredQuotes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center border-blue-200 bg-blue-50">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-blue-900">
              {formatPercentage(getBestQuote()?.interestRate || 0)}
            </div>
            <div className="text-sm text-blue-700">Best Rate</div>
          </Card>
          
          <Card className="text-center border-green-200 bg-green-50">
            <div className="flex items-center justify-center mb-2">
              <Calculator className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-lg font-bold text-green-900">
              {formatCurrency(getBestQuote()?.monthlyPayment || 0)}
            </div>
            <div className="text-sm text-green-700">Lowest Payment</div>
          </Card>
          
          <Card className="text-center border-orange-200 bg-orange-50">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-lg font-bold text-orange-900">
              {sortedQuotes.find(q => q.approvalTime.includes('hour'))?.approvalTime || 'Same day'}
            </div>
            <div className="text-sm text-orange-700">Fastest Approval</div>
          </Card>
          
          <Card className="text-center border-purple-200 bg-purple-50">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-lg font-bold text-purple-900">
              {selectedQuotes.length}
            </div>
            <div className="text-sm text-purple-700">Selected</div>
          </Card>
        </div>
      )}

      {/* No Results */}
      {filteredQuotes.length === 0 && (
        <Card className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes match your filters</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your risk level filter or clearing your search criteria.
          </p>
          <Button variant="outline" onClick={() => setFilterRisk('all')}>
            <Filter className="h-4 w-4 mr-2" />
            Show All Quotes
          </Button>
        </Card>
      )}

      {/* Quote Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedQuotes.map((quote, index) => {
          const isSelected = isQuoteSelected(quote.id);
          const savings = calculateSavings(quote);
          const isBestRate = index === 0 && sortBy === 'rate';
          
          return (
            <Card 
              key={quote.id}
              className={`relative border-2 transition-all duration-200 hover:shadow-lg ${
                quote.recommended 
                  ? 'border-blue-500 bg-blue-50' 
                  : isSelected
                  ? 'border-green-500 bg-green-50'
                  : isBestRate
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Badges */}
              <div className="absolute -top-3 left-4 flex space-x-2">
                {quote.recommended && (
                  <div className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Recommended
                  </div>
                )}
                {isBestRate && !quote.recommended && (
                  <div className="bg-emerald-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Best Rate
                  </div>
                )}
              </div>

              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute -top-3 right-4">
                  <div className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Selected
                  </div>
                </div>
              )}

              {/* Lender Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">
                      {quote.lenderName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{quote.lenderName}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getRiskBadgeColor(quote.riskCategory)}`}>
                        {quote.riskCategory} risk
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {quote.approvalTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Alert */}
              {savings > 0 && (
                <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-xs text-red-800 text-center">
                    ⚠️ {formatCurrency(savings)} more than best rate
                  </div>
                </div>
              )}

              {/* Key Metrics */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPercentage(quote.interestRate)}
                    </div>
                    <div className="text-xs text-gray-500">Interest Rate</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(quote.monthlyPayment)}
                    </div>
                    <div className="text-xs text-gray-500">Monthly Payment</div>
                  </div>
                </div>

                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-lg font-bold text-gray-900">
                    {formatCurrency(quote.totalRepayment)}
                  </div>
                  <div className="text-xs text-gray-500">Total Repayment</div>
                </div>

                {quote.processingFee > 0 && (
                  <div className="text-center p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-sm font-medium text-yellow-800">
                      Processing Fee: {formatCurrency(quote.processingFee)}
                    </div>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features</h4>
                <ul className="space-y-1">
                  {quote.features.slice(0, 3).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {quote.features.length > 3 && (
                    <li className="text-xs text-gray-500 pl-5">
                      +{quote.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button 
                  className="w-full"
                  onClick={() => toggleQuoteSelection(quote.id)}
                  variant={isSelected ? "outline" : "primary"}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Selected
                    </>
                  ) : (
                    <>
                      Select Quote
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => setDetailModalQuote(quote)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Summary & Next Steps */}
      {selectedQuotes.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-green-900 mb-2">
                {selectedQuotes.length} Quote{selectedQuotes.length !== 1 ? 's' : ''} Selected
              </h3>
              <p className="text-sm text-green-800 mb-4">
                Ready to proceed with your selected lender{selectedQuotes.length !== 1 ? 's' : ''}? 
                Our team will help you complete the application process and ensure you get the best terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={proceedWithApplications}>
                  Proceed with Applications
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Speak to an Advisor
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedQuotes([])}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Quote Detail Modal */}
      <QuoteDetailModal
        quote={detailModalQuote!}
        businessData={businessData}
        isOpen={!!detailModalQuote}
        onClose={() => setDetailModalQuote(null)}
        onSelect={toggleQuoteSelection}
        isSelected={detailModalQuote ? isQuoteSelected(detailModalQuote.id) : false}
      />

      {/* Debug Info (Remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="bg-gray-100">
          <div className="text-sm">
            <strong>Debug Info:</strong>
            <br />
            Selected Quotes: {JSON.stringify(selectedQuotes)}
            <br />
            Quote IDs: {quotes.map(q => q.id).join(', ')}
            <br />
            Active Filter: {filterRisk}
            <br />
            Sort By: {sortBy}
            <br />
            Filtered Count: {filteredQuotes.length} / {quotes.length}
          </div>
        </Card>
      )}
    </div>
  );
}