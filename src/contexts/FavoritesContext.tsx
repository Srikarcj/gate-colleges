import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { College } from '@/data/collegesData';

type FavoritesContextType = {
  favorites: string[];
  addToFavorites: (collegeId: string) => void;
  removeFromFavorites: (collegeId: string) => void;
  isFavorite: (collegeId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favoriteColleges');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteColleges', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (collegeId: string) => {
    if (!favorites.includes(collegeId)) {
      setFavorites(prev => [...prev, collegeId]);
    }
  };

  const removeFromFavorites = (collegeId: string) => {
    setFavorites(prev => prev.filter(id => id !== collegeId));
  };

  const isFavorite = (collegeId: string) => {
    return favorites.includes(collegeId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
