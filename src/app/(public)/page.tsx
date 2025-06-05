
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { placeholderProperties } from '@/lib/placeholder-data';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, CalendarDays, Users, Search, Star } from 'lucide-react';
import { FeaturedPropertiesCarousel } from '@/components/properties/FeaturedPropertiesCarousel';

export default function HomePage() {
  const featuredProperties = placeholderProperties.slice(0, 6); // Get more properties for carousel

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-4rem)] min-h-[650px] flex items-center justify-center text-center bg-gradient-to-br from-black via-gray-900 to-yellow-700 overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1091000309?autoplay=1&loop=1&muted=1&background=1&autopause=0&controls=0"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40 z-0"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Floating gold particles background video"
        ></iframe>
        <div className="relative z-10 p-6 bg-black/50 rounded-lg shadow-2xl max-w-3xl mx-auto">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary mb-4">
            Luna Shortlets
          </h1>
          <p className="text-xl md:text-2xl text-background mb-8">
            Your Key to Luxury Stays and Unforgettable Experiences in Nigeria.
          </p>
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-background/10 p-6 rounded-md backdrop-blur-sm">
            <div className="flex flex-col items-start">
              <label htmlFor="location" className="text-sm font-medium text-primary mb-1">Location</label>
              <div className="relative w-full">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                <Input id="location" type="text" placeholder="e.g., Abuja, Lagos" className="pl-10 text-foreground" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="checkin" className="text-sm font-medium text-primary mb-1">Check-in</label>
              <div className="relative w-full">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                <Input id="checkin" type="date" className="pl-10 text-foreground" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="guests" className="text-sm font-medium text-primary mb-1">Guests</label>
              <div className="relative w-full">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                <Input id="guests" type="number" placeholder="2" min="1" className="pl-10 text-foreground" />
              </div>
            </div>
            <Button type="submit" className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 md:mt-[29px]">
              <Search className="mr-2 h-5 w-5" /> Search
            </Button>
          </form>
        </div>
      </section>

      {/* Featured Properties Section - Carousel */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="font-headline text-4xl font-bold text-center mb-2 text-primary">Featured Properties</h2>
          <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
            Swipe through our handpicked selection of exquisite shortlet apartments in Abuja, showcasing unique designs and prime locations.
          </p>
        </div>
        {/* Container removed from here to allow carousel to be full-width for edge-to-edge feel if desired, while inner content uses pl-4 */}
        <FeaturedPropertiesCarousel properties={featuredProperties} />
        <div className="container text-center mt-12">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </section>

      {/* About Us Snippet */}
      <section className="py-16 bg-card">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-4xl font-bold mb-4 text-primary">Why Luna Shortlets?</h2>
            <p className="text-foreground/80 mb-4 text-lg">
              At Luna Shortlets, we believe travel should be an experience, not just a destination. We offer a curated collection of premium short-term rentals in Nigeria's most desirable locations. 
            </p>
            <ul className="space-y-3 text-foreground/70 mb-6">
              <li className="flex items-center"><Star className="text-primary mr-2" size={20}/>Exceptional Quality & Comfort</li>
              <li className="flex items-center"><Star className="text-primary mr-2" size={20}/>Prime Nigerian Locations</li>
              <li className="flex items-center"><Star className="text-primary mr-2" size={20}/>Personalized Service</li>
            </ul>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl h-auto md:h-[450px]">
            <Image
              src="https://i.ibb.co/nqNDMvNm/image.png"
              alt="Modern luxury apartment interior"
              width={600}
              height={450}
              className="w-full h-full object-cover"
              data-ai-hint="modern interior"
            />
          </div>
        </div>
      </section>
    </>
  );
}
