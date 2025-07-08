import { Card } from '../../components/ui/card';

export default function QuotesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Generate Quotes</h1>
        <p className="text-gray-600 mt-2">Get loan quotes from multiple lenders</p>
      </div>
      
      <Card title="Quote Generation" description="This will be the quote generation form">
        <div className="py-12 text-center text-gray-500">
          <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
          <p>Quote generation will be implemented in Phase 3</p>
        </div>
      </Card>
    </div>
  );
} 