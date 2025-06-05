
import { placeholderProperties } from '@/lib/placeholder-data';
import type { Property } from '@/lib/definitions';
import { notFound } from 'next/navigation';
import Image from 'next/image'; // Keep for potential host avatar
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { PropertyImageGallery } from '@/components/properties/PropertyImageGallery';
import { BookingForm } from '@/components/properties/BookingForm';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, BedDouble, Bath, Star, CheckCircle, Building, Home, Sun } from 'lucide-react';

interface PropertyDetailsPageProps {
  params: {
    id: string;
  };
}

// Helper function to get property by ID
async function getProperty(id: string): Promise<Property | undefined> {
  // In a real app, this would fetch from a database or API
  return placeholderProperties.find((p) => p.id === id);
}

export async function generateMetadata({ params }: PropertyDetailsPageProps) {
  const property = await getProperty(params.id);
  if (!property) {
    return { title: 'Property Not Found' };
  }
  return {
    title: `${property.name} | Luna Shortlets`,
    description: property.tagline || property.description.substring(0, 150),
  };
}

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const property = await getProperty(params.id);

  if (!property) {
    notFound();
  }

  const propertyTypeIcons = {
    Apartment: <Building className="mr-2 h-5 w-5 text-primary" />,
    Villa: <Home className="mr-2 h-5 w-5 text-primary" />,
    Studio: <Sun className="mr-2 h-5 w-5 text-primary" />, // Example, choose appropriate icon
    House: <Home className="mr-2 h-5 w-5 text-primary" />,
  };

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/properties">Properties</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{property.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column / Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <PropertyImageGallery images={property.images} altText={property.name} />

          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl md:text-4xl text-primary mb-2">{property.name}</CardTitle>
              {property.tagline && <p className="text-lg text-muted-foreground mb-3">{property.tagline}</p>}
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/80">
                <div className="flex items-center">
                  {propertyTypeIcons[property.type] || <Building className="mr-2 h-5 w-5 text-primary" />}
                  {property.type}
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1.5 text-primary" />
                  {property.location}
                </div>
                {property.rating && (
                  <div className="flex items-center">
                    <Star size={16} className="mr-1.5 text-yellow-500 fill-yellow-500" />
                    {property.rating.toFixed(1)} ({property.reviewsCount || 0} reviews)
                  </div>
                )}
              </div>
            </CardHeader>
            <Separator className="my-0"/>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold font-headline text-primary mb-3">About this property</h2>
              <p className="text-foreground/80 whitespace-pre-line leading-relaxed">
                {property.description}
              </p>

              <Separator className="my-6" />

              <h2 className="text-2xl font-semibold font-headline text-primary mb-4">Key Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-foreground/90 mb-6">
                <div className="flex items-center p-3 bg-muted/30 rounded-md">
                  <Users size={20} className="mr-2 text-primary" />
                  <div>
                    <span className="font-medium">{property.maxGuests} Guests</span>
                    <p className="text-xs text-muted-foreground">Maximum capacity</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-muted/30 rounded-md">
                  <BedDouble size={20} className="mr-2 text-primary" />
                   <div>
                    <span className="font-medium">{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                    <p className="text-xs text-muted-foreground">Comfortable sleeping</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-muted/30 rounded-md">
                  <Bath size={20} className="mr-2 text-primary" />
                   <div>
                    <span className="font-medium">{property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                    <p className="text-xs text-muted-foreground">Modern facilities</p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />

              <h2 className="text-2xl font-semibold font-headline text-primary mb-4">Amenities</h2>
              {property.amenities.length > 0 ? (
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                  {property.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center text-foreground/80">
                      <CheckCircle size={18} className="mr-2 text-green-600" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No specific amenities listed.</p>
              )}

              {property.host && (
                <>
                  <Separator className="my-6" />
                  <h2 className="text-2xl font-semibold font-headline text-primary mb-4">Hosted by {property.host.name}</h2>
                   {/* Basic host info display */}
                  <div className="flex items-center gap-3">
                    {property.host.avatarUrl && (
                       <Image 
                         src={property.host.avatarUrl} 
                         alt={property.host.name} 
                         width={50} 
                         height={50} 
                         className="rounded-full"
                         data-ai-hint="person avatar"
                       />
                    )}
                    <p className="text-foreground/80">Your comfort is our priority. Contact us for any needs during your stay.</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column / Booking Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6"> {/* top-24 to account for navbar height + some padding */}
            <BookingForm property={property} />
             <Card className="shadow-md rounded-lg text-sm">
              <CardHeader>
                <CardTitle className="text-xl font-headline text-primary">Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Flexible cancellation options available. Refer to the booking confirmation for specific terms. Generally, free cancellation up to 5 days before check-in.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
