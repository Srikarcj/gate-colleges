
import React from 'react';
import { Star, MapPin, TrendingUp, Award, BookOpen, Users, ChevronLeft } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { type College } from '@/data/collegesData';

interface CollegeComparisonProps {
  colleges: College[];
}

const CollegeComparison: React.FC<CollegeComparisonProps> = ({ colleges }) => {
  const navigate = useNavigate();
  // Define field configuration type
  interface FieldConfig {
    key: string;
    label: string;
    format?: (val: any) => string;
    compare?: (a: any, b: any) => number;
  }

  // Update comparison data type
  interface ComparisonSection {
    title: string;
    icon: LucideIcon;
    fields: FieldConfig[];
  }

  const comparisonData: ComparisonSection[] = [
    {
      title: 'Basic Information',
      icon: BookOpen,
      fields: [
        { key: 'name', label: 'College Name' },
        { key: 'type', label: 'Institute Type' },
        { key: 'location', label: 'Location' },
        { key: 'established', label: 'Established', format: (val: number) => val.toString() },
        { 
          key: 'nirfRanking', 
          label: 'NIRF Ranking', 
          format: (val: number) => val ? `#${val}` : 'Not Ranked',
          compare: (a: number, b: number) => a - b
        },
        { 
          key: 'rating', 
          label: 'Rating', 
          format: (val: number) => `${val.toFixed(1)}/5`,
          compare: (a: number, b: number) => b - a
        },
      ]
    },
    {
      title: 'Fees & Financial',
      icon: Award,
      fields: [
        { 
          key: 'fees', 
          label: 'Total Fees', 
          format: (val: number) => `₹${(val / 100000).toFixed(1)}L`,
          compare: (a: number, b: number) => a - b
        },
      ]
    },
    {
      title: 'Placements',
      icon: TrendingUp,
      fields: [
        { 
          key: 'placements.placementRate', 
          label: 'Placement Rate', 
          format: (val: number) => `${val}%`,
          compare: (a: number, b: number) => b - a
        },
        { 
          key: 'placements.averagePackage', 
          label: 'Average Package',
          format: (val: string) => val || 'N/A'
        },
        { 
          key: 'placements.highestPackage', 
          label: 'Highest Package',
          format: (val: string) => val || 'N/A'
        },
      ]
    }
  ];

  const getNestedValue = <T,>(obj: T, path: string): any => {
    return path.split('.').reduce((current: any, key) => {
      if (current === null || current === undefined) return undefined;
      return current[key as keyof typeof current];
    }, obj);
  };

  const getBestValue = (field: string, colleges: College[]) => {
    const values = colleges.map(college => {
      const value = getNestedValue(college, field);
      // Handle different field types appropriately
      if (value === undefined || value === null) return null;
      
      // For numeric comparisons
      if (typeof value === 'number') {
        return value;
      }
      
      // For string comparisons (like package values)
      if (typeof value === 'string') {
        // Extract numeric value from strings like "₹12.5 LPA" or "12.5 LPA"
        const numericMatch = value.match(/[0-9.]+/);
        if (numericMatch) {
          return parseFloat(numericMatch[0]);
        }
      }
      
      return null;
    }).filter((v): v is number => v !== null);

    if (values.length === 0) return null;

    // For fees and ranking, lower is better
    if (field === 'fees' || field === 'nirfRanking') {
      return Math.min(...values);
    }
    
    // For all other numeric comparisons, higher is better
    return Math.max(...values);
  };

  const isHighlighted = (college: College, field: string) => {
    const value = getNestedValue(college, field);
    const bestValue = getBestValue(field, colleges);
    
    if (value === undefined || value === null || bestValue === null) return false;
    
    // Handle numeric comparisons
    if (typeof value === 'number') {
      return value === bestValue;
    }
    
    // Handle string comparisons (like package values)
    if (typeof value === 'string') {
      const numericMatch = value.match(/[0-9.]+/);
      if (numericMatch) {
        const numericValue = parseFloat(numericMatch[0]);
        return Math.abs(numericValue - bestValue) < 0.01; // Handle floating point precision
      }
    }
    
    return false;
  };

  return (
    <div className="space-y-6 overflow-x-auto pb-20 sm:pb-6">
      {/* Mobile back button */}
      <Button 
        variant="ghost" 
        className="sm:hidden flex items-center gap-1 mb-4"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </Button>
      {/* College Headers */}
      <div className="grid grid-cols-1 gap-4 min-w-[800px] sm:min-w-0" style={{ gridTemplateColumns: `minmax(200px, 1fr) repeat(${colleges.length}, minmax(200px, 1fr))` }}>
        <div className="hidden sm:block"></div>
        {colleges.map(college => (
          <Card key={college.id} className="text-center hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm sm:text-lg font-bold mx-auto mb-2 sm:mb-3">
                {college.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
              </div>
              <h3 className="font-bold text-sm sm:text-lg mb-1 line-clamp-2">{college.name}</h3>
              <div className="flex items-center justify-center gap-1 text-xs sm:text-sm text-gray-600">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{college.location}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Sections */}
      {comparisonData.map(section => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <section.icon className="w-5 h-5" />
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {section.fields.map(field => (
                <div 
                  key={field.key}
                  className="grid grid-cols-1 gap-2 sm:gap-4 p-2 sm:p-3 bg-gray-50 rounded-lg min-w-[800px] sm:min-w-0"
                  style={{ gridTemplateColumns: `minmax(200px, 1fr) repeat(${colleges.length}, minmax(150px, 1fr))` }}
                >
                  <div className="font-medium text-gray-700 text-sm sm:text-base flex items-center">
                    {field.label}
                  </div>
                  {colleges.map(college => {
                    const value = getNestedValue(college, field.key);
                    const displayValue = field.format ? field.format(value) : value?.toString() || 'N/A';
                    const highlighted = isHighlighted(college, field.key);
                    
                    return (
                      <div 
                        key={college.id}
                        className={`text-center p-1.5 sm:p-2 rounded text-sm sm:text-base ${
                          highlighted 
                            ? 'bg-green-100 border-2 border-green-500 font-bold text-green-700' 
                            : 'bg-white'
                        }`}
                      >
                        {field.key === 'placements.placementRate' && typeof value === 'number' ? (
                          <div>
                            <div className="font-bold">{value}%</div>
                            <Progress value={value} className="h-2 mt-1" />
                          </div>
                        ) : (
                          <div className={highlighted ? 'font-bold' : ''}>{displayValue}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Branches Comparison */}
      <div className="overflow-x-auto">
        <Card className="min-w-[800px] sm:min-w-0">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              Available Branches
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: `minmax(200px, 1fr) repeat(${colleges.length}, minmax(150px, 1fr))` }}>
              <div className="font-medium text-gray-700 text-sm sm:text-base">Branches Offered</div>
              {colleges.map(college => (
                <div key={college.id} className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {college.branches.slice(0, 3).map(branch => (
                      <Badge key={branch} variant="secondary" className="text-[10px] sm:text-xs">
                        {branch}
                      </Badge>
                    ))}
                    {college.branches.length > 3 && (
                      <Badge variant="outline" className="text-[10px] sm:text-xs">
                        +{college.branches.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    Total: {college.branches.length} branches
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Recruiters Comparison */}
      <div className="overflow-x-auto">
        <Card className="min-w-[800px] sm:min-w-0">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              Top Recruiters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: `minmax(200px, 1fr) repeat(${colleges.length}, minmax(150px, 1fr))` }}>
              <div className="font-medium text-gray-700 text-sm sm:text-base">Major Recruiters</div>
              {colleges.map(college => (
                <div key={college.id} className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {college.placements.topRecruiters.slice(0, 4).map(recruiter => (
                      <Badge key={recruiter} variant="outline" className="text-[10px] sm:text-xs">
                        {recruiter}
                      </Badge>
                    ))}
                    {college.placements.topRecruiters.length > 4 && (
                      <Badge variant="outline" className="text-[10px] sm:text-xs">
                        +{college.placements.topRecruiters.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollegeComparison;
