import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { DealsTable } from '../../components/tables/deals-table';
import { Plus } from 'lucide-react';

export default function DealsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Deals</h1>
          <p className="text-gray-600 mt-2">
            View and manage your funding deals
          </p>
        </div>
        <Link href="/new-deal">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Deal
          </Button>
        </Link>
      </div>
      
      <DealsTable />
    </div>
  );
}