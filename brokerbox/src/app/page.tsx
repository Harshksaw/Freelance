import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowRight, FileText, Search, Calculator, Shield, Clock, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Streamline Your
              <span className="text-blue-600 block">Funding Deals</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect with 100+ alternative lenders through our clean, efficient platform. 
              Manage deals, generate quotes, and close funding faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/new-deal">
                <Button size="lg" className="w-full sm:w-auto">
                  Start New Deal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/quotes">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Generate Quotes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Deals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to efficiently manage your funding pipeline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-xl mb-6">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Deal Creation</h3>
              <p className="text-gray-600 mb-6">
                Create new funding deals with automatic company validation and structured data entry
              </p>
              <Link href="/new-deal">
                <Button variant="outline" className="w-full">
                  Create Deal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-xl mb-6">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Deal Management</h3>
              <p className="text-gray-600 mb-6">
                View, search, and organize all your deals in one comprehensive dashboard
              </p>
              <Link href="/deals">
                <Button variant="outline" className="w-full">
                  View Deals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-xl mb-6">
                <Calculator className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quote Generation</h3>
              <p className="text-gray-600 mb-6">
                Generate competitive quotes from multiple lenders and compare terms instantly
              </p>
              <Link href="/quotes">
                <Button variant="outline" className="w-full">
                  Get Quotes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-xl mb-4">
                <Users className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-lg text-gray-600">Alternative Lenders</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-xl mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">£50M+</div>
              <div className="text-lg text-gray-600">Funding Facilitated</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-xl mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-lg text-gray-600">Platform Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Deal Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join brokers across the UK who trust Broker Box for their funding needs
          </p>
          <Link href="/new-deal">
            <Button size="lg" variant="secondary">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}