'use client';

import { useState } from 'react';
import Link from 'next/link';
import { QuoteForm } from '../../components/forms/quote-form';
import { QuoteResults } from '../../components/quotes/quote-results';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ArrowLeft, Calculator, TrendingUp, Shield, Clock } from 'lucide-react';
import { QuoteFormData, LenderQuote } from '../../types/lender-quote';

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<LenderQuote[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData | null>(null);

  const handleQuoteGeneration = async (data: QuoteFormData) => {
    setIsGenerating(true);
    setFormData(data);
    
    try {
      // Simulate API call to generate quotes
      const response = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        const result = await response.json();
        setQuotes(result.quotes);
      }
    } catch (error) {
      console.error('Failed to generate quotes:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearQuotes = () => {
    setQuotes([]);
    setFormData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Generate Quotes</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Generate Loan Quotes</h1>
              <p className="text-gray-600 mt-2">
                Get competitive quotes from multiple lenders and compare terms instantly
              </p>
            </div>
            <Link href="/deals">
              <Button variant="outline" className="hidden sm:flex">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Deals
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Back Button */}
        <div className="mb-6 sm:hidden">
          <Link href="/deals">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Deals
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <QuoteForm 
              onSubmit={handleQuoteGeneration}
              loading={isGenerating}
            />
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* How it Works */}
            <Card className="border-0 bg-blue-50 border-blue-200">
              <div className="flex items-start space-x-3">
                <Calculator className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900 mb-2">How It Works</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Enter business details</li>
                    <li>• Get quotes from 100+ lenders</li>
                    <li>• Compare rates and terms</li>
                    <li>• Apply for best offers</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Benefits */}
            <Card className="border-0 bg-green-50 border-green-200">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-green-900 mb-2">Benefits</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Save time and effort</li>
                    <li>• Best available rates</li>
                    <li>• No impact on credit score</li>
                    <li>• Expert guidance included</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Security */}
            <Card className="border-0 bg-purple-50 border-purple-200">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-purple-900 mb-2">Secure & Confidential</h3>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Bank-level encryption</li>
                    <li>• FCA regulated partners</li>
                    <li>• Data protection compliant</li>
                    <li>• No hidden fees</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Processing Time */}
            <Card className="border-0 bg-amber-50 border-amber-200">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-amber-900 mb-2">Quick Process</h3>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Quotes in under 60 seconds</li>
                    <li>• Same-day decisions available</li>
                    <li>• Funds in 24-48 hours</li>
                    <li>• Dedicated support team</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quote Results */}
        {quotes.length > 0 && (
          <div className="mt-12">
            <QuoteResults 
              quotes={quotes}
              businessData={formData}
              onClear={handleClearQuotes}
            />
          </div>
        )}
      </div>
    </div>
  );
}
