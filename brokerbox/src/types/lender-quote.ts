// src/types/lender-quote.ts

export interface LenderQuote {
    id: string;
    lenderName: string;
    interestRate: number;
    monthlyPayment: number;
    totalRepayment: number;
    approvalTime: string;
    recommended: boolean;
    riskCategory: 'low' | 'medium' | 'high';
    features: string[];
    processingFee: number;
    
    // Additional fee properties
    arrangementFee?: number;
    earlyRepaymentFee?: string;
    latePaymentFee?: number;
    
    // Terms and conditions
    minLoanAmount?: number;
    maxLoanAmount?: number;
    minTerm?: number;
    maxTerm?: number;
    
    // Lender information
    lenderWebsite?: string;
    lenderPhone?: string;
    lenderEmail?: string;
    fca_authorized?: boolean;
    
    // Additional properties that might be used
    apr?: number;
    representative_example?: string;
    security_required?: boolean;
    personal_guarantee_required?: boolean;
  }
  
  // Quote form data type (should match your existing interface)
  export interface QuoteFormData {
    companyName: string;
    companyNumber?: string;
    directorName: string;
    turnover: number;
    fundingType: 'Loans' | 'Invoice Finance' | 'Asset Finance' | 'Overdraft' | 'Other';
    purpose: 'Cash Flow Boost' | 'New Equipment' | 'Expansion' | 'Refinance' | 'Other';
    loanAmount: number;
    repaymentTerm: number;
  }
  
  // Mock data generator type
  export interface MockQuoteOptions {
    companyName: string;
    loanAmount: number;
    repaymentTerm: number;
    fundingType: string;
    riskProfile?: 'low' | 'medium' | 'high';
  }
  
  // Filter options
  export interface QuoteFilters {
    maxRate?: number;
    maxMonthlyPayment?: number;
    minApprovalTime?: string;
    riskCategory?: string;
    hasNoFees?: boolean;
    lenderName?: string;
    minLoanAmount?: number;
    maxLoanAmount?: number;
  }
  
  // Sort options
  export type QuoteSortBy = 'rate' | 'payment' | 'total' | 'approval';
  
  // Quote status for tracking
  export type QuoteStatus = 'draft' | 'submitted' | 'approved' | 'declined' | 'pending';
  
  export interface QuoteApplication {
    id: string;
    quoteId: string;
    status: QuoteStatus;
    submittedAt: Date;
    lastUpdated: Date;
    notes?: string;
  }