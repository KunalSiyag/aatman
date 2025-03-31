"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slidesRef = useRef([]);
  const totalSlides = 3;

  const slides = [
    {
      title: "Compassion in Action: Caring for Our Voiceless Friends",
      description:
        "Join our heartfelt mission to provide care and support to animals in need, from street dogs to cows. Together, let's create a world where every creature is treated with kindness and dignity.",
      image: "/cow2.jpeg", 
      bgColor: "from-yellow-50 to-amber-100",
      textColor: "text-amber-900", // Define text color here
    },
    {
      title: "Green Futures: A Tree Plantation Drive",
      description:
        "Step into a greener tomorrow! Be a part of our tree plantation drive and contribute to creating a sustainable and thriving planet for generations to come.",
      image: "/nature.jpeg",
      bgColor: "from-green-50 to-lime-100",
      textColor: "text-green-900", // Define text color here
    },
    {
      title: "Harmony for Humanity: Promoting Yoga & Wellness",
      description:
        "Discover the power of yoga and wellness in transforming lives. Embrace peace, harmony, and vitality through programs designed to nurture both body and soul.",
      image: "/yoga.jpeg", 
      bgColor: "from-blue-50 to-teal-100",
      textColor: "text-teal-800", // Define text color here
    },
  ];
  

  useEffect(() => {
    slidesRef.current.forEach((slide, index) => {
      gsap.set(slide, {
        opacity: index === activeSlide ? 1 : 0,
        x: index === activeSlide ? 0 : 100,
      });
    });
  }, []);

  useEffect(() => {
    slidesRef.current.forEach((slide, index) => {
      gsap.to(slide, {
        opacity: index === activeSlide ? 1 : 0,
        x: index === activeSlide ? 0 : index < activeSlide ? -100 : 100,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }, [activeSlide]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => (slidesRef.current[index] = el)}
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
            "bg-gradient-to-r",
            slide.bgColor
          )}
          style={{
            opacity: index === activeSlide ? 1 : 0,
            backgroundImage: `url(${slide.image})`, // Set the background image
            backgroundSize: "cover", // Ensure the image covers the whole section
            backgroundPosition: "center", // Center the image
            backgroundRepeat: "no-repeat", // Prevent the image from repeating
          }}
        >
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/about">Learn More</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/donate">Support Us</Link>
                </Button>
              </div>
              <h1
                className={cn(
                  "text-2xl md:text-3xl lg:text-5xl tracking-normal leading-9 sm:leading-10 mt-10 font-bold mb-6 p-4",
                  slide.textColor // Dynamically apply the text color
                )}
              >
              </h1>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === activeSlide ? "bg-primary w-6" : "bg-muted-foreground/30"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 backdrop-blur-sm z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 backdrop-blur-sm z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
}
