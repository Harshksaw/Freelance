'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { LenderQuote, QuoteFormData } from '../../app/quotes/page';
import { 
  X, 
  Star, 
  Clock, 
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

interface PaymentScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
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

  const getRepaymentSchedule = (): PaymentScheduleItem[] => {
    if (!businessData) return [];
    
    const schedule: PaymentScheduleItem[] = [];
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
                onClick={() => setActiveTab(tab.id as 'overview' | 'breakdown' | 'terms' | 'lender')}
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
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="font-medium">{formatCurrency(quote.totalRepayment - (businessData?.loanAmount || 0))}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b-2 border-gray-300 font-semibold">
                    <span className="text-gray-900">Total Repayment</span>
                    <span className="text-lg">{formatCurrency(quote.totalRepayment)}</span>
                  </div>
                </div>
              </div>

              {/* Fees */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fees & Charges</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Arrangement Fee</span>
                    <span className="font-medium">{formatCurrency(quote.arrangementFee || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Early Repayment Fee</span>
                    <span className="font-medium">{quote.earlyRepaymentFee || 'None'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Late Payment Fee</span>
                    <span className="font-medium">{formatCurrency(quote.latePaymentFee || 25)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Schedule Preview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Schedule (First 12 Months)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">Month</th>
                        <th className="px-3 py-2 text-right">Payment</th>
                        <th className="px-3 py-2 text-right">Principal</th>
                        <th className="px-3 py-2 text-right">Interest</th>
                        <th className="px-3 py-2 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getRepaymentSchedule().map((item) => (
                        <tr key={item.month} className="border-b">
                          <td className="px-3 py-2">{item.month}</td>
                          <td className="px-3 py-2 text-right">{formatCurrency(item.payment)}</td>
                          <td className="px-3 py-2 text-right">{formatCurrency(item.principal)}</td>
                          <td className="px-3 py-2 text-right">{formatCurrency(item.interest)}</td>
                          <td className="px-3 py-2 text-right">{formatCurrency(item.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {businessData && businessData.repaymentTerm > 12 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Showing first 12 months of {businessData.repaymentTerm} month term
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
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Fixed interest rate for the duration of the loan</li>
                      <li>• Monthly payments due on the same date each month</li>
                      <li>• Minimum loan term: 12 months</li>
                      <li>• Maximum loan term: 60 months</li>
                      <li>• Personal guarantee required from directors</li>
                    </ul>
                  </Card>

                  <Card>
                    <h4 className="font-medium text-gray-900 mb-2">Eligibility Requirements</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Business must be trading for at least 12 months</li>
                      <li>• Minimum annual turnover of £100,000</li>
                      <li>• No CCJs or defaults in the last 12 months</li>
                      <li>• Business bank account required</li>
                      <li>• UK registered company</li>
                    </ul>
                  </Card>

                  <Card>
                    <h4 className="font-medium text-gray-900 mb-2">Security & Guarantees</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Personal guarantee from company directors</li>
                      <li>• Debenture over company assets</li>
                      <li>• Monthly monitoring of business performance</li>
                      <li>• Right to request updated financial information</li>
                    </ul>
                  </Card>

                  <Card>
                    <h4 className="font-medium text-gray-900 mb-2">Early Repayment</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Early repayment allowed after 6 months</li>
                      <li>• {quote.earlyRepaymentFee || 'No early repayment fees'}</li>
                      <li>• 30 days notice required for early settlement</li>
                      <li>• Partial prepayments may be available</li>
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
                    <h4 className="font-medium text-gray-900 mb-3">Lender Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Website</p>
                          <p className="text-sm text-blue-600">www.{quote.lenderName.toLowerCase().replace(/\s+/g, '')}.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-gray-600">0800 123 4567</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-gray-600">info@{quote.lenderName.toLowerCase().replace(/\s+/g, '')}.com</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h4 className="font-medium text-gray-900 mb-3">Credentials</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">FCA Authorized</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Asset Finance Association Member</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">NACFB Member</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">ISO 27001 Certified</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card>
                  <h4 className="font-medium text-gray-900 mb-3">About This Lender</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    {quote.lenderName} is a leading UK business finance provider with over 10 years of experience 
                    helping businesses access the funding they need to grow. They specialize in flexible lending 
                    solutions and pride themselves on fast decision-making and excellent customer service.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">Founded</p>
                      <p className="text-gray-600">2013</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Loans Issued</p>
                      <p className="text-gray-600">10,000+</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Average Decision Time</p>
                      <p className="text-gray-600">{quote.approvalTime}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Customer Rating</p>
                      <p className="text-gray-600">4.7/5 ⭐</p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h4 className="font-medium text-gray-900 mb-3">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Business Loans</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">Asset Finance</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Invoice Finance</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Equipment Finance</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">Working Capital</span>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => window.open(`mailto:broker@brokerbox.com?subject=Quote Inquiry - ${quote.lenderName}`, '_blank')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Broker
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Quote
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={() => onSelect(quote.id)}
              className={isSelected ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              {isSelected ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Selected
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Select Quote
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}