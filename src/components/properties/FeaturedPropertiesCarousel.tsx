
'use client';

import type { Property } from '@/lib/definitions';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

interface FeaturedPropertiesCarouselProps {
  properties: Pick<Property, 'id' | 'images' | 'name' | 'tagline'>[];
  className?: string;
}

export function FeaturedPropertiesCarousel({ properties, className }: FeaturedPropertiesCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', duration: 25 }, [
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: false }),
  ]);

  const allImages = properties.flatMap(p => 
    p.images.map((img, idx) => ({ 
      id: `${p.id}-img-${idx}`, 
      src: img, 
      name: p.name,
      tagline: p.tagline 
    }))
  );

  if (!allImages.length) {
    return (
      <div className="text-center py-10 text-foreground/70">
        No featured properties to display in carousel.
      </div>
    );
  }

  return (
    <div className={cn("embla_featured_carousel", className)} ref={emblaRef}>
      <div className="embla__container_featured_carousel flex">
        {allImages.map((image, index) => (
          <div 
            key={image.id} 
            className="embla__slide_featured_carousel flex-[0_0_90%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0 pl-4 pr-2 py-4"
          >
            <div className="relative w-full h-64 overflow-hidden rounded-xl shadow-xl group transition-all duration-300 ease-in-out hover:shadow-2xl">
              <Image
                src={image.src}
                alt={image.tagline || `Featured property: ${image.name} - Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                data-ai-hint="property house apartment"
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-white text-lg font-semibold truncate">{image.name}</h3>
                  {image.tagline && <p className="text-primary-foreground/80 text-xs truncate">{image.tagline}</p>}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
