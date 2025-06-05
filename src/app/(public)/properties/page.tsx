
import { PropertyCard } from '@/components/properties/PropertyCard';
import { placeholderProperties } from '@/lib/placeholder-data';
import type { Property } from '@/lib/definitions';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default function PropertiesPage() {
  const properties: Property[] = placeholderProperties;

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
            <BreadcrumbPage>Properties</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="font-headline text-4xl font-bold text-primary mb-4">
        Explore Our Properties
      </h1>
      <p className="text-foreground/70 mb-12 text-lg">
        Find the perfect shortlet apartment for your next stay. Browse through our curated collection of luxury accommodations.
      </p>

      {properties.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-foreground/70">
            No properties available at the moment. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
}
