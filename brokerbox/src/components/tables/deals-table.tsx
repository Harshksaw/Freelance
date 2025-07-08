'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Loading } from '../ui/loading';
import { useDeals } from '../../hooks/use-deals';
import { cn } from '../../lib/utils/cn';
import { 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Building2,
  Calendar,
  PoundSterling,
  FileText
} from 'lucide-react';

interface Deal {
  id: string;
  companyName: string;
  companyNumber?: string;
  businessTurnover: number;
  fundingType: string;
  purpose: string;
  loanAmount: number;
  notes?: string;
  createdAt: string;
}

export function DealsTable() {
  const { deals, loading, error, pagination, fetchDeals, deleteDeal } = useDeals();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Handle search
  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    await fetchDeals({
      search: value || undefined,
      sortBy,
      sortOrder,
      page: 1
    });
  };

  // Handle sorting
  const handleSort = async (column: string) => {
    const newSortOrder = sortBy === column && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortBy(column);
    setSortOrder(newSortOrder);
    
    await fetchDeals({
      search: searchTerm || undefined,
      sortBy: column,
      sortOrder: newSortOrder,
      page: 1
    });
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    const success = await deleteDeal(id);
    if (success) {
      setDeleteConfirm(null);
    }
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Sort icon component
  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) return <ArrowUpDown className="h-4 w-4" />;
    return sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <Button onClick={() => fetchDeals()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {pagination.total} deal{pagination.total !== 1 ? 's' : ''} total
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-12">
          <Loading text="Loading deals..." />
        </div>
      )}

      {/* Empty State */}
      {!loading && deals.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? `No deals match "${searchTerm}"` : 'Get started by creating your first deal'}
          </p>
          <Button onClick={() => window.location.href = '/new-deal'}>
            Create New Deal
          </Button>
        </div>
      )}

      {/* Table */}
      {!loading && deals.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('companyName')}
                  >
                    <div className="flex items-center space-x-1">
                      <Building2 className="h-4 w-4" />
                      <span>Company</span>
                      <SortIcon column="companyName" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('purpose')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Purpose</span>
                      <SortIcon column="purpose" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('loanAmount')}
                  >
                    <div className="flex items-center space-x-1">
                      <PoundSterling className="h-4 w-4" />
                      <span>Loan Amount</span>
                      <SortIcon column="loanAmount" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('businessTurnover')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Turnover</span>
                      <SortIcon column="businessTurnover" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Created</span>
                      <SortIcon column="createdAt" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {deal.companyName}
                        </div>
                        {deal.companyNumber && (
                          <div className="text-sm text-gray-500">
                            #{deal.companyNumber}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {deal.purpose}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(deal.loanAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(deal.businessTurnover)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(deal.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setDeleteConfirm(deal.id)}
                        className="ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Deal</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this deal? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="danger"
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1"
              >
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}