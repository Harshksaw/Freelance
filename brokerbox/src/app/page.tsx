import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';

const purposeOptions = [
  { value: 'cash-flow', label: 'Cash Flow Boost' },
  { value: 'equipment', label: 'New Equipment' },
  { value: 'expansion', label: 'Expansion' },
  { value: 'refinance', label: 'Refinance' },
  { value: 'other', label: 'Other' }
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        Broker Box - Component Testing
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="UI Components Test" description="Testing our reusable components">
          <div className="space-y-4">
            <Input 
              label="Company Name"
              placeholder="Enter company name"
            />
            
            <Input 
              label="Loan Amount"
              placeholder="0"
              currency
              type="number"
            />
            
            <Select 
              label="Purpose"
              placeholder="Select purpose"
              options={purposeOptions}
            />
            
            <div className="flex gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="outline">Outline</Button>
            </div>
            
            <Button loading>Loading Button</Button>
          </div>
        </Card>
        
        <Card title="Loading States" description="Different loading components">
          <div className="space-y-4">
            <Loading size="sm" text="Small loading..." />
            <Loading size="md" text="Medium loading..." />
            <Loading size="lg" text="Large loading..." />
          </div>
        </Card>
      </div>
    </main>
  );
}
