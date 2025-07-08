'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { CompanySearch } from './company-search';
import { Card } from '../ui/card';
import { dealFormSchema, DealFormData } from '../../lib/validations/deal-schema';
import { MockCompany } from '../../lib/mock-data/companies';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const purposeOptions = [
  { value: 'Cash Flow Boost', label: 'Cash Flow Boost' },
  { value: 'New Equipment', label: 'New Equipment' },
  { value: 'Expansion', label: 'Expansion' },
  { value: 'Refinance', label: 'Refinance' },
  { value: 'Other', label: 'Other' }
];

interface DealFormProps {
  onSuccess?: () => void;
}

export function DealForm({ onSuccess }: DealFormProps) {
  const [selectedCompany, setSelectedCompany] = useState<MockCompany | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<DealFormData>({
    resolver: zodResolver(dealFormSchema),
    defaultValues: {
      fundingType: 'Loans'
    }
  });

  // Handle company selection
  const handleCompanySelect = (company: MockCompany | null) => {
    setSelectedCompany(company);
    if (company) {
      setValue('companyName', company.title);
      setValue('companyNumber', company.company_number);
    } else {
      setValue('companyName', '');
      setValue('companyNumber', '');
    }
  };

  // Format currency input
  const formatCurrency = (value: string): number => {
    const numericValue = value.replace(/[£,\s]/g, '');
    return parseFloat(numericValue) || 0;
  };

  // Handle form submission
  const onSubmit = async (data: DealFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          businessTurnover: formatCurrency(data.businessTurnover.toString()),
          loanAmount: formatCurrency(data.loanAmount.toString()),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          message: 'Deal created successfully!'
        });
        
        // Reset form after successful submission
        reset();
        setSelectedCompany(null);
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        } else {
          // Redirect to deals page after 2 seconds
          setTimeout(() => {
            router.push('/deals');
          }, 2000);
        }
      } else {
        throw new Error(result.error || 'Failed to create deal');
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card title="New Deal Information" description="Enter the details for this funding deal">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Search */}
        <div>
          <CompanySearch
            label="Company Name"
            placeholder="Search for a UK company..."
            value={selectedCompany?.title || ''}
            onCompanySelect={handleCompanySelect}
            error={errors.companyName?.message}
            required
          />
          {selectedCompany && (
            <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Company Validated
                </span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                {selectedCompany.title} (#{selectedCompany.company_number})
              </p>
              <p className="text-xs text-green-600 mt-1">
                {selectedCompany.address_snippet}
              </p>
            </div>
          )}
        </div>

        {/* Business Turnover */}
        <div>
          <Input
            label="Annual Business Turnover"
            type="number"
            currency
            placeholder="0"
            {...register('businessTurnover', { 
              valueAsNumber: true 
            })}
            error={errors.businessTurnover?.message}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the company's annual turnover in pounds
          </p>
        </div>

        {/* Funding Type */}
        <div>
          <Input
            label="Funding Type"
            value="Loans"
            disabled
            {...register('fundingType')}
          />
          <p className="text-xs text-gray-500 mt-1">
            Currently only loan products are available
          </p>
        </div>

        {/* Purpose */}
        <div>
          <Select
            label="Purpose of Funding"
            placeholder="Select the purpose..."
            options={purposeOptions}
            {...register('purpose')}
            error={errors.purpose?.message}
            required
          />
        </div>

        {/* Loan Amount */}
        <div>
          <Input
            label="Loan Amount Required"
            type="number"
            currency
            placeholder="0"
            {...register('loanAmount', { 
              valueAsNumber: true 
            })}
            error={errors.loanAmount?.message}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum £1,000 - Maximum £10,000,000
          </p>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="Any additional information about this deal..."
            {...register('notes')}
          />
          {errors.notes && (
            <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Optional - Maximum 1000 characters
          </p>
        </div>

        {/* Submit Message */}
        {submitMessage && (
          <div className={`p-4 rounded-lg ${
            submitMessage.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              {submitMessage.type === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={`text-sm font-medium ${
                submitMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {submitMessage.message}
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex space-x-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Deal...
              </>
            ) : (
              'Create Deal'
            )}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setSelectedCompany(null);
              setSubmitMessage(null);
            }}
            disabled={isSubmitting}
          >
            Clear Form
          </Button>
        </div>
      </form>
    </Card>
  );
}