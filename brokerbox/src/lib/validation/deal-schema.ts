import { z } from 'zod';

export const dealFormSchema = z.object({
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .max(255, 'Company name must be less than 255 characters'),
  
  companyNumber: z
    .string()
    .optional(),
  
  businessTurnover: z
    .number({
      required_error: 'Business turnover is required',
      invalid_type_error: 'Business turnover must be a number'
    })
    .min(0, 'Business turnover must be positive')
    .max(1000000000, 'Business turnover must be less than £1 billion'),
  
  fundingType: z
    .literal('Loans')
    .default('Loans'),
  
  purpose: z
    .enum(['Cash Flow Boost', 'New Equipment', 'Expansion', 'Refinance', 'Other'], {
      required_error: 'Purpose is required'
    }),
  
  loanAmount: z
    .number({
      required_error: 'Loan amount is required',
      invalid_type_error: 'Loan amount must be a number'
    })
    .min(1000, 'Minimum loan amount is £1,000')
    .max(10000000, 'Maximum loan amount is £10,000,000'),
  
  notes: z
    .string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional()
});

export type DealFormData = z.infer<typeof dealFormSchema>;