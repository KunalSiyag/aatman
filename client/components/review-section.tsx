"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Sample reviews data - in a real app, this would come from a CMS or API
const reviews = [
  {
    id: 1,
    name: "Rahul Mehta",
    location: "Delhi",
    rating: 5,
    text: "The yoga sessions organized by Aatman Foundation have transformed my life. The instructors are knowledgeable and compassionate, creating a welcoming environment for practitioners of all levels.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Meera Patel",
    location: "Mumbai",
    rating: 5,
    text: "I've been volunteering with Aatman Foundation's environmental initiatives for the past year, and I'm impressed by their commitment to sustainable practices and community involvement.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Arjun Singh",
    location: "Jaipur",
    rating: 4,
    text: "The community service programs run by Aatman Foundation address real needs in our neighborhood. Their approach is respectful and empowering, focusing on long-term solutions rather than quick fixes.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Lakshmi Krishnan",
    location: "Bangalore",
    rating: 5,
    text: "As a donor to Aatman Foundation, I appreciate their transparency and the regular updates about how my contributions are making a difference. It's wonderful to see the impact firsthand.",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function ReviewSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reviewsRef = useRef(null)
  const reviewCardsRef = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const reviewsSection = reviewsRef.current

    gsap.fromTo(
      reviewsSection,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: reviewsSection,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [])

  useEffect(() => {
    // Animate review cards when active index changes
    reviewCardsRef.current.forEach((card, index) => {
      gsap.to(card, {
        opacity: index === activeIndex ? 1 : 0.3,
        scale: index === activeIndex ? 1 : 0.9,
        duration: 0.5,
      })
    })
  }, [activeIndex])

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section ref={reviewsRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
          <p className="text-lg text-muted-foreground">
            Hear from those who have experienced the impact of our work firsthand.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="flex overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  ref={(el) => (reviewCardsRef.current[index] = el)}
                  className={cn("w-full flex-shrink-0 px-4", "transition-all duration-300")}
                >
                  <div className="bg-muted/30 p-6 md:p-8 rounded-xl border border-border">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={review.image || "/placeholder.svg"}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{review.name}</h3>
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                        <div className="flex mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="italic">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full"
            onClick={prevReview}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous review</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full"
            onClick={nextReview}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next review</span>
          </Button>

          <div className="flex justify-center mt-6 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === activeIndex ? "bg-primary w-4" : "bg-muted-foreground/30",
                )}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

