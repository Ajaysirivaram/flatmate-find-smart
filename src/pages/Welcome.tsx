
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserTypeSelector } from '@/components/onboarding/UserTypeSelector';
import { ArrowRight } from 'lucide-react';

const Welcome = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedType) {
      localStorage.setItem('userType', selectedType);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Welcome to Tenant
            </h1>
            <p className="text-gray-600">
              Find your perfect flatmate or list your hostel vacancies
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-lg font-medium mb-4">I am a...</h2>
            <UserTypeSelector
              selectedType={selectedType}
              onSelect={setSelectedType}
            />
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!selectedType}
            onClick={handleContinue}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
