import { Card } from '../../components/ui/card';

export default function DealsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Deals</h1>
        <p className="text-gray-600 mt-2">View and manage your funding deals</p>
      </div>
      
      <Card title="Deals Table" description="This will show all submitted deals">
        <div className="py-12 text-center text-gray-500">
          <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
          <p>Deals table will be implemented in Phase 2</p>
        </div>
      </Card>
    </div>
  );
} 