import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CollegeCard from '@/components/CollegeCard';
import { getIIITs } from '@/data/collegesData';
import { type College } from '@/data/collegesData';
import CollegeComparison from '@/components/CollegeComparison';

const IIITs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('ranking');
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const iiiits = getIIITs();
  
  const selectedCollegeData = iiiits.filter(college => 
    selectedColleges.includes(college.id)
  );
  
  if (showComparison && selectedCollegeData.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setShowComparison(false)}
                variant="outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to IIITs
              </Button>
              <h1 className="text-3xl font-bold">IIITs Comparison</h1>
            </div>
            <Button 
              onClick={() => setSelectedColleges([])}
              variant="outline"
            >
              Clear Selection
            </Button>
          </div>
          <CollegeComparison colleges={selectedCollegeData} />
        </div>
      </div>
    );
  }
  
  const filteredColleges = iiiits
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/colleges">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Colleges
              </Button>
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Indian Institutes of Information Technology (IIITs)
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-3xl">
            Explore India's premier information technology institutes. IIITs are specialized institutes focusing on IT and computer science education with strong industry connections.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-sm text-blue-100 mb-2">Quick Stats:</div>
            <div className="flex flex-wrap gap-6 text-white">
              <div>Total IIITs: <span className="font-bold">{iiiits.length}</span></div>
              <div>Avg. Placement Rate: <span className="font-bold">{Math.round(iiiits.reduce((acc, college) => acc + college.placements.placementRate, 0) / iiiits.length)}%</span></div>
              <div>Top NIRF Rank: <span className="font-bold">#{Math.min(...iiiits.map(c => c.nirfRanking))}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search IIITs by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm"
                >
                  <option value="ranking">NIRF Ranking</option>
                  <option value="fees">Fees (Low to High)</option>
                  <option value="rating">Rating (High to Low)</option>
                  <option value="placement">Placement Rate</option>
                </select>
              </div>
              
              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredColleges.length} of {iiiits.length} IIITs
            {selectedColleges.length > 0 && (
              <span className="ml-4 text-blue-600">
                {selectedColleges.length} selected for comparison
              </span>
            )}
          </div>
        </div>

        {/* Comparison Bar */}
        {selectedColleges.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 sm:bottom-4 sm:left-1/2 sm:right-auto sm:max-w-max sm:rounded-lg sm:transform sm:-translate-x-1/2 bg-purple-600 text-white p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between shadow-2xl z-50 gap-2 sm:gap-4">
            <div className="text-center sm:text-left mb-2 sm:mb-0">
              <div className="font-medium text-sm sm:text-base">
                {selectedColleges.length} IIIT{selectedColleges.length !== 1 ? 's' : ''} selected
              </div>
              <p className="text-xs sm:text-sm text-purple-100">
                {selectedColleges.length < 2 
                  ? `Select ${2 - selectedColleges.length} more to compare` 
                  : 'Ready to compare!'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white text-purple-600 hover:bg-purple-50 w-full sm:w-auto"
                onClick={() => setShowComparison(selectedColleges.length >= 2)}
                disabled={selectedColleges.length < 2}
              >
                Compare ({selectedColleges.length}/3)
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-purple-500 w-full sm:w-auto"
                onClick={() => setSelectedColleges([])}
              >
                Clear All
              </Button>
            </div>
          </div>
        )}

        {/* Colleges Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredColleges.map((college) => (
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
            <div className="text-gray-500 text-lg mb-4">No IIITs found matching your criteria</div>
            <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IIITs;
