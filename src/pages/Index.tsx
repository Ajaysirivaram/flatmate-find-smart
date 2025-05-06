
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ListingFilter from '@/components/listings/ListingFilter';
import ListingCard from '@/components/listings/ListingCard';
import { ListingTabs, ListingTabContent } from '@/components/listings/ListingTabs';
import { mockListings } from '@/lib/mockData';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [savedListings, setSavedListings] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  
  const roommateListings = mockListings.filter(listing => listing.type === 'roommate');
  const hostelListings = mockListings.filter(listing => listing.type === 'hostel');
  
  const handleFilterChange = (filters: Record<string, any>) => {
    console.log('Filters applied:', filters);
    setActiveFilters(filters);
    // Would filter listings based on criteria in a real app
  };
  
  const handleSave = (id: string) => {
    if (savedListings.includes(id)) {
      setSavedListings(savedListings.filter(listingId => listingId !== id));
      toast.info('Removed from favorites');
    } else {
      setSavedListings([...savedListings, id]);
      toast.success('Added to favorites');
    }
  };
  
  return (
    <AppLayout>
      <div className="py-6">
        <ListingFilter onFilterChange={handleFilterChange} />
        
        <ListingTabs>
          <ListingTabContent value="roommate">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roommateListings.map(listing => (
                <ListingCard
                  key={listing.id}
                  id={listing.id}
                  type={listing.type}
                  title={listing.title}
                  price={listing.price}
                  location={listing.location}
                  tags={listing.tags}
                  imageUrl={listing.images[0]}
                  ownerName={listing.ownerName}
                  ownerAvatar={listing.ownerAvatar}
                  saved={savedListings.includes(listing.id)}
                  onSave={handleSave}
                />
              ))}
            </div>
          </ListingTabContent>
          
          <ListingTabContent value="hostel">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hostelListings.map(listing => (
                <ListingCard
                  key={listing.id}
                  id={listing.id}
                  type={listing.type}
                  title={listing.title}
                  price={listing.price}
                  location={listing.location}
                  tags={listing.tags}
                  imageUrl={listing.images[0]}
                  ownerName={listing.ownerName}
                  ownerAvatar={listing.ownerAvatar}
                  saved={savedListings.includes(listing.id)}
                  onSave={handleSave}
                />
              ))}
            </div>
          </ListingTabContent>
        </ListingTabs>
      </div>
    </AppLayout>
  );
};

export default Index;
