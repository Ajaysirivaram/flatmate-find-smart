
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserTypeSelector } from '@/components/auth/UserTypeSelector';
import { OnboardingCarousel } from '@/components/onboarding/OnboardingCarousel';
import { AuthForm } from '@/components/auth/AuthForm';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

enum WelcomeStep {
  SELECT_TYPE,
  ONBOARDING,
  AUTH
}

const Welcome = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<WelcomeStep>(WelcomeStep.SELECT_TYPE);
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();

  // Check if user is already authenticated and redirect if profile is complete
  useEffect(() => {
    if (user && profile?.user_type) {
      navigate('/');
    }
  }, [user, profile, navigate]);

  const handleContinue = () => {
    if (selectedType) {
      setCurrentStep(WelcomeStep.ONBOARDING);
    }
  };

  const handleOnboardingComplete = () => {
    setCurrentStep(WelcomeStep.AUTH);
  };

  const handleAuthSuccess = async () => {
    try {
      if (user && selectedType) {
        // Update the user's profile with the selected type
        await updateProfile({ 
          user_type: selectedType as 'individual' | 'business'
        });
        toast.success('Profile updated successfully!');
        navigate('/');
      } else if (user) {
        // If user is logged in but no type was selected (e.g. Google login redirect)
        if (!profile?.user_type) {
          toast.info('Please select your user type');
          setCurrentStep(WelcomeStep.SELECT_TYPE);
        } else {
          navigate('/');
        }
      } else {
        // Wait a moment for auth state to update
        setTimeout(() => {
          if (user) navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleBackToTypeSelection = () => {
    setCurrentStep(WelcomeStep.SELECT_TYPE);
  };

  const renderStep = () => {
    // If user is already logged in but doesn't have a user_type set, force them to select one
    if (user && !profile?.user_type && currentStep !== WelcomeStep.SELECT_TYPE) {
      return (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Almost there!
            </h1>
            <p className="text-gray-600">
              Please select your account type to continue
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-4">I am a...</h2>
            <UserTypeSelector
              selectedType={selectedType}
              onSelect={setSelectedType}
            />
          </div>
          
          <Button 
            className="w-full mt-6"
            disabled={!selectedType}
            onClick={async () => {
              if (user && selectedType) {
                try {
                  await updateProfile({ 
                    user_type: selectedType as 'individual' | 'business'
                  });
                  toast.success('Profile updated successfully!');
                  navigate('/');
                } catch (error) {
                  console.error('Error updating profile:', error);
                  toast.error('Failed to update profile');
                }
              }
            }}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </>
      );
    }

    switch (currentStep) {
      case WelcomeStep.SELECT_TYPE:
        return (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Welcome to Tenant
              </h1>
              <p className="text-gray-600">
                Find your perfect flatmate or list your hostel vacancies
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-4">I am a...</h2>
              <UserTypeSelector
                selectedType={selectedType}
                onSelect={setSelectedType}
              />
            </div>
            
            <Button 
              className="w-full mt-6"
              disabled={!selectedType}
              onClick={handleContinue}
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </>
        );
      
      case WelcomeStep.ONBOARDING:
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <OnboardingCarousel 
              userType={selectedType!} 
              onComplete={handleOnboardingComplete} 
            />
          </div>
        );
      
      case WelcomeStep.AUTH:
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <AuthForm 
              onSuccess={handleAuthSuccess}
              onBack={handleBackToTypeSelection}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
