
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import Colleges from "./pages/Colleges";
import IITs from "./pages/IITs";
import NITs from "./pages/NITs";
import IIITs from "./pages/IIITs";
import PrivateColleges from "./pages/PrivateColleges";
import Favorites from "./pages/Favorites";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
              <Navigation />
              <main className="container mx-auto px-4 py-4">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/colleges" element={<Colleges />} />
                  <Route path="/iits" element={<IITs />} />
                  <Route path="/nits" element={<NITs />} />
                  <Route path="/iiiits" element={<IIITs />} />
                  <Route path="/private-colleges" element={<PrivateColleges />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </FavoritesProvider>
    </QueryClientProvider>
  );
};

export default App;
