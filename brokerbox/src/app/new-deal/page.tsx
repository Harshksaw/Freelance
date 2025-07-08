'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DealForm } from '../../components/forms/deal-form';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ArrowLeft, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export default function NewDealPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  // const [ setCreatedDealId] = useState<string | null>(null);
  const router = useRouter();

  const handleSuccess = () => {
    setIsSuccess(true);
    // Auto-redirect after 3 seconds
    setTimeout(() => {
      router.push('/deals');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <Card className="border-0 shadow-lg">
            <div className="py-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Deal Created Successfully!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your funding deal has been saved and is now available in your dashboard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/deals">
                  <Button size="lg" className="w-full sm:w-auto">
                    View All Deals
                  </Button>
                </Link>
                <Link href="/quotes">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Generate Quotes
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => {
                    setIsSuccess(false);
                    // setCreatedDealId(null);
                  }}
                  className="w-full sm:w-auto"
                >
                  Create Another Deal
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 mt-6">
                Redirecting to deals page in 3 seconds...
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span>/</span>
            <Link href="/deals" className="hover:text-gray-700">
              Deals
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">New Deal</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Deal</h1>
              <p className="text-gray-600 mt-2">
                Enter the details for a new funding deal. All fields marked with * are required.
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
        
        {/* Deal Form */}
        <DealForm onSuccess={handleSuccess} />
        
        {/* Information Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Next Steps */}
          <Card className="border-0 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-900 mb-2">Next Steps</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Deal will be saved to your dashboard</li>
                  <li>• You can view and manage all deals from the Deals page</li>
                  <li>• Generate quotes for this deal from the Quotes page</li>
                  <li>• Track progress and update deal status</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Important Notes */}
          <Card className="border-0 bg-amber-50 border-amber-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-amber-900 mb-2">Important Notes</h3>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Ensure company information is accurate</li>
                  <li>• Loan amounts must be between £1,000 - £10M</li>
                  <li>• All financial figures should be annual amounts</li>
                  <li>• Additional documentation may be required</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Help Section */}
        <div className="mt-8">
          <Card title="Need Help?" description="Having trouble with your deal submission?">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-4">
                  Our support team is here to help you with your funding applications. 
                  Contact us for assistance with deal preparation or platform usage.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
                <Button variant="outline" size="sm">
                  View FAQ
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Spacing */}
        <div className="pb-12"></div>
      </div>
    </div>
  );
}