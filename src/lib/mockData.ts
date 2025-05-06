
export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  verified: boolean;
  type: 'individual' | 'business';
}

export interface Listing {
  id: string;
  type: 'roommate' | 'hostel';
  title: string;
  description: string;
  price: number;
  location: string;
  coordinates?: { lat: number; lng: number };
  images: string[];
  tags: string[];
  amenities: string[];
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  genderPreference?: 'male' | 'female' | 'any';
  roomType?: 'private' | 'shared' | 'any';
  availableFrom: string;
  availableUntil?: string;
}

// Generate mock listings
export const mockListings: Listing[] = [
  {
    id: '1',
    type: 'roommate',
    title: 'Looking for flatmate in 2BHK Indiranagar',
    description: 'Spacious 2BHK with balcony and modern amenities. Looking for clean, working professional. Vegetarian preferred.',
    price: 15000,
    location: 'Indiranagar, Bangalore',
    images: ['https://images.unsplash.com/photo-1682261174056-01df3c747525'],
    tags: ['Working Professional', 'Vegetarian', 'No Smoking'],
    amenities: ['Wi-Fi', 'AC', 'Washing Machine', 'Furnished'],
    createdAt: '2023-05-12T10:30:00Z',
    updatedAt: '2023-05-12T10:30:00Z',
    ownerId: 'u1',
    ownerName: 'Priya Singh',
    genderPreference: 'female',
    roomType: 'private',
    availableFrom: '2023-06-01',
  },
  {
    id: '2',
    type: 'roommate',
    title: 'Flatmate needed for luxury apartment',
    description: 'Modern 3BHK in gated community with gym and pool. Looking for clean, professional male.',
    price: 18000,
    location: 'Koramangala, Bangalore',
    images: ['https://images.unsplash.com/photo-1669570094762-828f3dfaf675'],
    tags: ['Working Professional', 'Non-Vegetarian', 'Pet Friendly'],
    amenities: ['Wi-Fi', 'AC', 'Gym', 'Swimming Pool', 'Furnished'],
    createdAt: '2023-05-10T14:20:00Z',
    updatedAt: '2023-05-10T14:20:00Z',
    ownerId: 'u2',
    ownerName: 'Rahul Sharma',
    ownerAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    genderPreference: 'male',
    roomType: 'private',
    availableFrom: '2023-06-15',
  },
  {
    id: '3',
    type: 'hostel',
    title: 'Comfort PG for Women',
    description: 'Clean and secure PG accommodation for women with homely food and all modern amenities.',
    price: 9000,
    location: 'BTM Layout, Bangalore',
    images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457'],
    tags: ['Female Only', 'Food Included', 'Wi-Fi'],
    amenities: ['Food', 'Wi-Fi', 'Laundry', 'Security', 'Housekeeping'],
    createdAt: '2023-05-08T09:15:00Z',
    updatedAt: '2023-05-09T11:30:00Z',
    ownerId: 'b1',
    ownerName: 'Lakshmi PG',
    genderPreference: 'female',
    roomType: 'shared',
    availableFrom: '2023-06-01',
  },
  {
    id: '4',
    type: 'hostel',
    title: 'Modern Co-living Space',
    description: 'Premium co-living space for professionals with community events, workspace and recreational areas.',
    price: 14000,
    location: 'HSR Layout, Bangalore',
    images: ['https://images.unsplash.com/photo-1601918774946-25832a4be0f6'],
    tags: ['Co-living', 'Modern', 'Events'],
    amenities: ['Wi-Fi', 'Workspace', 'Gaming Zone', 'Cafeteria', 'Laundry'],
    createdAt: '2023-05-07T16:45:00Z',
    updatedAt: '2023-05-07T16:45:00Z',
    ownerId: 'b2',
    ownerName: 'Urban Nest Co-living',
    ownerAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    genderPreference: 'any',
    roomType: 'private',
    availableFrom: '2023-06-10',
  },
  {
    id: '5',
    type: 'roommate',
    title: 'Roommate for 3BHK near Tech Park',
    description: 'Well-maintained apartment walking distance from major tech parks. Ideal for IT professionals.',
    price: 12000,
    location: 'Whitefield, Bangalore',
    images: ['https://images.unsplash.com/photo-1626178793926-22b28830aa30'],
    tags: ['IT Professional', 'Walking Distance', 'Vegetarian'],
    amenities: ['Wi-Fi', 'Power Backup', 'Security', 'Parking'],
    createdAt: '2023-05-06T13:10:00Z',
    updatedAt: '2023-05-06T13:10:00Z',
    ownerId: 'u3',
    ownerName: 'Vikram Nair',
    genderPreference: 'male',
    roomType: 'shared',
    availableFrom: '2023-07-01',
  },
  {
    id: '6',
    type: 'hostel',
    title: 'Student Hostel near University',
    description: 'Affordable accommodation for students with study areas and mess facilities.',
    price: 7500,
    location: 'Yelahanka, Bangalore',
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5'],
    tags: ['Students', 'Study Room', 'Mess'],
    amenities: ['Wi-Fi', 'Library', 'Mess', 'Laundry'],
    createdAt: '2023-05-05T10:20:00Z',
    updatedAt: '2023-05-05T10:20:00Z',
    ownerId: 'b3',
    ownerName: 'Scholar\'s Hostel',
    genderPreference: 'any',
    roomType: 'shared',
    availableFrom: '2023-06-20',
  },
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Priya Singh',
    email: 'priya@example.com',
    verified: true,
    type: 'individual'
  },
  {
    id: 'u2',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    verified: true,
    type: 'individual'
  },
  {
    id: 'u3',
    name: 'Vikram Nair',
    email: 'vikram@example.com',
    verified: false,
    type: 'individual'
  },
  {
    id: 'b1',
    name: 'Lakshmi PG',
    email: 'lakshmipg@example.com',
    phoneNumber: '+919876543210',
    verified: true,
    type: 'business'
  },
  {
    id: 'b2',
    name: 'Urban Nest Co-living',
    email: 'info@urbannest.com',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    phoneNumber: '+919876543211',
    verified: true,
    type: 'business'
  },
  {
    id: 'b3',
    name: 'Scholar\'s Hostel',
    email: 'contact@scholarshostel.com',
    phoneNumber: '+919876543212',
    verified: false,
    type: 'business'
  },
];

// Helper to get listing by ID
export const getListingById = (id: string): Listing | undefined => {
  return mockListings.find(listing => listing.id === id);
};

// Helper to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};
