
import type { Property } from '@/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, BedDouble, Bath, Star } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0 relative">
        <Link href={`/properties/${property.id}`} passHref>
          <Image
            src={property.images[0]}
            alt={property.name}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            data-ai-hint="apartment exterior interior"
          />
        </Link>
        {property.rating && (
          <div className="absolute top-2 right-2 bg-black/70 text-primary px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
            <Star size={14} className="fill-primary text-primary" />
            <span>{property.rating.toFixed(1)}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-1 text-primary truncate">
          <Link href={`/properties/${property.id}`} className="hover:underline">
            {property.name}
          </Link>
        </CardTitle>
        <div className="flex items-center text-sm text-foreground/70 mb-2">
          <MapPin size={14} className="mr-1 text-primary" />
          <span>{property.location}</span>
        </div>
        <p className="text-sm text-foreground/80 line-clamp-2 mb-3">
          {property.tagline || property.description}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/70">
          <div className="flex items-center">
            <Users size={14} className="mr-1 text-primary" /> {property.maxGuests} Guests
          </div>
          <div className="flex items-center">
            <BedDouble size={14} className="mr-1 text-primary" /> {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
          </div>
          <div className="flex items-center">
            <Bath size={14} className="mr-1 text-primary" /> {property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <p className="text-lg font-bold text-primary">
          ₦{property.pricePerNight.toLocaleString()}<span className="text-sm font-normal text-foreground/70">/night</span>
        </p>
        <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href={`/properties/${property.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
