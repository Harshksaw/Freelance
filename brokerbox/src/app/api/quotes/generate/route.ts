// src/app/api/quotes/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface LenderData {
  id: string;
  name: string;
  baseRate: number;
  riskMultiplier: { low: number; medium: number; high: number };
  processingFee: number;
  approvalTime: string;
  features: string[];
}

interface QuoteFormData {
  companyName: string;
  companyNumber?: string;
  directorName: string;
  turnover: number;
  fundingType: string;
  purpose: string;
  loanAmount: number;
  repaymentTerm: number;
}

// Mock lender data for quote generation
const mockLenders: LenderData[] = [
  {
    id: 'lender_1',
    name: 'Premier Business Finance',
    baseRate: 4.5,
    riskMultiplier: { low: 1.0, medium: 1.3, high: 1.8 },
    processingFee: 1500,
    approvalTime: '24-48 hours',
    features: [
      'No early repayment charges',
      'Flexible repayment options',
      'Dedicated account manager',
      'Online account management'
    ]
  },
  {
    id: 'lender_2',
    name: 'Capital Growth Partners',
    baseRate: 5.2,
    riskMultiplier: { low: 1.1, medium: 1.4, high: 2.0 },
    processingFee: 0,
    approvalTime: '2-5 days',
    features: [
      'No arrangement fees',
      'Same-day decisions',
      'Unsecured options available',
      '24/7 customer support'
    ]
  },
  {
    id: 'lender_3',
    name: 'Velocity Funding Solutions',
    baseRate: 3.9,
    riskMultiplier: { low: 1.2, medium: 1.5, high: 2.2 },
    processingFee: 2000,
    approvalTime: '1-2 days',
    features: [
      'Fast approval process',
      'Competitive rates',
      'Experienced team',
      'Multiple funding options'
    ]
  },
  {
    id: 'lender_4',
    name: 'Enterprise Finance Direct',
    baseRate: 6.1,
    riskMultiplier: { low: 0.9, medium: 1.2, high: 1.6 },
    processingFee: 500,
    approvalTime: '3-7 days',
    features: [
      'Low processing fees',
      'Established lender',
      'Personal service',
      'Flexible criteria'
    ]
  },
  {
    id: 'lender_5',
    name: 'Swift Capital Ltd',
    baseRate: 4.8,
    riskMultiplier: { low: 1.0, medium: 1.3, high: 1.9 },
    processingFee: 1200,
    approvalTime: '12-24 hours',
    features: [
      'Ultra-fast decisions',
      'Digital application',
      'Same-day funding',
      'No hidden fees'
    ]
  }
];

function calculateRiskCategory(turnover: number, loanAmount: number): 'low' | 'medium' | 'high' {
  const loanToTurnoverRatio = loanAmount / turnover;
  
  if (loanToTurnoverRatio <= 0.3) return 'low';
  if (loanToTurnoverRatio <= 0.6) return 'medium';
  return 'high';
}

function generateQuote(lender: LenderData, formData: QuoteFormData, riskCategory: 'low' | 'medium' | 'high') {
  const interestRate = lender.baseRate * lender.riskMultiplier[riskCategory];
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = formData.repaymentTerm;
  
  // Calculate monthly payment using loan formula
  const monthlyPayment = formData.loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  const totalRepayment = monthlyPayment * numPayments;
  
  return {
    id: `quote_${lender.id}_${Date.now()}`,
    lenderName: lender.name,
    interestRate: parseFloat(interestRate.toFixed(2)),
    monthlyPayment: Math.round(monthlyPayment),
    totalRepayment: Math.round(totalRepayment),
    processingFee: lender.processingFee,
    approvalTime: lender.approvalTime,
    features: lender.features,
    riskCategory,
    recommended: false
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData: QuoteFormData = await request.json();
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const riskCategory = calculateRiskCategory(formData.turnover, formData.loanAmount);
    
    // Generate quotes from random subset of lenders (3-5 lenders)
    const selectedLenders = mockLenders
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 3);
    
    const quotes = selectedLenders.map(lender => 
      generateQuote(lender, formData, riskCategory)
    );
    
    // Sort quotes by interest rate and mark best as recommended
    quotes.sort((a, b) => a.interestRate - b.interestRate);
    quotes.forEach((q, i) => { q.recommended = i === 0; });
    
    return NextResponse.json({
      success: true,
      quotes,
      riskCategory,
      message: `Generated ${quotes.length} quotes successfully`
    });
    
  } catch (error) {
    console.error('Quote generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate quotes' },
      { status: 500 }
    );
  }
}