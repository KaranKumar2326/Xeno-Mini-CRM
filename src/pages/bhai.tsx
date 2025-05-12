import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChartBar, 
  Rocket, 
  DatabaseCheck 
} from 'lucide-react';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <Head>
        <title>Xeno CRM | Customer Engagement Platform</title>
        <meta name="description" content="AI-powered customer segmentation and campaign management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Smarter <span className="text-indigo-600">Customer Engagement</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Create targeted campaigns with our AI-driven segmentation engine that transforms customer data into actionable insights
          </p>

          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </motion.button>
            </Link>
            
            <Link href="#features">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold border border-indigo-600 shadow-md hover:bg-indigo-50 transition-colors"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Features Section */}
        <section id="features" className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: DatabaseCheck,
              title: 'Intelligent Segmentation',
              description: 'Create complex customer segments with our advanced visual rule builder and AI-powered insights',
              color: 'text-blue-500'
            },
            {
              icon: Rocket,
              title: 'Campaign Automation',
              description: 'Seamlessly schedule and track multi-channel campaigns with precision and ease',
              color: 'text-green-500'
            },
            {
              icon: ChartBar,
              title: 'Real-time Analytics',
              description: 'Monitor campaign performance with live, interactive dashboards and deep insights',
              color: 'text-purple-500'
            }
          ].map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all group"
            >
              <feature.icon 
                className={`w-12 h-12 mb-4 ${feature.color} mx-auto group-hover:scale-110 transition-transform`} 
              />
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Xeno CRM. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;