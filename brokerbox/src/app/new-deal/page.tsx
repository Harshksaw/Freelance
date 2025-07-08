import { Card } from '../../components/ui/card';

export default function NewDealPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Deal</h1>
        <p className="text-gray-600 mt-2">Enter details for a new funding deal</p>
      </div>
      
      <Card title="New Deal Form" description="This will be the deal creation form">
        <div className="py-12 text-center text-gray-500">
          <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
          <p>New deal form will be implemented in Phase 2</p>
        </div>
      </Card>
    </div>
  );
} 