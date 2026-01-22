"use client"
import { Carousel } from '@sitecore-search/ui';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

type CarouselItem = {
  id: string;
  content: React.ReactNode;
};

type CarouselProps = {
  items: CarouselItem[];
  title?: string;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onNavigationNext?: () => void;
  onNavigationPrev?: () => void;
};

const CarouselComponent = ({
  items,
  title,
  className = '',
  onNavigationNext,
  onNavigationPrev,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(newIndex);
    if (onNavigationNext) onNavigationNext();
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(newIndex);
    if (onNavigationPrev) onNavigationPrev();
  };

  return (
    <div className={`relative ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      )}
      <Carousel.Root
        onNavigationNext={onNavigationNext}
        onNavigationPrev={onNavigationPrev}
        className="relative overflow-hidden rounded-lg"
      >
        <Carousel.Slides className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {items.map((item) => (
            <Carousel.Slide
              key={item.id}
              className="min-w-full flex-shrink-0"
            >
              {item.content}
            </Carousel.Slide>
          ))}
        </Carousel.Slides>

        {items.length > 1 && (
          <>
            <Carousel.Previous
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-[#005EB8] hover:text-white dark:hover:bg-[#005EB8] transition-colors focus:outline-[#005EB8] focus:outline-2 focus:outline-offset-2 z-10"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </Carousel.Previous>
            <Carousel.Next
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-[#005EB8] hover:text-white dark:hover:bg-[#005EB8] transition-colors focus:outline-[#005EB8] focus:outline-2 focus:outline-offset-2 z-10"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </Carousel.Next>
          </>
        )}

        {items.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-[#005EB8] dark:bg-blue-400'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel.Root>
    </div>
  );
};

export default CarouselComponent;

