export interface LoanCalculation {
    monthlyPayment: number;
    totalRepayment: number;
    totalInterest: number;
    annualPercentageRate: number;
  }
  
  export function calculateLoanPayments(
    principal: number,
    annualRate: number,
    termInMonths: number,
    processingFee: number = 0
  ): LoanCalculation {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = termInMonths;
    
    // Calculate monthly payment using standard loan formula
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalRepayment = monthlyPayment * numPayments + processingFee;
    const totalInterest = totalRepayment - principal;
    
    // Calculate APR including fees
    const totalAmount = principal + processingFee;
    const annualPercentageRate = ((totalRepayment / totalAmount) ** (12 / termInMonths) - 1) * 100;
    
    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalRepayment: Math.round(totalRepayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      annualPercentageRate: Math.round(annualPercentageRate * 100) / 100
    };
  }
  
  export function calculateAffordability(
    monthlyPayment: number,
    monthlyTurnover: number
  ): {
    affordabilityRatio: number;
    isAffordable: boolean;
    recommendation: string;
  } {
    const monthlyRevenue = monthlyTurnover / 12;
    const affordabilityRatio = monthlyPayment / monthlyRevenue;
    
    let isAffordable = true;
    let recommendation = 'This loan appears affordable based on your turnover';
    
    if (affordabilityRatio > 0.3) {
      isAffordable = false;
      recommendation = 'This loan may strain your cash flow. Consider a longer term or smaller amount';
    } else if (affordabilityRatio > 0.2) {
      recommendation = 'This loan is manageable but monitor cash flow carefully';
    }
    
    return {
      affordabilityRatio: Math.round(affordabilityRatio * 10000) / 100,
      isAffordable,
      recommendation
    };
  }
  