
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, TrendingUp, Award, ArrowRight, Star, Target, Zap, Heart } from 'lucide-react';

const Index = () => {
  const handleGatePrepClick = () => {
    window.open('https://gate-ready-with-ai.netlify.app/', '_blank');
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white pt-16 pb-20 -mt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              GATE Scholar Hub
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Your comprehensive platform for GATE preparation, college selection, and career guidance. 
              Discover top engineering colleges, compare rankings, and make informed decisions for your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/colleges">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                  Explore Colleges
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
                onClick={handleGatePrepClick}
              >
                Start GATE Prep
                <BookOpen className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "200+", subtitle: "Top Engineering Colleges", color: "text-blue-600" },
              { icon: Users, title: "50,000+", subtitle: "GATE Aspirants Helped", color: "text-green-600" },
              { icon: TrendingUp, title: "95%", subtitle: "Success Rate", color: "text-purple-600" },
              { icon: Award, title: "1000+", subtitle: "College Placements", color: "text-orange-600" }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.title}</h3>
                <p className="text-gray-600">{stat.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose GATE Scholar Hub?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to succeed in GATE and secure admission to your dream college
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Comprehensive College Database",
                description: "Access detailed information about 200+ top engineering colleges with rankings, fees, placements, and admission criteria.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Zap,
                title: "Advanced Comparison Tools",
                description: "Compare multiple colleges side-by-side with our intelligent comparison system to make informed decisions.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Star,
                title: "Real-time Data & Insights",
                description: "Get the latest placement statistics, cutoff trends, and admission updates from verified sources.",
                color: "from-green-500 to-green-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg animate-fade-in" style={{ animationDelay: `${index * 0.3}s` }}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream College?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of GATE aspirants who have successfully found their perfect engineering college match.
          </p>
          <Link to="/colleges">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 animate-bounce">
              Start Your College Search
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
    </>
  );
};

export default Index;
