import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, School, BookOpen, Heart, Info, Shield, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Colleges', path: '/colleges', icon: School },
  { name: 'Favorites', path: '/favorites', icon: Heart },
  { name: 'GATE Prep', path: 'https://gate-ready-with-ai.netlify.app/', icon: BookOpen, external: true },
  { name: 'About', path: '/about', icon: Info },
];

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out transform',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          'md:hidden',
          'pt-20 px-6',
          'flex flex-col space-y-4',
          'overflow-y-auto'
        )}
      >
        {navItems.map((item) => (
          item.external ? (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                'w-full justify-start text-lg p-4',
                location.pathname === item.path ? 'bg-accent' : 'hover:bg-accent/50'
              )}
              onClick={(e) => handleExternalLink(e, item.path)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Button>
          ) : (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                'inline-flex items-center text-lg p-4 rounded-md transition-colors',
                location.pathname === item.path ? 'bg-accent' : 'hover:bg-accent/50',
                'w-full'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        ))}
      </div>

      {/* Desktop navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <School className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GATE Scholar Hub
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) =>
                item.external ? (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={cn(
                      'px-3',
                      location.pathname === item.path ? 'bg-accent' : 'hover:bg-accent/50'
                    )}
                    onClick={(e) => handleExternalLink(e, item.path)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      location.pathname === item.path ? 'bg-accent' : 'hover:bg-accent/50'
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Add padding to account for fixed navbar */}
      <div className="h-16 w-full"></div>
    </>
  );
};

export default Navigation;
