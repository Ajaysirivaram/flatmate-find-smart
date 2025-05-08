
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Check, Shield, ShieldCheck, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  
  const plans = {
    basic: {
      name: 'Basic',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: {
        listings: 3,
        boosts: 0,
        analytics: 'Basic',
        premiumBadge: false,
        prioritySupport: false,
        chatLimit: 'Up to 10 users',
      }
    },
    standard: {
      name: 'Standard',
      monthlyPrice: 249,
      yearlyPrice: 2499,
      features: {
        listings: 10,
        boosts: 1,
        analytics: 'Standard',
        premiumBadge: true,
        prioritySupport: false,
        chatLimit: 'Up to 50 users',
      }
    },
    premium: {
      name: 'Premium',
      monthlyPrice: 999,
      yearlyPrice: 9999,
      features: {
        listings: 'Unlimited',
        boosts: 5,
        analytics: 'Advanced',
        premiumBadge: true,
        prioritySupport: true,
        chatLimit: 'Unlimited',
      }
    }
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  const calculatePrice = () => {
    const plan = plans[selectedPlan as keyof typeof plans];
    return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const calculateExpiryDate = () => {
    const date = new Date();
    if (billingPeriod === 'monthly') {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setFullYear(date.getFullYear() + 1);
    }
    return date.toISOString();
  };

  const handleSubscribe = async () => {
    if (!user) return;
    
    try {
      setIsProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (selectedPlan !== 'basic') {
        // Create subscription record in database
        const { error } = await supabase
          .from('subscriptions')
          .insert({
            user_id: user.id,
            tier: selectedPlan,
            expires_at: calculateExpiryDate()
          });
        
        if (error) throw error;
      }
      
      // Show success message and navigate back
      toast({
        title: 'Subscription Successful',
        description: `You are now subscribed to the ${plans[selectedPlan as keyof typeof plans].name} plan!`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast({
        title: 'Subscription Failed',
        description: 'There was an error processing your payment',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AppLayout>
      <div className="py-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Choose a Subscription Plan</h1>
          <p className="text-muted-foreground mb-6">
            Select the plan that best suits your hostel management needs
          </p>
          
          <div className="mb-6">
            <Tabs defaultValue="monthly" onValueChange={(value) => setBillingPeriod(value)}>
              <div className="flex justify-center mb-4">
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly (Save 15%)</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Basic Plan */}
            <Card className={`border ${selectedPlan === 'basic' ? 'border-primary ring-2 ring-primary/20' : ''}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Basic</CardTitle>
                <CardDescription>For individuals and small hostels</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">₹0</span>
                  <span className="text-muted-foreground"> /free</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Up to 3 listings</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Basic analytics</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Up to 10 chats</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <X className="h-4 w-4 mr-2" />
                    <span className="text-sm">Boost credits</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <X className="h-4 w-4 mr-2" />
                    <span className="text-sm">Premium badge</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={selectedPlan === 'basic' ? 'default' : 'outline'} 
                  className="w-full"
                  onClick={() => setSelectedPlan('basic')}
                >
                  {selectedPlan === 'basic' ? 'Selected' : 'Select'}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Standard Plan */}
            <Card className={`border ${selectedPlan === 'standard' ? 'border-primary ring-2 ring-primary/20' : ''}`}>
              <CardHeader className="pb-2 relative">
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                </div>
                <CardTitle className="text-lg">Standard</CardTitle>
                <CardDescription>For growing hostel businesses</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">
                    ₹{billingPeriod === 'monthly' ? '249' : '2,499'}
                  </span>
                  <span className="text-muted-foreground"> /{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Up to 10 listings</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Standard analytics</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Up to 50 chats</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">1 boost credit/month</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Premium badge</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={selectedPlan === 'standard' ? 'default' : 'outline'} 
                  className="w-full"
                  onClick={() => setSelectedPlan('standard')}
                >
                  {selectedPlan === 'standard' ? 'Selected' : 'Select'}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Premium Plan */}
            <Card className={`border ${selectedPlan === 'premium' ? 'border-primary ring-2 ring-primary/20' : ''}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Premium</CardTitle>
                <CardDescription>For professional hostel chains</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">
                    ₹{billingPeriod === 'monthly' ? '999' : '9,999'}
                  </span>
                  <span className="text-muted-foreground"> /{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Unlimited listings</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Advanced analytics</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Unlimited chats</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">5 boost credits/month</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Premium badge + Support</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={selectedPlan === 'premium' ? 'default' : 'outline'} 
                  className="w-full"
                  onClick={() => setSelectedPlan('premium')}
                >
                  {selectedPlan === 'premium' ? 'Selected' : 'Select'}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {selectedPlan !== 'basic' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Details</CardTitle>
                <CardDescription>
                  Complete your subscription to the {plans[selectedPlan as keyof typeof plans].name} plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">
                      {plans[selectedPlan as keyof typeof plans].name} Plan ({billingPeriod === 'monthly' ? 'Monthly' : 'Yearly'})
                    </span>
                    <span>
                      ₹{billingPeriod === 'monthly' 
                        ? plans[selectedPlan as keyof typeof plans].monthlyPrice 
                        : plans[selectedPlan as keyof typeof plans].yearlyPrice}
                    </span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <div className="flex justify-between mb-4 text-green-600">
                      <span>Yearly discount</span>
                      <span>-15%</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>₹{calculatePrice()}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 mb-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="font-medium">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="font-medium">UPI</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {paymentMethod === 'card' ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={handleCardDetailsChange}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input 
                        id="cardName"
                        name="cardName"
                        placeholder="John Doe"
                        value={cardDetails.cardName}
                        onChange={handleCardDetailsChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={handleCardDetailsChange}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={handleCardDetailsChange}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input 
                        id="upiId"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                <div className="mt-6 flex items-center border border-primary/20 bg-primary/5 rounded-md p-3">
                  <ShieldCheck className="h-5 w-5 text-primary mr-3 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Secure Payment & Easy Cancellation</p>
                    <p className="text-muted-foreground">You can cancel your subscription anytime from your account dashboard</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button 
                  className="w-full"
                  onClick={handleSubscribe}
                  disabled={
                    isProcessing || 
                    (paymentMethod === 'card' && 
                      (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiry || !cardDetails.cvv)) ||
                    (paymentMethod === 'upi' && !upiId)
                  }
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" /> 
                      Subscribe - ₹{calculatePrice()}
                    </>
                  )}
                </Button>
                <div className="text-xs text-center text-muted-foreground">
                  By subscribing, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Refund Policy</a>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Subscription;
