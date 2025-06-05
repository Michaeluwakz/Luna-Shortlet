
import { z } from 'zod';

export type Property = {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  location: string;
  address: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[]; // URLs of placeholder images
  rating?: number;
  reviewsCount?: number;
  host?: {
    name: string;
    avatarUrl?: string;
  };
  type: 'Apartment' | 'Villa' | 'Studio' | 'House';
};

export type BookingRequest = {
  id: string;
  propertyId: string;
  propertyName: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkInDate: string; // ISO string
  checkOutDate: string; // ISO string
  numGuests: number;
  message?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  requestedAt: string; // ISO string
};

export type AdminUser = {
  id: string;
  email: string;
  // In a real app, password would be a hash, not stored directly
};

export const popularLocations = ["Abuja, FCT", "Lagos, LA", "Port Harcourt, RV", "Kano, KN", "Ibadan, OY", "Enugu, EN"];
export const commonAmenities = ["WiFi", "Kitchen", "Air Conditioning", "Washer", "Generator", "Security", "Swimming Pool", "Gym", "Parking", "Smart TV", "DSTV"];

export const BookingFormSchema = z.object({
  propertyId: z.string(),
  propertyName: z.string(),
  pricePerNight: z.number(),
  checkInDate: z.date({
    required_error: "Check-in date is required.",
  }),
  checkOutDate: z.date({
    required_error: "Check-out date is required.",
  }),
  numGuests: z.coerce.number().min(1, "At least one guest is required."),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z.string().optional(),
}).refine((data) => data.checkOutDate > data.checkInDate, {
  message: "Check-out date must be after check-in date.",
  path: ["checkOutDate"], // Path of error
});

export type BookingFormData = z.infer<typeof BookingFormSchema>;

// Schema for payment form
export const PaymentFormSchema = z.object({
  paymentMethod: z.enum(['card', 'transfer'], {
    required_error: "Please select a payment method.",
  }),
  cardHolderName: z.string().optional(),
  cardNumber: z.string()
    .optional()
    .refine(val => !val || (val.length === 16 && /^\d+$/.test(val)), {
      message: "Card number must be 16 digits.",
    }),
  expiryDate: z.string()
    .optional()
    .refine(val => !val || /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), {
      message: "Expiry date must be in MM/YY format.",
    }),
  cvv: z.string()
    .optional()
    .refine(val => !val || (val.length >= 3 && val.length <= 4 && /^\d+$/.test(val)), {
      message: "CVV must be 3 or 4 digits.",
    }),
}).refine(data => {
  if (data.paymentMethod === 'card') {
    return (
      !!data.cardHolderName && data.cardHolderName.length >= 2 &&
      !!data.cardNumber && data.cardNumber.length === 16 && /^\d+$/.test(data.cardNumber) &&
      !!data.expiryDate && /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate) &&
      !!data.cvv && (data.cvv.length === 3 || data.cvv.length === 4) && /^\d+$/.test(data.cvv)
    );
  }
  return true;
}, {
  message: "Please fill in all card details correctly if paying by card.",
  path: ["cardHolderName"], // Path to report error on, can be more specific
});

export type PaymentFormData = z.infer<typeof PaymentFormSchema>;

// For data passed to payment page via localStorage
export interface PendingBookingData extends BookingFormData {
  totalPrice: number | null;
  numberOfNights: number | null;
}
