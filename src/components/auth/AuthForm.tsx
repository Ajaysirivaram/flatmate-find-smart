
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface AuthFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Login successful!');
        onSuccess();
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      
      if (error) {
        console.error('Signup error details:', error);
        toast.error(error.message);
      } else {
        toast.success('Check your email for the confirmation link!');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone) {
      toast.error('Please enter your phone number');
      return;
    }
    
    if (!showOtp) {
      setLoading(true);
      try {
        const { error } = await supabase.auth.signInWithOtp({
          phone,
        });
        
        if (error) {
          toast.error(error.message);
        } else {
          setShowOtp(true);
          toast.success('OTP sent to your phone');
        }
      } catch (error) {
        console.error('Phone OTP error:', error);
        toast.error('Failed to send OTP');
      } finally {
        setLoading(false);
      }
    } else {
      if (!otp) {
        toast.error('Please enter the OTP');
        return;
      }
      
      setLoading(true);
      try {
        const { error } = await supabase.auth.verifyOtp({
          phone,
          token: otp,
          type: 'sms'
        });
        
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Login successful!');
          onSuccess();
        }
      } catch (error) {
        console.error('OTP verification error:', error);
        toast.error('Failed to verify OTP');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/welcome`
        }
      });
      
      if (error) {
        console.error('Google login error details:', error);
        toast.error(error.message);
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to login with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4" disabled={loading}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Back
      </Button>
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Login or Sign up</h2>
        <p className="text-gray-600 mt-2">Continue to find your perfect living situation</p>
      </div>
      
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading} 
              />
              <Button 
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="link" 
              className="text-sm px-0"
              disabled={loading}
              onClick={() => toast.info('Password reset functionality coming soon')}
            >
              Forgot password?
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              onClick={handleEmailLogin}
              className="w-full"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Login
            </Button>
            <Button
              type="button"
              onClick={handleEmailSignup}
              variant="secondary"
              className="w-full"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Sign Up
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="phone" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={showOtp || loading}
            />
          </div>
          
          {showOtp && (
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password</Label>
              <Input 
                id="otp" 
                type="text" 
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
              />
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="link"
                  disabled={loading}
                  onClick={() => {
                    setShowOtp(false);
                    toast.info('You can now request a new OTP');
                  }}
                >
                  Request new OTP
                </Button>
              </div>
            </div>
          )}
          
          <Button 
            type="button" 
            className="w-full"
            onClick={handlePhoneLogin}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {showOtp ? 'Verify OTP' : 'Send OTP'}
          </Button>
        </TabsContent>
      </Tabs>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <Button 
        type="button" 
        variant="outline" 
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        <img 
          src="https://authjs.dev/img/providers/google.svg" 
          alt="Google" 
          className="h-5 w-5 mr-2" 
        />
        Google
      </Button>
    </div>
  );
};
