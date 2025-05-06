
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/components/layout/AppLayout';
import { ArrowLeft, Camera, Info } from 'lucide-react';
import { toast } from 'sonner';

const lifestyleTags = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'non_smoking', label: 'Non-Smoking' },
  { id: 'pets_allowed', label: 'Pets Allowed' },
  { id: 'early_bird', label: 'Early Bird' },
  { id: 'night_owl', label: 'Night Owl' },
  { id: 'fitness', label: 'Fitness Enthusiast' },
];

const amenities = [
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'ac', label: 'AC' },
  { id: 'washing_machine', label: 'Washing Machine' },
  { id: 'furniture', label: 'Furnished' },
  { id: 'parking', label: 'Parking' },
  { id: 'gym', label: 'Gym' },
];

const PostListing = () => {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState<'roommate' | 'hostel'>('roommate');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(10000);
  const [location, setLocation] = useState('');
  const [roomType, setRoomType] = useState('');
  const [genderPreference, setGenderPreference] = useState('');
  const [selectedLifestyleTags, setSelectedLifestyleTags] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [availableFrom, setAvailableFrom] = useState('');
  const [showPrivacyOptions, setShowPrivacyOptions] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);

  const handleLifestyleTagChange = (id: string) => {
    setSelectedLifestyleTags(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  const handleAmenityChange = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Listing posted successfully! It would be live in the full version.');
    navigate('/');
  };

  return (
    <AppLayout>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Post a Listing</h1>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>I want to list a</Label>
            <RadioGroup 
              defaultValue="roommate" 
              className="flex flex-col sm:flex-row gap-4"
              onValueChange={(value) => setListingType(value as 'roommate' | 'hostel')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="roommate" id="roommate" />
                <Label htmlFor="roommate">Room for Roommate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hostel" id="hostel" />
                <Label htmlFor="hostel">Hostel / PG</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Listing Title</Label>
              <Input 
                id="title" 
                placeholder={`E.g., ${listingType === 'roommate' ? 'Looking for flatmate in 2BHK near Metro' : 'Comfortable PG for working professionals'}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your property, rules, expectations..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="Area, Landmark, City"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Monthly Rent (₹)</Label>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>₹{(price / 1000).toFixed(1)}K</span>
                  <span>₹100K</span>
                </div>
                <Slider 
                  value={[price]} 
                  min={1000} 
                  max={100000} 
                  step={500}
                  onValueChange={(value) => setPrice(value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="availableFrom">Available From</Label>
                <Input 
                  id="availableFrom" 
                  type="date"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Select value={roomType} onValueChange={setRoomType}>
                  <SelectTrigger id="roomType">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private Room</SelectItem>
                    <SelectItem value="shared">Shared Room</SelectItem>
                    {listingType === 'hostel' && (
                      <SelectItem value="dormitory">Dormitory</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genderPreference">Gender Preference</Label>
                <Select value={genderPreference} onValueChange={setGenderPreference}>
                  <SelectTrigger id="genderPreference">
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male Only</SelectItem>
                    <SelectItem value="female">Female Only</SelectItem>
                    <SelectItem value="any">Any Gender</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div>
              <Label className="block mb-3">Amenities</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={amenity.id} 
                      checked={selectedAmenities.includes(amenity.id)}
                      onCheckedChange={() => handleAmenityChange(amenity.id)}
                    />
                    <label 
                      htmlFor={amenity.id} 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="block mb-3">Lifestyle Tags</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {lifestyleTags.map((tag) => (
                  <div key={tag.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={tag.id}
                      checked={selectedLifestyleTags.includes(tag.id)}
                      onCheckedChange={() => handleLifestyleTagChange(tag.id)}
                    />
                    <label 
                      htmlFor={tag.id} 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {tag.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <Label className="block mb-2">Upload Photos</Label>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div 
                  key={item}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                >
                  <Camera className="h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Add Photo</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 flex items-center">
              <Info className="h-3 w-3 mr-1" /> Add clear, well-lit photos for better responses
            </p>
          </div>
          
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Privacy & Visibility Options
              </CardTitle>
              <CardDescription>
                Control who can see your listing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-3">
                <Checkbox 
                  id="privacy" 
                  checked={showPrivacyOptions}
                  onCheckedChange={(checked) => setShowPrivacyOptions(checked === true)}
                />
                <label htmlFor="privacy" className="text-sm font-medium">
                  Show only to same gender
                </label>
              </div>
              
              {showPrivacyOptions && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="boost" 
                      checked={isEnhanced}
                      onCheckedChange={(checked) => setIsEnhanced(checked === true)}
                    />
                    <div>
                      <label htmlFor="boost" className="text-sm font-medium flex items-center">
                        Enhance visibility with ₹49 boost
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-white rounded-full">
                          48h
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Get 5x more views and priority placement in search
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Post Listing
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default PostListing;
