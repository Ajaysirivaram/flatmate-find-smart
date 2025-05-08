
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Check, Clock, ExternalLink, Eye, Rocket, ShieldCheck, Timer } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Boost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [listing, setListing] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');

  // Get the listing ID from the location state
  const listingId = location.state?.listingId;

  useEffect(() => {
    if (listingId) {
      fetchListing(listingId);
    }
  }, [listingId]);

  const fetchListing = async (id: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setListing(data);
    } catch (error) {
      console.error('Error fetching listing:', error);
      toast({
        title: 'Error',
        description: 'Failed to load listing details',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  const handleBoost = async () => {
    if (!listing || !user) return;
    
    try {
      setIsPaymentProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create boost record in database
      const { error } = await supabase
        .from('boosts')
        .insert({
          listing_id: listing.id,
          user_id: user.id,
          amount: 49,
          duration_hours: 48
        });
      
      if (error) throw error;
      
      // Show success message and navigate back
      toast({
        title: 'Boost Successful',
        description: 'Your listing has been boosted for 48 hours!',
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating boost:', error);
      toast({
        title: 'Boost Failed',
        description: 'There was an error processing your payment',
        variant: 'destructive',
      });
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      </AppLayout>
    );
  }

  if (!listing) {
    return (
      <AppLayout>
        <div className="py-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Listing Not Found</h2>
            <p className="mb-6">Sorry, we couldn't find the listing you're trying to boost.</p>
            <Button onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

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
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Boost Your Listing</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Listing Details</CardTitle>
              <CardDescription>
                You're about to boost the following listing for 48 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h2 className="font-medium">{listing.title}</h2>
                <p className="text-sm text-muted-foreground">{listing.location}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center py-2">
                <div className="flex flex-col items-center">
                  <Eye className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="text-sm font-medium">{listing.view_count || 0}</span>
                  <span className="text-xs text-muted-foreground">Current Views</span>
                </div>
                <div className="flex flex-col items-center">
                  <Rocket className="h-5 w-5 text-primary mb-1" />
                  <span className="text-sm font-medium">5x</span>
                  <span className="text-xs text-muted-foreground">More Visibility</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="text-sm font-medium">48 hrs</span>
                  <span className="text-xs text-muted-foreground">Boost Duration</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Boost Benefits</CardTitle>
              <CardDescription>
                Why boosting your listing is worth it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Priority Placement</h3>
                    <p className="text-sm text-muted-foreground">
                      Your listing appears at the top of search results
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Enhanced Visibility</h3>
                    <p className="text-sm text-muted-foreground">
                      5x more views than standard listings
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Highlighted Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Special badge and styling to stand out
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Details</CardTitle>
              <CardDescription>
                Select your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Boost (48 hours)</span>
                  <span>₹49</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹49</span>
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
                <ShieldCheck className="h-5 w-5 text-primary mr-3" />
                <div className="text-sm">
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-muted-foreground">Your payment information is securely processed</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button 
                className="w-full"
                onClick={handleBoost}
                disabled={
                  isPaymentProcessing || 
                  (paymentMethod === 'card' && 
                    (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiry || !cardDetails.cvv)) ||
                  (paymentMethod === 'upi' && !upiId)
                }
              >
                {isPaymentProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Timer className="h-4 w-4 mr-2" /> Pay ₹49 & Boost Now
                  </>
                )}
              </Button>
              <div className="text-xs text-center text-muted-foreground">
                By proceeding, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Refund Policy</a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Boost;
