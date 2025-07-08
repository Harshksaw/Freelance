// src/components/quotes/quote-detail-modal.tsx
'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { LenderQuote, QuoteFormData } from '../../app/quotes/page';
import { 
  X, 
  Star, 
  Clock, 
  PoundSterling, 
  Calculator, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Info,
  Phone,
  Mail,
  Globe,
  Download,
  ArrowRight,
  Calendar,
  TrendingUp,
  FileText
} from 'lucide-react';

interface QuoteDetailModalProps {
  quote: LenderQuote;
  businessData: QuoteFormData | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (quoteId: string) => void;
  isSelected: boolean;
}

export function QuoteDetailModal({ 
  quote, 
  businessData, 
  isOpen, 
  onClose, 
  onSelect, 
  isSelected 
}: QuoteDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'terms' | 'lender'>('overview');

  if (!isOpen) return null;

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

  const calculateSavings = () => {
    // Mock calculation - in real app, compare against average market rate
    const marketAverage = 7.5;
    const potentialSavings = businessData?.loanAmount 
      ? (marketAverage - quote.interestRate) / 100 * businessData.loanAmount * (businessData.repaymentTerm / 12)
      : 0;
    return potentialSavings > 0 ? potentialSavings : 0;
  };

  const getRepaymentSchedule = () => {
    if (!businessData) return [];
    
    const schedule = [];
    let remainingBalance = businessData.loanAmount;
    const monthlyInterest = quote.interestRate / 100 / 12;
    
    for (let month = 1; month <= Math.min(businessData.repaymentTerm, 12); month++) {
      const interestPayment = remainingBalance * monthlyInterest;
      const principalPayment = quote.monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      schedule.push({
        month,
        payment: quote.monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      });
    }
    
    return schedule;
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'breakdown', label: 'Cost Breakdown', icon: Calculator },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'lender', label: 'Lender Info', icon: Shield }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-gray-600">
                {quote.lenderName.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                {quote.lenderName}
                {quote.recommended && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Recommended
                  </span>
                )}
              </h2>
              <div className="flex items-center space-x-3 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full border ${getRiskBadgeColor(quote.riskCategory)}`}>
                  {quote.riskCategory} risk
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {quote.approvalTime}
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatPercentage(quote.interestRate)}
                  </div>
                  <div className="text-sm text-gray-500">Interest Rate</div>
                </Card>
                <Card className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatCurrency(quote.monthlyPayment)}
                  </div>
                  <div className="text-sm text-gray-500">Monthly Payment</div>
                </Card>
                <Card className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {formatCurrency(quote.totalRepayment)}
                  </div>
                  <div className="text-sm text-gray-500">Total Cost</div>
                </Card>
                <Card className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {businessData?.repaymentTerm || 0}
                  </div>
                  <div className="text-sm text-gray-500">Months</div>
                </Card>
              </div>

              {/* Potential Savings */}
              {calculateSavings() > 0 && (
                <Card className="border-green-200 bg-green-50">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-medium text-green-900">Potential Savings</h3>
                      <p className="text-sm text-green-700">
                        You could save approximately {formatCurrency(calculateSavings())} 
                        compared to market average rates
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features & Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quote.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Notes */}
              <Card className="border-amber-200 bg-amber-50">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-900 mb-2">Important Information</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• This quote is indicative and subject to full credit assessment</li>
                      <li>• Final terms may vary based on detailed application review</li>
                      <li>• Early repayment options and charges may apply</li>
                      <li>• Quote valid for 30 days from generation date</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="space-y-6">
              {/* Cost Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Loan Amount</span>
                    <span className="font-medium">{formatCurrency(businessData?.loanAmount || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Interest Rate (Annual)</span>
                    <span className="font-medium">{formatPercentage(quote.interestRate)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Repayment Term</span>
                    <span className="font-medium">{businessData?.repaymentTerm || 0} months</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Monthly Payment</span>
                    <span className="font-medium">{formatCurrency(quote.monthlyPayment)}</span>
                  </div>
                  {quote.processingFee > 0 && (
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Processing Fee</span>
                      <span className="font-medium">{formatCurrency(quote.processingFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-gray-300 font-semibold">
                    <span className="text-gray-900">Total Amount Payable</span>
                    <span className="text-lg">{formatCurrency(quote.totalRepayment)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-green-600">
                    <span>Total Interest</span>
                    <span className="font-medium">
                      {formatCurrency(quote.totalRepayment - (businessData?.loanAmount || 0) - quote.processingFee)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sample Repayment Schedule */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Sample Repayment Schedule (First 12 Months)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-3">Month</th>
                        <th className="text-right p-3">Payment</th>
                        <th className="text-right p-3">Principal</th>
                        <th className="text-right p-3">Interest</th>
                        <th className="text-right p-3">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getRepaymentSchedule().map((payment) => (
                        <tr key={payment.month} className="border-b">
                          <td className="p-3">{payment.month}</td>
                          <td className="text-right p-3">{formatCurrency(payment.payment)}</td>
                          <td className="text-right p-3">{formatCurrency(payment.principal)}</td>
                          <td className="text-right p-3">{formatCurrency(payment.interest)}</td>
                          <td className="text-right p-3">{formatCurrency(payment.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {businessData && businessData.repaymentTerm > 12 && (
                  <p className="text-sm text-gray-500 mt-2">
                    * Showing first 12 months only. Full schedule available upon application.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
                
                <div className="space-y-4">
                  <Card>
                    <h4 className="font-medium text-gray-900 mb-2">Loan Terms</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Fixed interest rate for the entire term</li>
                      <li>• Monthly repayments on the same date each month</li>
                      <li>• Direct debit collection recommended</li>
                      <li>• Loan secured against business assets</li>
                    </ul>
                  </Card>

                  <Card>
                    <h4 className="font-medium text-gray-900 mb-2">Early Repayment</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Early repayment allowed with 30 days notice</li>
                      <li>• No early repayment charges for this product</li>
                      <li>• Partial overpayments accepted</li>
                      <li>• Interest charged daily basis</li>
                    </ul>
                  </Card>

                  <Card>
                    <h4 className="font-medium text-gray-900 mb-2">Default & Late Payment</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Late payment fee: £25 per missed payment</li>
                      <li>• Default interest rate: {formatPercentage(quote.interestRate + 3)}</li>
                      <li>• Grace period: 14 days after due date</li>
                      <li>• Recovery costs may be charged</li>
                    </ul>
                  </Card>

                  <Card>
                    <h4 className="font-medium text-gray-900 mb-2">Security & Guarantees</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Personal guarantee required from directors</li>
                      <li>• Business assets as primary security</li>
                      <li>• Property charge may be required for larger amounts</li>
                      <li>• Insurance requirements apply</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lender' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About {quote.lenderName}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <h4 className="font-medium text-gray-900 mb-3">Lender Profile</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Founded</span>
                        <span>2015</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loans Provided</span>
                        <span>£500M+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer Rating</span>
                        <span className="flex items-center">
                          4.8/5 <Star className="h-3 w-3 text-yellow-400 ml-1" />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">FCA Regulated</span>
                        <span className="text-green-600">✓ Yes</span>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">0800 123 4567</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">info@{quote.lenderName.toLowerCase().replace(/\s+/g, '')}.co.uk</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">www.{quote.lenderName.toLowerCase().replace(/\s+/g, '')}.co.uk</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card>
                  <h4 className="font-medium text-gray-900 mb-3">Specializations</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="text-sm text-gray-600">• SME Lending</div>
                    <div className="text-sm text-gray-600">• Asset Finance</div>
                    <div className="text-sm text-gray-600">• Working Capital</div>
                    <div className="text-sm text-gray-600">• Property Finance</div>
                    <div className="text-sm text-gray-600">• Invoice Finance</div>
                    <div className="text-sm text-gray-600">• Growth Capital</div>
                  </div>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Why Choose This Lender?</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Established track record in SME lending</li>
                        <li>• Quick decision making process</li>
                        <li>• Flexible repayment options</li>
                        <li>• Dedicated relationship manager</li>
                        <li>• Competitive rates for your risk profile</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Quote
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={onClose}
              >
                Close
              </Button>
              <Button 
                onClick={() => onSelect(quote.id)}
                variant={isSelected ? "outline" : "primary"}
              >
                {isSelected ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Selected
                  </>
                ) : (
                  <>
                    Select This Quote
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}