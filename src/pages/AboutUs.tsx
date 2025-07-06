import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About GATE Scholar Hub</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Empowering GATE aspirants with the tools and information needed to make informed decisions about their engineering education.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              At GATE Scholar Hub, we're dedicated to simplifying the college selection process for GATE aspirants. 
              Our platform provides comprehensive, up-to-date information about top engineering colleges, including 
              IITs, NITs, and leading private institutions across India.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: BookOpen,
                  title: "Comprehensive Data",
                  description: "Detailed information on 200+ engineering colleges"
                },
                {
                  icon: Users,
                  title: "Expert Guidance",
                  description: "Trusted by thousands of GATE aspirants"
                },
                {
                  icon: Award,
                  title: "Proven Success",
                  description: "Helping students secure admissions to top colleges"
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CEO Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Leadership</h2>
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-100 mb-6">
              <img 
                src="/images/ceo.jpg" 
                alt="Srikar CJ"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Srikar CJ</h3>
            <p className="text-blue-600 font-medium mb-4">CEO & Founder</p>
            <p className="text-gray-600 text-center max-w-2xl mb-8">
              Visionary leader and driving force behind GATE Scholar Hub, dedicated to transforming engineering education in India.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream College?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your journey with GATE Scholar Hub today and take the first step towards your engineering future.
          </p>
          <Link to="/colleges">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              Explore Colleges
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
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

export default AboutUs;
