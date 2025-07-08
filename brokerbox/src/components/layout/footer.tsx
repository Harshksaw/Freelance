import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Broker Box</h3>
                <p className="text-sm text-gray-400">Deal Management Platform</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              The only approved platform working with 100+ alternative lenders across the UK. 
              Streamline your funding deals with our clean, efficient broker management system.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/new-deal" className="text-gray-300 hover:text-white transition-colors">
                  Create New Deal
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-300 hover:text-white transition-colors">
                  Manage Deals
                </Link>
              </li>
              <li>
                <Link href="/quotes" className="text-gray-300 hover:text-white transition-colors">
                  Generate Quotes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href="mailto:info@brokerbox.co.uk" className="text-gray-300 hover:text-white transition-colors">
                  info@brokerbox.co.uk
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <a href="tel:+44203926847" className="text-gray-300 hover:text-white transition-colors">
                  +44 203 926 847
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-gray-300">
                  London, United Kingdom
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2024 Broker Box. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="text-sm text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}