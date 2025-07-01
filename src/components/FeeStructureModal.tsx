
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { IndianRupee, Calculator, BookOpen, Home, Utensils, FileText } from 'lucide-react';
import { type College } from '@/data/collegesData';

interface FeeStructureModalProps {
  college: College;
}

const FeeStructureModal: React.FC<FeeStructureModalProps> = ({ college }) => {
  const feeItems = [
    { label: 'Tuition Fee', amount: college.feeStructure.tuitionFee, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Hostel Fee', amount: college.feeStructure.hostelFee, icon: Home, color: 'text-green-600' },
    { label: 'Mess Fee', amount: college.feeStructure.messFee, icon: Utensils, color: 'text-orange-600' },
    { label: 'Registration Fee', amount: college.feeStructure.registrationFee, icon: FileText, color: 'text-purple-600' },
    { label: 'Development Fee', amount: college.feeStructure.developmentFee, icon: Calculator, color: 'text-red-600' },
    { label: 'Library Fee', amount: college.feeStructure.libraryFee, icon: BookOpen, color: 'text-indigo-600' },
    { label: 'Exam Fee', amount: college.feeStructure.examFee, icon: FileText, color: 'text-yellow-600' },
    { label: 'Other Fees', amount: college.feeStructure.otherFees, icon: Calculator, color: 'text-gray-600' },
  ];

  const formatAmount = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <IndianRupee className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Per Year</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {formatAmount(college.feeStructure.totalPerYear)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Total Program (2 Years)</span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              {formatAmount(college.feeStructure.totalProgram)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Fee Structure Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feeItems.map((item, index) => (
              <div key={item.label}>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-white ${item.color}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-700">{item.label}</span>
                  </div>
                  <Badge variant="secondary" className="font-mono">
                    {formatAmount(item.amount)}
                  </Badge>
                </div>
                {index < feeItems.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="text-sm text-yellow-800">
            <div className="font-medium mb-2">📋 Important Notes:</div>
            <ul className="space-y-1 text-xs">
              <li>• Fees mentioned are for M.Tech programs (2 years duration)</li>
              <li>• Hostel and Mess fees are optional for day scholars</li>
              <li>• Fee structure may vary slightly based on specialization</li>
              <li>• Additional charges may apply for optional services</li>
              {college.type === 'IIT' && (
                <li>• IIT fees are subsidized by Government of India</li>
              )}
              {college.type === 'NIT' && (
                <li>• Different fee structure for home state vs other state students</li>
              )}
              {college.type === 'Private' && (
                <li>• Scholarship programs available based on GATE scores</li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeStructureModal;
