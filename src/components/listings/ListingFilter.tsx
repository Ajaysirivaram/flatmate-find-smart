
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter as FilterIcon, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FilterOption {
  id: string;
  label: string;
}

const genderOptions: FilterOption[] = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'any', label: 'Any' },
];

const professionOptions: FilterOption[] = [
  { id: 'student', label: 'Student' },
  { id: 'working', label: 'Working Professional' },
  { id: 'any', label: 'Any' },
];

const lifestyleOptions: FilterOption[] = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'no_smoking', label: 'No Smoking' },
  { id: 'no_alcohol', label: 'No Alcohol' },
  { id: 'pets_allowed', label: 'Pets Allowed' },
  { id: 'night_owl', label: 'Night Owl' },
  { id: 'early_bird', label: 'Early Bird' },
];

interface ListingFilterProps {
  onFilterChange?: (filters: Record<string, any>) => void;
}

export const ListingFilter: React.FC<ListingFilterProps> = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([5000, 30000]);
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedProfession, setSelectedProfession] = useState<string>('');
  const [selectedLifestyle, setSelectedLifestyle] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState(5);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const handleLifestyleChange = (id: string) => {
    setSelectedLifestyle(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  const handleApplyFilters = () => {
    const filters = {
      priceRange,
      gender: selectedGender,
      profession: selectedProfession,
      lifestyle: selectedLifestyle,
      location,
      radius
    };
    
    if (onFilterChange) {
      onFilterChange(filters);
    }
    
    setIsSheetOpen(false);
  };
  
  const activeFiltersCount = [
    selectedGender, 
    selectedProfession, 
    ...selectedLifestyle, 
    location ? 'location' : ''
  ].filter(Boolean).length;
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-heading font-medium">Discover</h2>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <FilterIcon className="h-4 w-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-primary text-white">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <span>Filters</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </SheetTitle>
              <SheetDescription>
                Refine your search with these filters
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-4 space-y-6 overflow-y-auto max-h-[calc(85vh-10rem)]">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input 
                  placeholder="Enter area or landmark" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="pt-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Radius: {radius} km</span>
                  </div>
                  <Slider 
                    value={[radius]} 
                    min={1} 
                    max={25} 
                    step={1}
                    onValueChange={([value]) => setRadius(value)} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Budget Range</Label>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
                <Slider 
                  value={priceRange} 
                  min={1000} 
                  max={100000} 
                  step={1000}
                  onValueChange={(value) => setPriceRange(value as [number, number])} 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Gender Preference</Label>
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map(option => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Profession</Label>
                <Select value={selectedProfession} onValueChange={setSelectedProfession}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    {professionOptions.map(option => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Lifestyle Preferences</Label>
                <div className="grid grid-cols-2 gap-2">
                  {lifestyleOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id} 
                        checked={selectedLifestyle.includes(option.id)}
                        onCheckedChange={() => handleLifestyleChange(option.id)}
                      />
                      <label 
                        htmlFor={option.id} 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 pt-4 border-t">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setPriceRange([5000, 30000]);
                  setSelectedGender('');
                  setSelectedProfession('');
                  setSelectedLifestyle([]);
                  setLocation('');
                  setRadius(5);
                }}
              >
                Reset All
              </Button>
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {activeFiltersCount > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {selectedGender && (
            <Badge variant="outline" className="whitespace-nowrap">
              {genderOptions.find(g => g.id === selectedGender)?.label}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0"
                onClick={() => setSelectedGender('')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {selectedProfession && (
            <Badge variant="outline" className="whitespace-nowrap">
              {professionOptions.find(p => p.id === selectedProfession)?.label}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0"
                onClick={() => setSelectedProfession('')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {selectedLifestyle.map(lifestyle => (
            <Badge key={lifestyle} variant="outline" className="whitespace-nowrap">
              {lifestyleOptions.find(l => l.id === lifestyle)?.label}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0"
                onClick={() => handleLifestyleChange(lifestyle)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          
          {location && (
            <Badge variant="outline" className="whitespace-nowrap">
              {location} ({radius}km)
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0"
                onClick={() => setLocation('')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default ListingFilter;
