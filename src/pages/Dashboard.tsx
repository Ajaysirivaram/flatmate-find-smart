
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Eye, MessageCircle, Clock, Trash, Edit, Bookmark, BookmarkX, Timer, Shield, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [listings, setListings] = useState<any[]>([]);
  const [savedListings, setSavedListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserListings();
      fetchSavedListings();
    }
  }, [user]);

  const fetchUserListings = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('owner_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your listings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSavedListings = async () => {
    // In a real app, fetch saved listings from a favorites table
    // This is just a mock implementation
    setSavedListings([]);
  };

  const handleDeleteListing = async (id: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setListings(listings.filter(listing => listing.id !== id));
      toast({
        title: 'Success',
        description: 'Listing deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete listing',
        variant: 'destructive',
      });
    }
  };

  const handleEditListing = (id: string) => {
    navigate(`/listings/edit/${id}`);
  };

  const handleMarkExpired = async (id: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .update({ is_expired: true })
        .eq('id', id);

      if (error) throw error;
      
      setListings(listings.map(listing => 
        listing.id === id ? { ...listing, is_expired: true } : listing
      ));
      
      toast({
        title: 'Success',
        description: 'Listing marked as expired',
      });
    } catch (error) {
      console.error('Error updating listing:', error);
      toast({
        title: 'Error',
        description: 'Failed to update listing',
        variant: 'destructive',
      });
    }
  };

  const handleBoostListing = (id: string) => {
    // Open boost modal
    navigate('/boost', { state: { listingId: id } });
  };
  
  const ListingCard = ({ listing }: { listing: any }) => {
    const daysRemaining = Math.ceil(
      (new Date(listing.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return (
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-base">{listing.title}</h3>
              <p className="text-sm text-muted-foreground">{listing.location}</p>
            </div>
            <div className="flex gap-2">
              {listing.is_boosted && (
                <Badge variant="default" className="bg-primary">Boosted</Badge>
              )}
              {listing.is_expired ? (
                <Badge variant="outline" className="bg-muted text-muted-foreground">Expired</Badge>
              ) : (
                <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <div className="flex justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Eye className="h-4 w-4 mr-1" />
              <span>{listing.view_count} views</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>0 chats</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{daysRemaining} days left</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleEditListing(listing.id)}
              >
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDeleteListing(listing.id)}
              >
                <Trash className="h-4 w-4 mr-1" /> Delete
              </Button>
            </div>
            <div className="flex gap-2">
              {!listing.is_expired && (
                <>
                  {!listing.is_boosted && (
                    <Button 
                      size="sm" 
                      onClick={() => handleBoostListing(listing.id)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Timer className="h-4 w-4 mr-1" /> Boost
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleMarkExpired(listing.id)}
                  >
                    <BookmarkX className="h-4 w-4 mr-1" /> Mark Expired
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  };

  const EmptyListings = () => (
    <div className="text-center py-12">
      <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
      <h3 className="text-lg font-medium mb-2">No listings yet</h3>
      <p className="text-muted-foreground mb-4">Create your first listing to start finding the perfect match</p>
      <Button onClick={() => navigate('/post')}>
        <Plus className="h-4 w-4 mr-2" /> Create Listing
      </Button>
    </div>
  );

  const EmptySaved = () => (
    <div className="text-center py-12">
      <BookmarkX className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
      <h3 className="text-lg font-medium mb-2">No saved listings</h3>
      <p className="text-muted-foreground mb-4">Browse listings and save your favorites</p>
      <Button onClick={() => navigate('/')}>
        Browse Listings
      </Button>
    </div>
  );

  return (
    <AppLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <Button onClick={() => navigate('/post')}>
            <Plus className="h-4 w-4 mr-2" /> New Listing
          </Button>
        </div>

        <Tabs defaultValue="listings">
          <TabsList className="mb-4">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            {profile?.user_type === 'business' && (
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="listings">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              </div>
            ) : listings.length > 0 ? (
              <div>
                {listings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <EmptyListings />
            )}
          </TabsContent>
          
          <TabsContent value="saved">
            {savedListings.length > 0 ? (
              <div>
                {/* Saved listings would go here */}
                <p>Your saved listings</p>
              </div>
            ) : (
              <EmptySaved />
            )}
          </TabsContent>
          
          {profile?.user_type === 'business' && (
            <TabsContent value="subscription">
              <Card className="mb-4">
                <CardHeader>
                  <h2 className="text-xl font-bold">Your Subscription</h2>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <ShieldCheck className="h-6 w-6 text-primary mr-3" />
                    <div>
                      <h3 className="font-medium">Basic Plan</h3>
                      <p className="text-sm text-muted-foreground">Free tier with limited features</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => navigate('/subscription')}
                    className="w-full"
                  >
                    Upgrade to Premium
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="font-medium">Plan Comparison</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 items-center">
                      <div className="font-medium">Feature</div>
                      <div className="text-center">Basic</div>
                      <div className="text-center">Premium</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 items-center border-t pt-2">
                      <div className="text-sm">Listings</div>
                      <div className="text-center text-sm">3</div>
                      <div className="text-center text-sm">Unlimited</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 items-center border-t pt-2">
                      <div className="text-sm">Boost Credits</div>
                      <div className="text-center text-sm">0</div>
                      <div className="text-center text-sm">3 per month</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 items-center border-t pt-2">
                      <div className="text-sm">Analytics</div>
                      <div className="text-center text-sm">Basic</div>
                      <div className="text-center text-sm">Advanced</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 items-center border-t pt-2">
                      <div className="text-sm">Priority Support</div>
                      <div className="text-center text-sm">❌</div>
                      <div className="text-center text-sm">✅</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
