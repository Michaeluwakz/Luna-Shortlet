
'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, differenceInCalendarDays } from 'date-fns';
import { BookingFormSchema, type BookingFormData, type Property, type PendingBookingData } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label'; // Keep if used directly, otherwise remove
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Users, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Added Card components
import { useRouter } from 'next/navigation'; // Import useRouter

interface BookingFormProps {
  property: Pick<Property, 'id' | 'name' | 'pricePerNight' | 'maxGuests'>;
}

export function BookingForm({ property }: BookingFormProps) {
  const { toast } = useToast();
  const router = useRouter(); // Initialize router
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [numberOfNights, setNumberOfNights] = useState<number | null>(null);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      propertyId: property.id,
      propertyName: property.name,
      pricePerNight: property.pricePerNight,
      numGuests: 1,
      fullName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const { watch, setValue } = form; // Removed 'setError' and 'clearErrors' as direct usage for maxGuests is removed
  const checkInDate = watch('checkInDate');
  const checkOutDate = watch('checkOutDate');
  const numGuests = watch('numGuests');

  useEffect(() => {
    if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
      const nights = differenceInCalendarDays(checkOutDate, checkInDate);
      setNumberOfNights(nights);
      setTotalPrice(nights * property.pricePerNight);
    } else {
      setNumberOfNights(null);
      setTotalPrice(null);
    }
  }, [checkInDate, checkOutDate, property.pricePerNight]);

  // Max guests validation is now primarily handled by the Zod schema if refined,
  // or by the input's max attribute and server-side validation in a real app.
  // The dynamic setError shown previously can be part of more complex Zod schema or handled differently.
  // For this iteration, we rely on the input's max and the schema for basic validation.

  const onSubmit: SubmitHandler<BookingFormData> = (data) => {
    // Validation errors are caught by RHF + Zod before this function is called.
    // We only proceed if form is valid.
    
    const bookingDetailsForPayment: PendingBookingData = {
      ...data,
      totalPrice,
      numberOfNights,
    };

    try {
      localStorage.setItem('pendingBooking', JSON.stringify(bookingDetailsForPayment));
      router.push('/payment');
    } catch (error) {
      console.error("Error saving to localStorage or redirecting:", error);
      toast({
        title: "Error",
        description: "Could not proceed to payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 shadow-xl rounded-lg">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-2xl font-semibold font-headline text-primary mb-1">Book Your Stay</CardTitle>
        <p className="text-lg font-bold text-foreground">
          ₦{property.pricePerNight.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">/ night</span>
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="checkInDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Check-in Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkOutDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Check-out Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <= (checkInDate || new Date(new Date().setHours(0,0,0,0))) // Ensure check-out is after check-in
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="numGuests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Guests (Max: {property.maxGuests})</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        type="number" 
                        min="1" 
                        max={property.maxGuests} 
                        placeholder={`e.g., 2 (max ${property.maxGuests})`} 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value, 10))}
                        className="pl-10" 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="e.g., you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="e.g., +234 801 234 5678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any special requests or questions?" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {totalPrice !== null && numberOfNights !== null && numberOfNights > 0 && (
              <div className="p-4 bg-muted/50 rounded-md border border-border">
                <h4 className="font-semibold text-lg mb-2">Booking Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>₦{property.pricePerNight.toLocaleString()} x {numberOfNights} night{numberOfNights > 1 ? 's' : ''}</span>
                  <span>₦{(property.pricePerNight * numberOfNights).toLocaleString()}</span>
                </div>
                <hr className="my-2 border-border" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Estimated Total</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            )}
            
            {Object.keys(form.formState.errors).length > 0 && !form.formState.isValid && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm flex items-center gap-2">
                  <AlertCircle size={18} />
                  Please correct the errors above before proceeding.
              </div>
            )}

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6" disabled={form.formState.isSubmitting || (numberOfNights !== null && numberOfNights <=0 )}>
              {form.formState.isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
