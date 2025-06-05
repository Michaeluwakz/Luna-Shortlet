
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyImageGalleryProps {
  images: string[];
  altText: string;
}

export function PropertyImageGallery({ images, altText }: PropertyImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-muted flex items-center justify-center rounded-lg">
        <p className="text-muted-foreground">No images available.</p>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-lg shadow-lg mb-4">
        <Image
          src={images[currentIndex]}
          alt={`${altText} - Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-300 ease-in-out"
          priority={currentIndex === 0}
          data-ai-hint="apartment interior view"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 text-foreground rounded-full"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 text-foreground rounded-full"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                'relative w-20 h-16 md:w-24 md:h-20 rounded-md overflow-hidden cursor-pointer border-2 transition-all',
                currentIndex === index ? 'border-primary' : 'border-transparent hover:border-primary/50'
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <Image
                src={image}
                alt={`${altText} - Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
                data-ai-hint="room detail"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
