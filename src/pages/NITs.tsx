import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CollegeCard from '@/components/CollegeCard';
import { getNITs } from '@/data/collegesData';
import { type College } from '@/data/collegesData';

const NITs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('ranking');
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);

  const nits = getNITs();
  
  const filteredColleges = nits
    .filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'ranking':
          return a.nirfRanking - b.nirfRanking;
        case 'fees':
          return a.fees - b.fees;
        case 'rating':
          return b.rating - a.rating;
        case 'placement':
          return b.placements.placementRate - a.placements.placementRate;
        default:
          return 0;
      }
    });

  const handleCollegeCompare = (college: College) => {
    setSelectedColleges(prev => 
      prev.includes(college.id) 
        ? prev.filter(id => id !== college.id)
        : prev.length < 3 ? [...prev, college.id] : prev
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/colleges">
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-green-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Colleges
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            National Institutes of Technology (NITs)
          </h1>
          <p className="text-xl text-green-100 mb-6 max-w-3xl">
            Discover India's top government engineering colleges. NITs offer quality education with excellent placement opportunities at affordable fees.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-sm text-green-100 mb-2">Quick Stats:</div>
            <div className="flex flex-wrap gap-6 text-white">
              <div>Total NITs: <span className="font-bold">{nits.length}</span></div>
              <div>Avg. Placement Rate: <span className="font-bold">{Math.round(nits.reduce((acc, college) => acc + college.placements.placementRate, 0) / nits.length)}%</span></div>
              <div>Avg. Fees: <span className="font-bold">₹{Math.round(nits.reduce((acc, college) => acc + college.fees, 0) / nits.length / 100000 * 10) / 10}L</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search NITs by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="ranking">Sort by NIRF Ranking</option>
                <option value="fees">Sort by Fees</option>
                <option value="rating">Sort by Rating</option>
                <option value="placement">Sort by Placement Rate</option>
              </select>
              
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Bar */}
        {selectedColleges.length > 0 && (
          <div className="bg-green-600 text-white rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
              <span className="font-medium">{selectedColleges.length} NIT(s) selected for comparison</span>
              {selectedColleges.length >= 2 && (
                <span className="ml-2 text-green-200">Ready to compare!</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setSelectedColleges([])}
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                Clear
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredColleges.length} of {nits.length} NITs
          </p>
        </div>

        {/* Colleges Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredColleges.map(college => (
            <CollegeCard 
              key={college.id} 
              college={college} 
              viewMode={viewMode}
              onCompareToggle={handleCollegeCompare}
              isInCompareList={selectedColleges.includes(college.id)}
            />
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No NITs found matching your criteria</div>
            <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NITs;
