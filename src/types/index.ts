export type PageType = 
  | 'home' 
  | 'rooms-and-suites' 
  | 'amenities' 
  | 'reviews' 
  | 'about-us' 
  | 'contact' 
  | 'sign-in' 
  | 'booking';

export interface Room {
  id: string;
  name: string;
  chamberNumber: string;
  tier: 'Deluxe' | 'Premium' | 'Executive' | 'Grand Penthouse';
  pricePerNight: number;
  subPriceLabel?: string;
  badge?: string;
  wing: string;
  sizeSqm: number;
  maxGuests: number;
  bedConfig: string;
  view: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  features: string[];
  amenitiesList: string[];
  hasBalcony: boolean;
  hasOceanView: boolean;
  hasKingBed: boolean;
  hasPrivateJacuzzi: boolean;
}

export interface Amenity {
  id: string;
  title: string;
  category: 'wellness' | 'recreation' | 'services' | 'business';
  categories: string[];
  location: string;
  hours: string;
  highlightTag: string;
  badgeTag?: string;
  description: string;
  imageUrl?: string;
  iconName: string;
  metricLabel: string;
  metricIcon: string;
  actionText: string;
  actionPayload: string;
  isMeshVisual?: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  avatarLetter: string;
  suiteType: string;
  stayDate: string;
  rawDate: string;
  rating: number;
  headline: string;
  content: string;
  helpfulCount: number;
  category: 'suites' | 'dining' | 'executive' | 'romantic';
  categories: string[];
  isVerified: boolean;
}

export interface BookingDetails {
  room: Room | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
  addOns: {
    chauffeur: boolean;
    champagne: boolean;
    spaRitual: boolean;
    butlerService: boolean;
  };
  totalNights: number;
  roomTotal: number;
  addOnsTotal: number;
  taxesAndFees: number;
  grandTotal: number;
  confirmationCode?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  memberTier: string;
  joinedYear: string;
  points: number;
  upcomingStay?: string;
}
