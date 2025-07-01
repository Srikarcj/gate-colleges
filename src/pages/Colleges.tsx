import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Grid, List, School, Building, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CollegeCard from '@/components/CollegeCard';
import CollegeComparison from '@/components/CollegeComparison';
import { collegesData, getIITs, getNITs, getIIITs, getPrivateColleges, type College } from '@/data/collegesData';

const Colleges = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [maxFees, setMaxFees] = useState(500000);
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('ranking');
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Get all unique branches for filter
  const allBranches = Array.from(
    new Set(collegesData.flatMap(college => college.branches))
  ).sort();

  const filteredColleges = collegesData
    .filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBranch = !selectedBranch || college.branches.includes(selectedBranch);
      const matchesType = !selectedType || college.type === selectedType;
      const matchesFees = college.fees <= maxFees;
      const matchesRating = college.rating >= minRating;

      return matchesSearch && matchesBranch && matchesType && matchesFees && matchesRating;
    })
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

  const selectedCollegeData = collegesData.filter(college => 
    selectedColleges.includes(college.id)
  );

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBranch('');
    setSelectedType('');
    setMaxFees(500000);
    setMinRating(0);
  };

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
                Back to Colleges
              </Button>
              <h1 className="text-3xl font-bold">College Comparison</h1>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-blue-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Engineering Colleges Database
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl">
            Discover and compare top engineering colleges across India. Find the perfect match for your GATE score and career aspirations.
          </p>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link to="/iits">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <School className="w-12 h-12 mx-auto mb-4 text-white group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">IITs</h3>
                  <p className="text-blue-100 mb-4">Premier engineering institutes</p>
                  <div className="text-2xl font-bold text-white">{getIITs().length}</div>
                  <div className="text-sm text-blue-100">Institutes</div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/nits">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Building className="w-12 h-12 mx-auto mb-4 text-white group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">NITs</h3>
                  <p className="text-blue-100 mb-4">National engineering colleges</p>
                  <div className="text-2xl font-bold text-white">{getNITs().length}</div>
                  <div className="text-sm text-blue-100">Institutes</div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/iiiits">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4 text-white group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">IIITs</h3>
                  <p className="text-blue-100 mb-4">Information technology institutes</p>
                  <div className="text-2xl font-bold text-white">{getIIITs().length}</div>
                  <div className="text-sm text-blue-100">Institutes</div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/private-colleges">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Building className="w-12 h-12 mx-auto mb-4 text-white group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">Private Colleges</h3>
                  <p className="text-blue-100 mb-4">Top private institutions</p>
                  <div className="text-2xl font-bold text-white">{getPrivateColleges().length}</div>
                  <div className="text-sm text-blue-100">Colleges</div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Search & Filter Colleges</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Branches</option>
              {allBranches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="IIT">IITs</option>
              <option value="NIT">NITs</option>
              <option value="Private">Private</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ranking">Sort by Ranking</option>
              <option value="fees">Sort by Fees</option>
              <option value="rating">Sort by Rating</option>
              <option value="placement">Sort by Placement</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Max Fees:</label>
                <input
                  type="range"
                  min="50000"
                  max="500000"
                  step="10000"
                  value={maxFees}
                  onChange={(e) => setMaxFees(Number(e.target.value))}
                  className="w-32"
                />
                <span className="text-sm text-gray-600">₹{(maxFees / 100000).toFixed(1)}L</span>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Min Rating:</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-gray-600">{minRating}+</span>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Button onClick={clearFilters} variant="outline" size="sm">
                Clear Filters
              </Button>
              
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
          <div className="bg-blue-600 text-white rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
              <span className="font-medium">{selectedColleges.length} college(s) selected for comparison</span>
              {selectedColleges.length >= 2 && (
                <span className="ml-2 text-blue-200">Ready to compare!</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setSelectedColleges([])}
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Clear
              </Button>
              {selectedColleges.length >= 2 && (
                <Button 
                  onClick={() => setShowComparison(true)}
                  variant="secondary"
                  size="sm"
                >
                  Compare Now
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredColleges.length} of {collegesData.length} colleges
          </p>
        </div>

        {/* Colleges Grid */}
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
            <div className="text-gray-500 text-lg mb-4">No colleges found matching your criteria</div>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Colleges;
