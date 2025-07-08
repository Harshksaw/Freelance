import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowRight, FileText, Search, Calculator } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-lg blur opacity-20 animate-pulse"></div>
          <h1 className="relative text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to Broker Box
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The complete platform for managing funding deals and generating competitive quotes from 100+ alternative lenders
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Deals</h3>
            <p className="text-gray-600 mb-4">Submit new funding deals with company validation and detailed requirements</p>
            <Link href="/new-deal">
              <Button variant="outline" className="group/btn">
                Start New Deal
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100/50">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Deals</h3>
            <p className="text-gray-600 mb-4">View, search, and manage all your submitted deals in one organized table</p>
            <Link href="/deals">
              <Button variant="outline" className="group/btn">
                View All Deals
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100/50">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
              <Calculator className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Quotes</h3>
            <p className="text-gray-600 mb-4">Get competitive quotes from multiple lenders and compare terms instantly</p>
            <Link href="/quotes">
              <Button variant="outline" className="group/btn">
                Get Quotes
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Trusted by Brokers Nationwide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold mb-2">100+</div>
            <div className="text-blue-100">Alternative Lenders</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">£50M+</div>
            <div className="text-blue-100">Funding Facilitated</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Platform Availability</div>
          </div>
        </div>
      </div>
    </div>
  );
}
