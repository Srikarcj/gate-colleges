import React from 'react';
import { Star, MapPin, Users, TrendingUp, BookOpen, Award, Heart, Share2, Eye, Plus, Check, IndianRupee, HeartOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type College } from '@/data/collegesData';
import FeeStructureModal from './FeeStructureModal';
import { useFavorites } from '@/contexts/FavoritesContext';

interface CollegeCardProps {
  college: College;
  onCompareToggle?: (college: College) => void;
  isInCompareList?: boolean;
  viewMode: 'grid' | 'list';
  hideFavoriteButton?: boolean;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ 
  college, 
  onCompareToggle, 
  isInCompareList = false, 
  viewMode,
  hideFavoriteButton = false
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [isFavorited, setIsFavorited] = React.useState(false);

  React.useEffect(() => {
    setIsFavorited(isFavorite(college.id));
  }, [college.id, isFavorite]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorited) {
      removeFromFavorites(college.id);
    } else {
      addToFavorites(college.id);
    }
    setIsFavorited(!isFavorited);
  };
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRankingBadge = (rank: number) => {
    if (rank <= 10) return 'bg-yellow-500 text-white';
    if (rank <= 25) return 'bg-blue-500 text-white';
    if (rank <= 50) return 'bg-green-500 text-white';
    return 'bg-gray-500 text-white';
  };

  const formatFee = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* College Image */}
            <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden relative shadow-md">
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                loading="lazy"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-gradient-to-r', 'from-blue-400', 'to-purple-500', 'flex', 'items-center', 'justify-center');
                  target.parentElement!.innerHTML = `<span class="text-white text-2xl font-bold">${college.name.split(' ').map(word => word[0]).join('').substring(0, 3)}</span>`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>
              {/* College Logo */}
              <div className="absolute top-2 right-2 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-lg p-1.5 shadow-lg border border-white/20">
                <img
                  src={college.logo}
                  alt={`${college.name} logo`}
                  className="w-full h-full object-contain filter drop-shadow-sm"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to college type badge if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement!;
                    parent.classList.remove('bg-white/95', 'backdrop-blur-sm');
                    parent.classList.add('bg-gradient-to-r', 'from-blue-400', 'to-purple-500', 'flex', 'items-center', 'justify-center');
                    parent.innerHTML = `<span class="text-white text-xs font-bold">${college.type}</span>`;
                  }}
                />
              </div>
              {/* College Type Badge */}
              <div className="absolute bottom-2 left-2">
                <Badge className={`text-xs ${
                  college.type === 'IIT' ? 'bg-yellow-500' :
                  college.type === 'NIT' ? 'bg-blue-500' :
                  college.type === 'IIIT' ? 'bg-purple-500' :
                  'bg-green-500'
                } text-white`}>
                  {college.type}
                </Badge>
              </div>
            </div>

            {/* College Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{college.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {college.location}
                    </span>
                    <Badge className={getRankingBadge(college.nirfRanking)}>
                      NIRF #{college.nirfRanking}
                    </Badge>
                  </div>
                </div>
                {onCompareToggle && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCompareToggle(college)}
                      className={isInCompareList ? 'bg-blue-50 border-blue-300' : ''}
                    >
                      {isInCompareList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      Compare
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className={`text-lg font-bold ${getRatingColor(college.rating)}`}>
                    {college.rating}/5
                  </div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {formatFee(college.feeStructure.totalPerYear)}
                  </div>
                  <div className="text-xs text-gray-600">Per Year</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {college.placements.averagePackage}
                  </div>
                  <div className="text-xs text-gray-600">Avg Package</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {college.placements.placementRate}%
                  </div>
                  <div className="text-xs text-gray-600">Placement</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {college.branches.slice(0, 4).map(branch => (
                  <Badge key={branch} variant="secondary" className="text-xs">
                    {branch}
                  </Badge>
                ))}
                {college.branches.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{college.branches.length - 4} more
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1 lg:flex-initial">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <CollegeDetailModal college={college} />
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4" />
                      Fee Structure
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Fee Structure - {college.name}</DialogTitle>
                    </DialogHeader>
                    <FeeStructureModal college={college} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
      {/* College Header with Image */}
      <div className="h-32 relative overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
          onError={(e) => {
            // Fallback to gradient if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.classList.add('bg-gradient-to-r', 'from-blue-400', 'to-purple-500');
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/50 transition-all duration-300"></div>

        {/* College Name Overlay */}
        <div className="absolute bottom-16 left-4 right-4">
          <h3 className="text-white font-bold text-sm leading-tight drop-shadow-lg line-clamp-2">
            {college.name}
          </h3>
        </div>

        <div className="absolute top-4 left-4">
          <Badge className={getRankingBadge(college.nirfRanking)}>
            NIRF #{college.nirfRanking}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {!hideFavoriteButton && (
            <Button 
              variant="secondary" 
              size="sm" 
              className={`h-8 w-8 p-0 ${isFavorited ? 'bg-red-500/20 border-red-400/30 hover:bg-red-500/30' : 'bg-white/20 border-white/30 hover:bg-white/30'}`}
              onClick={handleFavoriteClick}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'text-red-500 fill-current' : 'text-white'}`} />
            </Button>
          )}
          <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-white/20 border-white/30 hover:bg-white/30">
            <Share2 className="w-4 h-4 text-white" />
          </Button>
        </div>
        {/* College Logo */}
        <div className="absolute bottom-4 right-4 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-white/20">
          <img
            src={college.logo}
            alt={`${college.name} logo`}
            className="w-full h-full object-contain filter drop-shadow-sm"
            loading="lazy"
            onError={(e) => {
              // Fallback to college type badge if logo fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement!;
              parent.classList.remove('bg-white/95', 'backdrop-blur-sm');
              parent.classList.add('bg-gradient-to-r', 'from-blue-400', 'to-purple-500', 'flex', 'items-center', 'justify-center');
              parent.innerHTML = `<span class="text-white text-xs font-bold">${college.type}</span>`;
            }}
          />
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge className={`${
            college.type === 'IIT' ? 'bg-yellow-500' :
            college.type === 'NIT' ? 'bg-blue-500' :
            college.type === 'IIIT' ? 'bg-purple-500' :
            'bg-green-500'
          } text-white`}>
            {college.type}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
              {college.name}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              {college.location}
            </div>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className={`font-bold ${getRatingColor(college.rating)}`}>
              {college.rating}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {formatFee(college.feeStructure.totalPerYear)}
            </div>
            <div className="text-xs text-gray-600">Per Year</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-lg font-bold text-purple-600">
              {college.placements.averagePackage}
            </div>
            <div className="text-xs text-gray-600">Avg Package</div>
          </div>
        </div>

        {/* Total Program Fee */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-center">
          <div className="text-sm text-blue-600 mb-1">Total Program Fee (2 Years)</div>
          <div className="text-xl font-bold text-blue-800">
            {formatFee(college.feeStructure.totalProgram)}
          </div>
        </div>

        {/* Placement Rate Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Placement Rate</span>
            <span className="text-sm font-bold text-blue-600">
              {college.placements.placementRate}%
            </span>
          </div>
          <Progress 
            value={college.placements.placementRate} 
            className="h-2"
          />
        </div>

        {/* Branches */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {college.branches.slice(0, 3).map(branch => (
              <Badge key={branch} variant="secondary" className="text-xs">
                {branch}
              </Badge>
            ))}
            {college.branches.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{college.branches.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Eye className="w-4 h-4 mr-2" />
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <CollegeDetailModal college={college} />
            </DialogContent>
          </Dialog>
          
          {onCompareToggle && (
            <Button
              variant="outline"
              onClick={() => onCompareToggle(college)}
              className={`px-3 ${isInCompareList ? 'bg-blue-50 border-blue-300' : ''}`}
            >
              {isInCompareList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </Button>
          )}
        </div>

        {/* Fee Structure Button */}
        <div className="mt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <IndianRupee className="w-4 h-4" />
                View Fee Structure
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Fee Structure - {college.name}</DialogTitle>
              </DialogHeader>
              <FeeStructureModal college={college} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

const CollegeDetailModal: React.FC<{ college: College }> = ({ college }) => {
  const formatFee = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">{college.name}</DialogTitle>
        <div className="flex items-center gap-4 text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {college.location}
          </span>
          <Badge className="bg-blue-500 text-white">
            NIRF #{college.nirfRanking}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-bold">{college.rating}/5</span>
          </div>
        </div>
      </DialogHeader>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="placements">Placements</TabsTrigger>
          <TabsTrigger value="admissions">Admissions</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Total Program Fee:</span>
                    <span className="ml-2 text-green-600 font-bold">
                      {formatFee(college.feeStructure.totalProgram)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Per Year Fee:</span>
                    <span className="ml-2 text-blue-600 font-bold">
                      {formatFee(college.feeStructure.totalPerYear)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">NIRF Ranking:</span>
                    <span className="ml-2 font-bold">#{college.nirfRanking}</span>
                  </div>
                  <div>
                    <span className="font-medium">Rating:</span>
                    <span className="ml-2 font-bold">{college.rating}/5</span>
                  </div>
                  <div>
                    <span className="font-medium">Established:</span>
                    <span className="ml-2">{college.established}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Branches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {college.branches.map(branch => (
                    <Badge key={branch} variant="secondary">
                      {branch}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fees" className="mt-6">
          <FeeStructureModal college={college} />
        </TabsContent>

        <TabsContent value="placements" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Placement Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Placement Rate</span>
                      <span className="font-bold text-blue-600">
                        {college.placements.placementRate}%
                      </span>
                    </div>
                    <Progress value={college.placements.placementRate} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">
                        {college.placements.averagePackage}
                      </div>
                      <div className="text-sm text-gray-600">Average Package</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">
                        {college.placements.highestPackage}
                      </div>
                      <div className="text-sm text-gray-600">Highest Package</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Recruiters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {college.placements.topRecruiters.map(recruiter => (
                    <Badge key={recruiter} variant="outline" className="px-3 py-1">
                      {recruiter}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="admissions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Admission Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">GATE Cutoffs (Previous Year)</h4>
                  <div className="space-y-2">
                    {Object.entries(college.admissions.gateCutoffs).map(([branch, cutoff]) => (
                      <div key={branch} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">{branch}</span>
                        <Badge variant="secondary">{cutoff}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Admission Process</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• GATE score based admission</p>
                    <p>• Counseling through CCMT/Institute level</p>
                    <p>• Document verification required</p>
                    <p>• Seat allotment based on rank</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Campus Facilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {college.facilities.map(facility => (
                  <div key={facility} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{facility}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CollegeCard;
