
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, User } from 'lucide-react';

interface UserTypeOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface UserTypeSelectorProps {
  selectedType: string | null;
  onSelect: (type: string) => void;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ selectedType, onSelect }) => {
  const options: UserTypeOption[] = [
    {
      id: 'individual',
      title: 'I\'m Looking for a Roommate',
      description: 'Find the perfect roommate match based on lifestyle, budget, and location preferences.',
      icon: <User className="h-10 w-10 text-primary" />,
    },
    {
      id: 'business',
      title: 'I Manage a Hostel',
      description: 'List your property, manage multiple rooms, and connect with potential tenants.',
      icon: <Home className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <Card
          key={option.id}
          className={`cursor-pointer transition-all border-2 ${
            selectedType === option.id
              ? 'border-primary shadow-md'
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => onSelect(option.id)}
        >
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-1">{option.icon}</div>
            <div>
              <CardTitle className="text-lg">{option.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{option.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserTypeSelector;
