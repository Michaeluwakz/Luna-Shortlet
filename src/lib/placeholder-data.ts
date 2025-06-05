
import type { Property, BookingRequest } from './definitions';

export const placeholderProperties: Property[] = [
  {
    id: 'p1',
    name: 'Guzape 4-Bedroom Luxury Retreat',
    tagline: 'Spacious luxury in Guzape with smart features.',
    description: 'Enjoy an unforgettable stay in this stunning 4-bedroom luxury apartment located in the serene Guzape district. Perfect for families or groups, offering modern amenities and smart home technology for ultimate comfort and convenience.',
    location: 'Abuja, NG',
    address: 'Plot 10, Guzape Hills, Asokoro Extension, Abuja, Nigeria',
    pricePerNight: 330000,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 4,
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Smart Lock', 'Generator', 'Security', 'Smart TV', 'DSTV'],
    images: [
      'https://i.ibb.co/kgv6sb2q/4-Bedroom-Luxury-Apartment-Location-Guzape-Price-330k-Features-Enjoy-the-perfect-stay-with-Smart-Loc.jpg',
      'https://i.ibb.co/PGdpbBz4/4-Bedroom-Luxury-Apartment-Location-Guzape-Price-330k-Features-Enjoy-the-perfect-stay-with-Smart-Loc.jpg',
      'https://i.ibb.co/Fkcmbt28/4-Bedroom-Luxury-Apartment-Location-Guzape-Price-330k-Features-Enjoy-the-perfect-stay-with-Smart-Loc.jpg'
    ],
    rating: 4.9,
    reviewsCount: 60,
    host: { name: 'Luna Stays Guzape', avatarUrl: 'https://placehold.co/100x100.png' },
    type: 'Apartment',
  },
  {
    id: 'p2',
    name: 'Elegant 3-Bedroom Apartment',
    tagline: 'Book your luxurious 3-bedroom or 2-bedroom stay today.',
    description: 'Experience pure luxury in our 3-bedroom apartment units, also available as a 2-bedroom configuration. Modern, stylish, and fully equipped for a premium shortlet experience in a prime Abuja location.',
    location: 'Abuja, NG', 
    address: '15 Jabi Lake View, Jabi, Abuja, Nigeria',
    pricePerNight: 250000, // For 3-bedroom
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Refundable Caution Deposit', 'Security', 'DSTV', 'Parking'],
    images: [
      'https://i.ibb.co/5xftsx1d/Luxury-3bedroom-Apartment-units-open-for-bookings-Rate-per-night-250k-As-2bed-200-K-Refundable-cauti.jpg',
      'https://i.ibb.co/XrzZnmRT/Luxury-3bedroom-Apartment-units-open-for-bookings-Rate-per-night-250k-As-2bed-200-K-Refundable-cauti.jpg',
      'https://i.ibb.co/cccMYqrG/Luxury-3bedroom-Apartment-units-open-for-bookings-Rate-per-night-250k-As-2bed-200-K-Refundable-cauti.jpg'
    ],
    rating: 4.7,
    reviewsCount: 45,
    host: { name: 'Luna Premium Suites', avatarUrl: 'https://placehold.co/100x100.png' },
    type: 'Apartment',
  },
  {
    id: 'p3',
    name: 'Gwarinpa 2-Bedroom Getaway with PS5',
    tagline: 'Whole apartment with Wi-Fi, Netflix, and PS5.',
    description: 'Your perfect Gwarinpa escape! This 2-bedroom apartment offers the whole property to yourself, complete with fast Wi-Fi, Netflix, a PS5 for entertainment, and prime comfort in a sought-after residential area.',
    location: 'Abuja, NG',
    address: 'Plot 30, 5th Avenue, Gwarinpa Estate, Abuja, Nigeria',
    pricePerNight: 170000,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Netflix', 'PS5', 'Prime Video', 'Security', 'Generator'],
    images: [
      'https://i.ibb.co/xKbKFs4c/2bedroom-apartment-whole-property-Location-Gwarinpa-Price-170k-night-Features-Wi-Fi-Netflix-Ps5-Prim.jpg'
    ],
    rating: 4.6,
    reviewsCount: 55,
    host: { name: 'Gwarinpa Fun Stays', avatarUrl: 'https://placehold.co/100x100.png' },
    type: 'Apartment',
  }
];

export const placeholderBookings: BookingRequest[] = [
  {
    id: 'b1',
    propertyId: 'p1',
    propertyName: 'Guzape 4-Bedroom Luxury Retreat',
    guestName: 'Adekunle Gold', 
    guestEmail: 'adegold@example.com',
    checkInDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), 
    checkOutDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), 
    numGuests: 4,
    status: 'Pending',
    requestedAt: new Date().toISOString(),
  },
  {
    id: 'b2',
    propertyId: 'p2',
    propertyName: 'Elegant 3-Bedroom Apartment',
    guestName: 'Chioma Nwosu',
    guestEmail: 'cnwosu@example.com',
    checkInDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    checkOutDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(),
    numGuests: 2,
    status: 'Confirmed',
    requestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), 
  },
   {
    id: 'b3',
    propertyId: 'p3',
    propertyName: 'Gwarinpa 2-Bedroom Getaway with PS5',
    guestName: 'Femi Adebayo',
    guestEmail: 'femi.ade@example.com',
    checkInDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    checkOutDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
    numGuests: 3,
    status: 'Pending',
    requestedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
