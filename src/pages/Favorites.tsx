import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, HeartOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CollegeCard from '@/components/CollegeCard';
import { useFavorites } from '@/contexts/FavoritesContext';
import { collegesData } from '@/data/collegesData';

const Favorites = () => {
  const { favorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const favoriteColleges = collegesData.filter(college => 
    favorites.includes(college.id)
  );

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <HeartOff className="w-16 h-16 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Favorites Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't added any colleges to your favorites yet. Browse colleges and click the heart icon to save them here.
            </p>
            <Link to="/colleges">
              <Button>
                <Heart className="w-4 h-4 mr-2" />
                Browse Colleges
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/colleges">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Colleges
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">My Favorites</h1>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span className="font-medium">{favorites.length} saved</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteColleges.map(college => (
            <div key={college.id} className="relative">
              <CollegeCard 
                college={college} 
                viewMode="grid" 
              />
              <button
                onClick={() => removeFromFavorites(college.id)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow-md hover:bg-red-50 transition-colors"
                aria-label="Remove from favorites"
              >
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
