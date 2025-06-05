
'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { PaymentFormSchema, type PaymentFormData, type PendingBookingData } from '@/lib/definitions';
import { CreditCard, Landmark, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function PaymentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [pendingBooking, setPendingBooking] = useState<PendingBookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      paymentMethod: 'card',
      cardHolderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const { watch, formState: { errors: paymentErrors, isSubmitting: isPaymentSubmitting } } = paymentForm;
  const selectedPaymentMethod = watch('paymentMethod');

  useEffect(() => {
    const bookingDataString = localStorage.getItem('pendingBooking');
    if (bookingDataString) {
      try {
        const parsedData: PendingBookingData = JSON.parse(bookingDataString);
        setPendingBooking(parsedData);
        if (parsedData.fullName) {
          paymentForm.setValue('cardHolderName', parsedData.fullName);
        }
        // DO NOT remove from localStorage here, only after successful payment or if user navigates away
      } catch (error) {
        console.error("Error parsing booking data from localStorage", error);
        toast({ title: "Error", description: "Could not load booking details. Please try again.", variant: "destructive" });
        router.push('/');
      }
    } else {
      toast({ title: "No Booking Found", description: "No pending booking details found. Please start a new booking.", variant: "destructive" });
      router.push('/');
    }
    setIsLoading(false);

    // Optional: Clear localStorage if the user navigates away from this page without completing payment
    // This is a bit more complex and might involve listening to beforeunload or route changes.
    // For simplicity, we'll clear it on successful payment.
  }, [router, toast, paymentForm]);

  const handlePaymentSubmit: SubmitHandler<PaymentFormData> = (paymentData) => {
    if (!pendingBooking) return;

    console.log('Payment Data (Prototype):', paymentData);
    console.log('Booking Data (Prototype):', pendingBooking);

    // SIMULATE PAYMENT PROCESSING
    // In a real app, this would involve API calls to a payment gateway.
    
    localStorage.removeItem('pendingBooking'); // Clear booking details after successful "payment"

    toast({
      title: `Booking Confirmed for ${pendingBooking.propertyName}!`,
      description: (
        <div>
          <p>Thank you, {pendingBooking.fullName}. Your (mock) payment has been processed and your booking is confirmed.</p>
          {pendingBooking.totalPrice !== null && <p className="font-semibold mt-2">Total Paid: ₦{pendingBooking.totalPrice.toLocaleString()}</p>}
          <p className="text-xs mt-2">A (mock) email confirmation will be sent to {pendingBooking.email}.</p>
        </div>
      ),
      variant: 'default',
      duration: 10000,
    });
    router.push('/'); // Redirect to homepage or a dedicated success page
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-md p-8">
          <CardTitle className="text-center">Loading Payment Details...</CardTitle>
          <CardDescription className="text-center mt-2">Please wait a moment.</CardDescription>
        </Card>
      </div>
    );
  }

  if (!pendingBooking) {
    return (
       <div className="container mx-auto py-12 flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-md p-8">
          <CardTitle className="text-center text-destructive">Error</CardTitle>
          <CardDescription className="text-center mt-2">Booking details not found. Please <a href="/" className="underline text-primary">start over</a>.</CardDescription>
        </Card>
      </div>
    );
  }

  const { propertyName, checkInDate, checkOutDate, numGuests, numberOfNights, pricePerNight, totalPrice } = pendingBooking;

  return (
    <div className="container mx-auto py-8 md:py-12">
      <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-8 text-center">Complete Your Booking</h1>
      
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {/* Booking Summary Card */}
        <div className="md:col-span-1">
          <Card className="shadow-lg rounded-lg sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Booking Summary</CardTitle>
              <CardDescription>Review your booking details before payment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="font-semibold text-lg">{propertyName}</p>
              <div>
                <span className="font-medium">Check-in:</span> {checkInDate ? format(new Date(checkInDate), 'EEE, MMM d, yyyy') : 'N/A'}
              </div>
              <div>
                <span className="font-medium">Check-out:</span> {checkOutDate ? format(new Date(checkOutDate), 'EEE, MMM d, yyyy') : 'N/A'}
              </div>
              <div>
                <span className="font-medium">Guests:</span> {numGuests}
              </div>
              <Separator />
              {numberOfNights !== null && pricePerNight !== null && (
                <div className="flex justify-between">
                  <span>Price per night:</span>
                  <span>₦{pricePerNight.toLocaleString()}</span>
                </div>
              )}
              {numberOfNights !== null && (
                <div className="flex justify-between">
                  <span>Number of nights:</span>
                  <span>{numberOfNights}</span>
                </div>
              )}
              <Separator />
              {totalPrice !== null && (
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount:</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payment Form Card */}
        <div className="md:col-span-2">
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Payment Details</CardTitle>
              <CardDescription>Choose your preferred payment method.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...paymentForm}>
                <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-6">
                  <FormField
                    control={paymentForm.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Payment Method</FormLabel>
                        <FormControl>
                          <Tabs defaultValue="card" className="w-full" onValueChange={field.onChange} value={field.value}>
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="card"><CreditCard className="mr-2 h-4 w-4 inline-block"/>Credit/Debit Card</TabsTrigger>
                              <TabsTrigger value="transfer"><Landmark className="mr-2 h-4 w-4 inline-block"/>Bank Transfer</TabsTrigger>
                            </TabsList>
                            <TabsContent value="card" className="mt-6 space-y-4">
                              <FormField
                                control={paymentForm.control}
                                name="cardHolderName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Cardholder Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Full name on card" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={paymentForm.control}
                                name="cardNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl>
                                      <Input type="text" placeholder="0000 0000 0000 0000" {...field} maxLength={19} onChange={e => {
                                        const value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                                        field.onChange(value.slice(0,19));
                                      }}/>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={paymentForm.control}
                                  name="expiryDate"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Expiry Date</FormLabel>
                                      <FormControl>
                                        <Input placeholder="MM/YY" {...field} maxLength={5} onChange={e => {
                                          let value = e.target.value.replace(/\D/g, '');
                                          if (value.length > 2) value = value.slice(0,2) + '/' + value.slice(2);
                                          field.onChange(value.slice(0,5));
                                        }}/>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={paymentForm.control}
                                  name="cvv"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>CVV</FormLabel>
                                      <FormControl>
                                        <Input type="text" placeholder="123" {...field} maxLength={4} onChange={e => {
                                          field.onChange(e.target.value.replace(/\D/g, '').slice(0,4));
                                        }} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </TabsContent>
                            <TabsContent value="transfer" className="mt-6">
                              <Card className="bg-muted/30 border-dashed">
                                <CardHeader>
                                  <CardTitle className="text-lg">Bank Transfer Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                  <p><strong>Bank Name:</strong> Luna Bank Plc</p>
                                  <p><strong>Account Name:</strong> Luna Shortlets Nigeria</p>
                                  <p><strong>Account Number:</strong> 0123456789</p>
                                  <p className="mt-2 text-xs text-muted-foreground">
                                    Please use your booking name or email as the payment reference.
                                    Your booking will be confirmed once payment is verified (this is a mock process).
                                  </p>
                                </CardContent>
                              </Card>
                            </TabsContent>
                          </Tabs>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {Object.keys(paymentErrors).length > 0 && (
                     <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm flex items-center gap-2">
                        <AlertCircle size={18} />
                        Please correct the payment errors above.
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-3" disabled={isPaymentSubmitting}>
                    {isPaymentSubmitting ? 'Processing Payment...' : 
                     (selectedPaymentMethod === 'card' ? 'Pay with Card & Confirm' : 'Confirm Booking (Paid via Transfer)')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
