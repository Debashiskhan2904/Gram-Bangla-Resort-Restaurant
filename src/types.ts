export interface Room {
  id: string;
  title: string;
  price: number;
  capacity: string;
  image: string;
  images?: string[];
  desc: string;
  amenities: string[];
  badge?: string;
  isAvailable?: boolean; // false = Sold Out / Bookings Paused
  soldOutReason?: string; // e.g. "Sold Out", "Fully Booked", "Under Maintenance"
  availableRoomsCount?: number; // e.g. 0 = Sold Out, 1 = Only 1 Left
  blockedDates?: string[]; // array of ISO YYYY-MM-DD dates blocked
}

export interface NearbyAttraction {
  id: string;
  title: string;
  distance: string;
  image: string;
  images?: string[];
  desc: string;
  category?: string;
  mapsQuery?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  categoryName?: string;
  subCategory?: string;
  price?: number;
  desc?: string;
  isVeg: boolean;
  isSpecial?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'resort' | 'dining' | 'heritage';
  url: string;
}

export interface BookingRecord {
  refCode: string;
  name: string;
  phone: string;
  email: string;
  idType: string;
  roomTitle: string;
  roomId: string;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  nights: number;
  baseRate: number;
  tax: number;
  total: number;
  paymentMode: 'upi' | 'resort';
  depositAmount: number;
  status: 'Confirmed' | 'Pending Deposit' | 'Payment Verified' | 'Pending Verification' | 'Rejected';
  utrNumber?: string;
  paymentScreenshot?: string;
  paymentVerifiedAt?: string;
  bookedAt: string;
  specialRequests?: string;
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  submittedAt: string;
  status?: 'New' | 'Contacted' | 'Closed';
}
