"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    headline: "Outstanding results every time!",
    content:
      "I've been using HomeMaster for my home cleaning needs for over a year now, and they consistently deliver outstanding results.",
    author: "Sarah Davis",
    position: "Co-founder, MasterPlate",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    headline: "Effortless booking process!",
    content:
      "I've been using HomeMaster for my home cleaning needs for over a year now, and they consistently deliver outstanding results.",
    author: "Emily Johnson",
    position: "Founder",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    headline: "Exceptional customer service!",
    content:
      "I've been using HomeMaster for my home cleaning needs for over a year now, and they consistently deliver outstanding results.",
    author: "David Williams",
    position: "Marketing managers",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    headline: "Professional and thorough!",
    content:
      "The cleaning team is always punctual, professional, and pays great attention to detail. My home has never looked better!",
    author: "Michael Brown",
    position: "Business Owner",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    headline: "Reliable and trustworthy!",
    content:
      "I can always count on HomeMaster to provide consistent quality. Their staff is trustworthy and I feel comfortable having them in my home.",
    author: "Jennifer Lee",
    position: "Interior Designer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function TestimonialsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const pauseRef = useRef(false);

  // Set up auto-play
  useEffect(() => {
    if (!api) return;

    const startAutoPlay = () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);

      autoPlayRef.current = setInterval(() => {
        if (!pauseRef.current) {
          api.scrollNext();
        }
      }, 5000); // Change slide every 5 seconds
    };

    startAutoPlay();

    // Cleanup interval on component unmount
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [api]);

  // Update current slide index when API changes
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Pause auto-play on hover or touch
  const pauseAutoPlay = () => {
    pauseRef.current = true;
  };

  const resumeAutoPlay = () => {
    pauseRef.current = false;
  };

  return (
    <section className="py-16 md:py-24 bg-[#61B35C]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-10 md:mb-16"
        >
          Hear What Our Customers Have to Say
        </motion.h2>

        <div
          className="relative px-4 md:px-10"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          onTouchStart={pauseAutoPlay}
          onTouchEnd={resumeAutoPlay}
        >
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:pl-6 sm:basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <div className="bg-white p-6 md:p-8 rounded-xl h-full flex flex-col">
                      <Quote className="text-[#27AE60] w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4" />
                      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
                        {testimonial.headline}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 flex-grow">
                        {testimonial.content}
                      </p>

                      <div className="flex items-center mt-auto">
                        <Avatar className="h-10 w-10 md:h-12 md:w-12 mr-3 md:mr-4 border-2 border-[#27AE60]/20">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.author}
                          />
                          <AvatarFallback className="bg-[#27AE60]/10 text-[#27AE60] text-xs md:text-sm">
                            {testimonial.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-sm md:text-base">
                            {testimonial.author}
                          </h4>
                          <p className="text-gray-500 text-xs md:text-sm">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-2 md:-left-4 bg-white text-[#27AE60] hover:bg-[#27AE60] hover:text-white hidden md:flex" />
            <CarouselNext className="absolute -right-2 md:-right-4 bg-white text-[#27AE60] hover:bg-[#27AE60] hover:text-white hidden md:flex" />
          </Carousel>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 md:mt-8 gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
