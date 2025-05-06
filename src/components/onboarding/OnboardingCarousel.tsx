
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, MessageSquare, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface OnboardingCarouselProps {
  userType: string;
  onComplete: () => void;
}

export const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({
  userType,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps: OnboardingStep[] = userType === 'individual' 
    ? [
        {
          icon: <Search className="h-12 w-12 text-primary" />,
          title: 'Find Your Perfect Match',
          description: 'Filter by location, budget, lifestyle preferences, and more to find your ideal roommate.'
        },
        {
          icon: <MessageSquare className="h-12 w-12 text-primary" />,
          title: 'Chat Privately',
          description: 'Connect with potential roommates through our secure in-app messaging.'
        },
        {
          icon: <Shield className="h-12 w-12 text-primary" />,
          title: 'Stay Safe',
          description: 'Verified profiles and privacy controls keep your personal information secure.'
        }
      ]
    : [
        {
          icon: <Search className="h-12 w-12 text-primary" />,
          title: 'List Your Property',
          description: 'Create attractive listings for your hostel or PG with photos and amenities.'
        },
        {
          icon: <MessageSquare className="h-12 w-12 text-primary" />,
          title: 'Connect with Tenants',
          description: 'Respond to inquiries and manage bookings through our platform.'
        },
        {
          icon: <Shield className="h-12 w-12 text-primary" />,
          title: 'Grow Your Business',
          description: 'Boost visibility and track performance with our analytics dashboard.'
        }
      ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mb-6 h-36">
        {steps[currentStep].icon}
      </div>
      <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
      <p className="text-gray-600 text-center mb-8">{steps[currentStep].description}</p>
      
      <div className="flex items-center justify-center space-x-2 mb-8">
        {steps.map((_, index) => (
          <div 
            key={index} 
            className={cn(
              "h-2 rounded-full transition-all", 
              currentStep === index ? "w-8 bg-primary" : "w-2 bg-gray-300"
            )}
          />
        ))}
      </div>
      
      <Button onClick={handleNext} className="w-full">
        {currentStep < steps.length - 1 ? 'Next' : 'Get Started'} 
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
