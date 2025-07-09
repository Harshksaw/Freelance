'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { CompanySearch } from './company-search';
import { Card } from '../ui/card';
import { MockCompany } from '../../lib/mock-data/companies';
import { Loader2, Calculator } from 'lucide-react';
import { QuoteFormData } from '../../types/lender-quote';

// Define the Zod schema with proper literal types
const quoteFormSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  companyNumber: z.string().optional(),
  directorName: z.string().min(1, 'Director name is required'),
  turnover: z.number().min(0, 'Turnover must be positive'),
  fundingType: z.enum(['Loans', 'Invoice Finance', 'Asset Finance', 'Overdraft', 'Other'], {
    required_error: 'Please select a funding type'
  }),
  purpose: z.enum(['Cash Flow Boost', 'New Equipment', 'Expansion', 'Refinance', 'Other'], {
    required_error: 'Please select a purpose'
  }),
  loanAmount: z.number().min(1000, 'Minimum loan amount is £1,000').max(10000000, 'Maximum loan amount is £10,000,000'),
  repaymentTerm: z.number().min(1, 'Minimum term is 1 month').max(120, 'Maximum term is 120 months'),
});

interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => void;
  loading?: boolean;
}

const fundingTypeOptions = [
  { value: 'Loans' as const, label: 'Business Loans' },
  { value: 'Invoice Finance' as const, label: 'Invoice Finance' },
  { value: 'Asset Finance' as const, label: 'Asset Finance' },
  { value: 'Overdraft' as const, label: 'Overdraft' },
  { value: 'Other' as const, label: 'Other' }
];

const purposeOptions = [
  { value: 'Cash Flow Boost' as const, label: 'Cash Flow Boost' },
  { value: 'New Equipment' as const, label: 'New Equipment' },
  { value: 'Expansion' as const, label: 'Business Expansion' },
  { value: 'Refinance' as const, label: 'Refinance Existing Debt' },
  { value: 'Other' as const, label: 'Other Purpose' }
];

const repaymentTermOptions = [
  { value: 6, label: '6 months' },
  { value: 12, label: '1 year' },
  { value: 18, label: '18 months' },
  { value: 24, label: '2 years' },
  { value: 36, label: '3 years' },
  { value: 48, label: '4 years' },
  { value: 60, label: '5 years' },
  { value: 84, label: '7 years' },
  { value: 120, label: '10 years' }
];

export function QuoteForm({ onSubmit, loading }: QuoteFormProps) {
  const [selectedCompany, setSelectedCompany] = useState<MockCompany | null>(null);

  console.log('🚀 QuoteForm selectedCompany:', selectedCompany);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fundingType: 'Loans',
      companyName: '',
      companyNumber: '',
      directorName: '',
      turnover: undefined,
      purpose: undefined,
      loanAmount: undefined,
      repaymentTerm: 36
    }
  });

  const watchedCompanyName = watch('companyName');

  const handleCompanySelect = (company: MockCompany | null) => {
    setSelectedCompany(company);
    if (company) {
      setValue('companyName', company.title, { shouldValidate: true });
      setValue('companyNumber', company.company_number, { shouldValidate: true });
    } else {
      setValue('companyName', watchedCompanyName || '', { shouldValidate: true });
      setValue('companyNumber', '', { shouldValidate: true });
    }
  };

  const handleFormSubmit = (data: QuoteFormData) => {
    console.log('Form submitted with data:', data);
    onSubmit(data);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card 
      title="Business Information" 
      description="Enter your details to get personalized loan quotes"
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Company Search */}
        <div>
          <CompanySearch
            label="Company Name"
            placeholder="Search for your company..."
            value={watchedCompanyName || ''}
            onCompanySelect={handleCompanySelect}
            error={errors.companyName?.message}
            required
          />
          {selectedCompany && (
            <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-900">{selectedCompany.title}</p>
                  <p className="text-xs text-green-700">
                    Company Number: {selectedCompany.company_number}
                  </p>
                  <p className="text-xs text-green-700">
                    {selectedCompany.address_snippet}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleCompanySelect(null)}
                  className="text-green-700 hover:text-green-800"
                >
                  Change
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Director Name */}
        <Input
          label="Director's Full Name"
          placeholder="Enter full name..."
          {...register('directorName')}
          error={errors.directorName?.message}
          required
        />

        {/* Annual Turnover */}
        <div>
          <Input
            label="Annual Turnover"
            type="number"
            currency
            placeholder="0"
            {...register('turnover', { valueAsNumber: true })}
            error={errors.turnover?.message}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter your company &quot s annual turnover in pounds
          </p>
        </div>

        {/* Funding Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Funding Type *
          </label>
          <select
            {...register('fundingType')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {fundingTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.fundingType && (
            <p className="text-red-600 text-sm mt-1">{errors.fundingType.message}</p>
          )}
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purpose of Funding *
          </label>
          <select
            {...register('purpose')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select purpose...</option>
            {purposeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.purpose && (
            <p className="text-red-600 text-sm mt-1">{errors.purpose.message}</p>
          )}
        </div>

        {/* Loan Amount */}
        <div>
          <Input
            label="Loan Amount Required"
            type="number"
            currency
            placeholder="0"
            {...register('loanAmount', { valueAsNumber: true })}
            error={errors.loanAmount?.message}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum £1,000 - Maximum £10,000,000
          </p>
        </div>

        {/* Repayment Term */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Repayment Term *
          </label>
          <select
            {...register('repaymentTerm', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {repaymentTermOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.repaymentTerm && (
            <p className="text-red-600 text-sm mt-1">{errors.repaymentTerm.message}</p>
          )}
        </div>

        {/* Live Preview */}
        {watch('loanAmount') && watch('repaymentTerm') && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-medium text-blue-900 mb-2">Estimated Monthly Payment</h4>
            <p className="text-2xl font-bold text-blue-900">
              {formatCurrency((watch('loanAmount') || 0) / (watch('repaymentTerm') || 1))}
            </p>
            <p className="text-sm text-blue-700">
              Based on {formatCurrency(watch('loanAmount') || 0)} over {watch('repaymentTerm')} months
            </p>
            <p className="text-xs text-blue-600 mt-1">
              *This is a rough estimate. Actual rates and terms will vary based on your application.
            </p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Quotes...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-5 w-5" />
              Get Quotes
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>✓ No impact on your credit score</p>
          <p>✓ Quotes are indicative and subject to full application</p>
          <p>✓ Free service with no hidden fees</p>
        </div>
      </form>
    </Card>
  );
}