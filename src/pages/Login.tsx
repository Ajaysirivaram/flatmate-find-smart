
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo behavior - would connect to auth service in real app
    if (email && password) {
      toast.success('Login successful!');
      navigate('/');
    } else {
      toast.error('Please enter both email and password');
    }
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtp) {
      if (phone) {
        setShowOtp(true);
        toast.success('OTP sent to your phone');
      } else {
        toast.error('Please enter your phone number');
      }
    } else {
      if (otp) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Please enter the OTP');
      }
    }
  };

  const handleGoogleLogin = () => {
    toast.info('Google login would be implemented in the full version');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <div className="p-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/welcome')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-heading mb-2">Login to Tenant</h1>
            <p className="text-gray-600">
              Continue to find your perfect living situation
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-soft">
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </div>
                  
                  <div className="text-right text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Login
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="phone">
                <form onSubmit={handlePhoneLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={showOtp}
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
                      />
                      <div className="flex justify-end">
                        <Button 
                          type="button" 
                          variant="link"
                          onClick={() => toast.info('OTP resent!')}
                        >
                          Resend OTP
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {showOtp ? 'Verify OTP' : 'Send OTP'}
                  </Button>
                </form>
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
            >
              <img 
                src="https://authjs.dev/img/providers/google.svg" 
                alt="Google" 
                className="h-5 w-5 mr-2" 
              />
              Google
            </Button>
          </div>
          
          <div className="text-center text-sm">
            <p>
              Don't have an account?{' '}
              <a href="#" className="text-primary hover:underline font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
