
import React from 'react';
import { Star, MapPin, TrendingUp, Award, BookOpen, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { type College } from '@/data/collegesData';

interface CollegeComparisonProps {
  colleges: College[];
}

const CollegeComparison: React.FC<CollegeComparisonProps> = ({ colleges }) => {
  const comparisonData = [
    {
      title: 'Basic Information',
      icon: BookOpen,
      fields: [
        { key: 'name', label: 'College Name' },
        { key: 'location', label: 'Location' },
        { key: 'established', label: 'Established' },
        { key: 'nirfRanking', label: 'NIRF Ranking', format: (val: number) => `#${val}` },
        { key: 'rating', label: 'Rating', format: (val: number) => `${val}/5` },
      ]
    },
    {
      title: 'Fees & Financial',
      icon: Award,
      fields: [
        { key: 'fees', label: 'Total Fees', format: (val: number) => `₹${(val / 100000).toFixed(1)}L` },
      ]
    },
    {
      title: 'Placements',
      icon: TrendingUp,
      fields: [
        { key: 'placements.placementRate', label: 'Placement Rate', format: (val: number) => `${val}%` },
        { key: 'placements.averagePackage', label: 'Average Package' },
        { key: 'placements.highestPackage', label: 'Highest Package' },
      ]
    }
  ];

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const getBestValue = (field: string, colleges: College[]) => {
    const values = colleges.map(college => {
      const value = getNestedValue(college, field);
      if (field === 'fees') return value; // Lower is better for fees
      if (field === 'nirfRanking') return value; // Lower is better for ranking
      if (field === 'placements.placementRate') return value;
      if (field === 'rating') return value;
      return 0;
    });

    if (field === 'fees' || field === 'nirfRanking') {
      return Math.min(...values);
    }
    return Math.max(...values);
  };

  const isHighlighted = (college: College, field: string) => {
    const value = getNestedValue(college, field);
    const bestValue = getBestValue(field, colleges);
    return value === bestValue;
  };

  return (
    <div className="space-y-6">
      {/* College Headers */}
      <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: `300px repeat(${colleges.length}, 1fr)` }}>
        <div></div>
        {colleges.map(college => (
          <Card key={college.id} className="text-center">
            <CardContent className="p-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-3">
                {college.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
              </div>
              <h3 className="font-bold text-lg mb-1 line-clamp-2">{college.name}</h3>
              <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                <MapPin className="w-3 h-3" />
                {college.location}
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
                  className="grid grid-cols-1 gap-4 p-3 bg-gray-50 rounded-lg"
                  style={{ gridTemplateColumns: `300px repeat(${colleges.length}, 1fr)` }}
                >
                  <div className="font-medium text-gray-700">
                    {field.label}
                  </div>
                  {colleges.map(college => {
                    const value = getNestedValue(college, field.key);
                    const displayValue = field.format ? field.format(value) : value;
                    const highlighted = isHighlighted(college, field.key);
                    
                    return (
                      <div 
                        key={college.id}
                        className={`text-center p-2 rounded ${
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Available Branches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: `300px repeat(${colleges.length}, 1fr)` }}>
            <div className="font-medium text-gray-700">Branches Offered</div>
            {colleges.map(college => (
              <div key={college.id} className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {college.branches.map(branch => (
                    <Badge key={branch} variant="secondary" className="text-xs">
                      {branch}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  Total: {college.branches.length} branches
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Recruiters Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Top Recruiters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: `300px repeat(${colleges.length}, 1fr)` }}>
            <div className="font-medium text-gray-700">Major Recruiters</div>
            {colleges.map(college => (
              <div key={college.id} className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {college.placements.topRecruiters.slice(0, 6).map(recruiter => (
                    <Badge key={recruiter} variant="outline" className="text-xs">
                      {recruiter}
                    </Badge>
                  ))}
                </div>
                {college.placements.topRecruiters.length > 6 && (
                  <div className="text-xs text-gray-500">
                    +{college.placements.topRecruiters.length - 6} more companies
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegeComparison;
