import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Database, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto text-center">
            Last updated: June 30, 2025
          </p>
        </div>
      </div>

      {/* Policy Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-8">
              At GATE Scholar Hub, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-2 text-blue-600" />
                  Information We Collect
                </h2>
                <p className="text-gray-700 mb-4">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Personal identification information (name, email address, etc.)</li>
                  <li>Academic information (GATE scores, academic history)</li>
                  <li>Usage data and analytics about how you interact with our website</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-blue-600" />
                  How We Use Your Information
                </h2>
                <p className="text-gray-700 mb-4">We may use the information we collect for various purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Providing and maintaining our service</li>
                  <li>Personalizing your experience</li>
                  <li>Improving our website and services</li>
                  <li>Communicating with you about updates and offers</li>
                  <li>Analyzing usage patterns and trends</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate security measures to protect your personal information. However, 
                  please be aware that no method of transmission over the Internet or electronic storage 
                  is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
                <p className="text-gray-700 mb-4">
                  We may employ third-party companies and individuals to facilitate our service, provide 
                  service on our behalf, or assist us in analyzing how our service is used.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-gray-700 mt-2">
                  <Mail className="inline-block w-5 h-5 mr-2 text-blue-600" />
                  privacy@gatescholarhub.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">GATE Scholar Hub</h3>
          <p className="text-gray-400 mb-6">Empowering GATE aspirants to achieve their engineering dreams</p>
          <div className="flex justify-center gap-8 text-sm">
            <Link to="/colleges" className="hover:text-blue-400 transition-colors">Colleges</Link>
            <Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500">
            <p>&copy; 2025 GATE Scholar Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
