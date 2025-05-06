
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/components/layout/AppLayout';
import { ArrowLeft, Bookmark, Calendar, MapPin, MessageCircle, Phone, Share } from 'lucide-react';
import { getListingById } from '@/lib/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  
  const listing = id ? getListingById(id) : undefined;
  
  if (!listing) {
    return (
      <AppLayout>
        <div className="py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Listing not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </AppLayout>
    );
  }
  
  const handleSave = () => {
    setSaved(!saved);
    toast[saved ? 'info' : 'success'](`${saved ? 'Removed from' : 'Added to'} favorites`);
  };
  
  const handleShare = () => {
    toast.info('Sharing options would appear in the full version');
  };
  
  const handleChatRequest = () => {
    toast.success('Chat request sent. The host will respond soon.');
    navigate('/chat');
  };
  
  const handlePhoneRequest = () => {
    setShowContactDialog(true);
  };

  return (
    <AppLayout>
      <div className="pb-6">
        {/* Image Carousel */}
        <div className="relative w-full h-72 md:h-96 bg-gray-200 mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="absolute top-4 left-4 z-10 bg-white/80 rounded-full p-2"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          
          <img 
            src={listing.images[0]} 
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button 
              size="icon" 
              className="bg-white text-gray-700 hover:bg-white/90"
              onClick={handleSave}
            >
              <Bookmark className={cn("h-5 w-5", saved && "fill-primary text-primary")} />
            </Button>
            
            <Button 
              size="icon" 
              className="bg-white text-gray-700 hover:bg-white/90"
              onClick={handleShare}
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Listing Info */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-2xl font-bold">{listing.title}</h1>
              <span className="text-xl font-bold">₹{listing.price.toLocaleString()}/mo</span>
            </div>
            
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{listing.location}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {listing.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="px-2 py-1 rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                Available from {new Date(listing.availableFrom).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="host">Host</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card>
                <CardContent className="p-4">
                  <p className="whitespace-pre-line">{listing.description}</p>
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-sm text-gray-500 block">Room Type</span>
                        <span className="font-medium">{listing.roomType === 'private' ? 'Private Room' : 'Shared Room'}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Gender Preference</span>
                        <span className="font-medium capitalize">{listing.genderPreference}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="amenities">
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-y-3">
                    {listing.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="host">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      {listing.ownerAvatar ? (
                        <img src={listing.ownerAvatar} alt={listing.ownerName} />
                      ) : (
                        <AvatarFallback className="bg-primary text-white">
                          {listing.ownerName.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{listing.ownerName}</h3>
                      <span className="text-sm text-gray-500">
                        {listing.type === 'hostel' ? 'Property Manager' : 'Member since 2023'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Contact information is private. Start a conversation to learn more.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Contact Actions */}
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={handleChatRequest}
            >
              <MessageCircle className="h-4 w-4 mr-2" /> Chat Privately
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handlePhoneRequest}
            >
              <Phone className="h-4 w-4 mr-2" /> Request Phone
            </Button>
          </div>

          {/* Phone Verification Dialog */}
          <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Request Contact Information</DialogTitle>
                <DialogDescription>
                  To protect privacy, we require a small fee to reveal contact details.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="rounded-lg bg-muted p-4 mb-4 text-center">
                  <span className="block text-xl font-bold mb-2">₹49</span>
                  <span className="text-sm text-gray-500">one-time fee to connect</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  This helps us ensure quality interactions and protects both parties from spam.
                </p>
                
                <div className="flex items-center border border-primary/20 bg-primary/5 rounded-md p-3">
                  <div className="text-primary mr-3">✓</div>
                  <div className="text-sm">
                    <p className="font-medium">Money-back guarantee</p>
                    <p className="text-gray-500">Full refund if the listing is no longer available</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowContactDialog(false)}
                  className="sm:w-auto w-full order-2 sm:order-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    toast.success("Payment successful! Contact details would be revealed in the full app");
                    setShowContactDialog(false);
                  }}
                  className="sm:w-auto w-full order-1 sm:order-2 bg-primary hover:bg-primary/90"
                >
                  Pay ₹49 & Reveal Contact
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AppLayout>
  );
};

export default ListingDetail;
