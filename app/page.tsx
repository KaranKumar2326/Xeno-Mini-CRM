import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Users, ChartBar, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center shadow-sm bg-white">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-blue-800">Xeno CRM</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/features" className="text-gray-700 hover:text-blue-600 transition">
            Features
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition">
            Pricing
          </Link>
          {/* Corrected Login Button */}
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionize Your Customer Relationship Management
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Xeno CRM helps you streamline customer interactions, boost sales, and drive growth with intelligent insights.
          </p>
          <div className="flex space-x-4">
            <Link href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold">
              Start Free Trial
            </Link>
            <Link href="/demo" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition text-lg">
              Watch Demo
            </Link>
          </div>
        </div>
        <div className="relative">
          <Image
            // image from unsplash online
            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JtfGVufDB8fDB8fHwy"
            alt="CRM Dashboard"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Powerful Features for Your Business
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition">
              <Users className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl font-semibold mb-2">Customer Tracking</h3>
              <p className="text-gray-600">Comprehensive customer profiles and interaction history.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition">
              <ChartBar className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl font-semibold mb-2">Sales Analytics</h3>
              <p className="text-gray-600">Intuitive dashboards and predictive insights.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition">
              <ShieldCheck className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl font-semibold mb-2">Data Security</h3>
              <p className="text-gray-600">Enterprise-grade security and compliance.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition">
              <CheckCircle className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl font-semibold mb-2">Task Automation</h3>
              <p className="text-gray-600">Streamline workflows and boost productivity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Transform Your Customer Management?
        </h2>
        <p className="text-xl mb-8">
          Join thousands of businesses using Xeno CRM to drive growth and efficiency.
        </p>
        <div className="flex justify-center space-x-4">
          {/* This Login button remains as it's in the CTA, not the nav */}
          <Link
            href="/login"
            className="border border-white text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Xeno CRM</h3>
            <p className="text-gray-400">Empowering businesses with intelligent customer relationship management.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link href="/demo" className="text-gray-400 hover:text-white">Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Support</Link></li>
              {/* This Login link remains in the footer */}
              <li><Link href="/login" className="text-gray-400 hover:text-white">Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; 2025 Xeno CRM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}