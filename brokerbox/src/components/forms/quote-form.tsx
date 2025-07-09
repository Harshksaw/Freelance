'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { CompanySearch } from './company-search';
import { Card } from '../ui/card';
import { MockCompany } from '../../lib/mock-data/companies';
import { Loader2, Calculator } from 'lucide-react';
import { QuoteFormData } from '../../app/quotes/page';

const quoteFormSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  companyNumber: z.string().optional(),
  directorName: z.string().min(1, 'Director name is required'),
  turnover: z.number().min(0, 'Turnover must be positive'),
  fundingType: z.enum(['Loans', 'Invoice Finance', 'Asset Finance', 'Overdraft', 'Other']),
  purpose: z.enum(['Cash Flow Boost', 'New Equipment', 'Expansion', 'Refinance', 'Other']),
  loanAmount: z.number().min(1000, 'Minimum loan amount is £1,000').max(10000000, 'Maximum loan amount is £10,000,000'),
  repaymentTerm: z.number().min(1, 'Minimum term is 1 month').max(120, 'Maximum term is 120 months'),
});

interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => void;
  loading?: boolean;
}

const fundingTypeOptions = [
  { value: 'Loans', label: 'Business Loans' },
  { value: 'Invoice Finance', label: 'Invoice Finance' },
  { value: 'Asset Finance', label: 'Asset Finance' },
  { value: 'Overdraft', label: 'Overdraft' },
  { value: 'Other', label: 'Other' }
];

const purposeOptions = [
  { value: 'Cash Flow Boost', label: 'Cash Flow Boost' },
  { value: 'New Equipment', label: 'New Equipment' },
  { value: 'Expansion', label: 'Business Expansion' },
  { value: 'Refinance', label: 'Refinance Existing Debt' },
  { value: 'Other', label: 'Other Purpose' }
];

const repaymentTermOptions = [
  { value: '6', label: '6 months' },
  { value: '12', label: '1 year' },
  { value: '18', label: '18 months' },
  { value: '24', label: '2 years' },
  { value: '36', label: '3 years' },
  { value: '48', label: '4 years' },
  { value: '60', label: '5 years' },
  { value: '84', label: '7 years' },
  { value: '120', label: '10 years' }
];

export function QuoteForm({ onSubmit, loading }: QuoteFormProps) {
  const [selectedCompany, setSelectedCompany] = useState<MockCompany | null>(null);

  console.log('🚀 ~ :63 ~ QuoteForm ~ selectedCompany::==', selectedCompany)


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
      companyNumber: ''
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
    onSubmit({
      ...data,
      turnover: Number(data.turnover),
      loanAmount: Number(data.loanAmount),
      repaymentTerm: Number(data.repaymentTerm)
    });
  };

  return (
    <Card title="Business Information" description="Enter your details to get personalized loan quotes">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Company Search */}
        <CompanySearch
          label="Company Name"
          placeholder="Search for your company..."
          value={watchedCompanyName || ''}
          onCompanySelect={handleCompanySelect}
          error={errors.companyName?.message}
          required
        />

        {/* Director Name */}
        <Input
          label="Director's Full Name"
          placeholder="Enter full name..."
          {...register('directorName')}
          error={errors.directorName?.message}
          required
        />

        {/* Annual Turnover */}
        <Input
          label="Annual Turnover"
          type="number"
          currency
          placeholder="0"
          {...register('turnover', { valueAsNumber: true })}
          error={errors.turnover?.message}
          required
        />

        {/* Funding Type */}
        <Select
          label="Funding Type"
          options={fundingTypeOptions}
          {...register('fundingType')}
          error={errors.fundingType?.message}
          required
        />

        {/* Purpose */}
        <Select
          label="Purpose of Funding"
          options={purposeOptions}
          {...register('purpose')}
          error={errors.purpose?.message}
          required
        />

        {/* Loan Amount */}
        <Input
          label="Loan Amount Required"
          type="number"
          currency
          placeholder="0"
          {...register('loanAmount', { valueAsNumber: true })}
          error={errors.loanAmount?.message}
          required
        />

        {/* Repayment Term */}
        <Select
          label="Preferred Repayment Term"
          options={repaymentTermOptions}
          {...register('repaymentTerm', { valueAsNumber: true })}
          error={errors.repaymentTerm?.message}
          required
        />

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

        <div className="text-xs text-gray-500 text-center">
          <p>* No impact on your credit score</p>
          <p>Quotes are indicative and subject to full application</p>
        </div>
      </form>
    </Card>
  );
}