
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Users, Building2 } from 'lucide-react';

interface UserTypeSelectorProps {
  selectedType: string | null;
  onSelect: (type: string) => void;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  selectedType,
  onSelect
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card
        className={cn(
          "flex flex-col items-center justify-center p-6 cursor-pointer transition-all border-2",
          selectedType === 'individual' 
            ? "border-primary bg-primary/10" 
            : "border-transparent hover:border-primary/30"
        )}
        onClick={() => onSelect('individual')}
      >
        <Users className="h-12 w-12 mb-2 text-primary" />
        <h3 className="text-sm font-medium">I'm Looking for a Roommate</h3>
      </Card>

      <Card
        className={cn(
          "flex flex-col items-center justify-center p-6 cursor-pointer transition-all border-2",
          selectedType === 'business' 
            ? "border-primary bg-primary/10" 
            : "border-transparent hover:border-primary/30"
        )}
        onClick={() => onSelect('business')}
      >
        <Building2 className="h-12 w-12 mb-2 text-primary" />
        <h3 className="text-sm font-medium">I Manage a Hostel</h3>
      </Card>
    </div>
  );
};
