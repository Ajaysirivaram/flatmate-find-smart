
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ListingTabsProps {
  children: React.ReactNode;
}

export const ListingTabs: React.FC<ListingTabsProps> = ({ children }) => {
  return (
    <Tabs defaultValue="roommate" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="roommate">Roommates</TabsTrigger>
        <TabsTrigger value="hostel">Hostels & PGs</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

interface ListingTabContentProps {
  value: string;
  children: React.ReactNode;
}

export const ListingTabContent: React.FC<ListingTabContentProps> = ({ value, children }) => {
  return (
    <TabsContent value={value} className="space-y-4">
      {children}
    </TabsContent>
  );
};

export default ListingTabs;
