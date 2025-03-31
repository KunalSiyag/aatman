"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users } from "lucide-react"

// Sample activities data - in a real app, this would come from a CMS or API
const activities = [
  {
    id: 1,
    title: "Community Yoga Workshop",
    description:
      "A free yoga workshop for community members of all ages and abilities, focusing on stress reduction and mindfulness.",
    date: "March 15, 2023",
    location: "  focusing on stress reduction and mindfulness.",
    date: "March 15, 2023",
    location: "Community Park, Delhi",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 45,
  },
  {
    id: 2,
    title: "Tree Plantation Drive",
    description:
      "Join us in our effort to increase green cover in urban areas. We'll be planting native tree species that support local biodiversity.",
    date: "February 20, 2023",
    location: "Riverside Area, Mumbai",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 60,
  },
  {
    id: 3,
    title: "Rural Education Initiative",
    description:
      "A program to provide educational resources and mentorship to children in underserved rural communities.",
    date: "January 10, 2023",
    location: "Village School, Rajasthan",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 30,
  },
]

export default function RecentActivities() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const cards = cardsRef.current

    gsap.fromTo(
      section.querySelector("h2"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Activities</h2>
          <p className="text-lg text-muted-foreground">
            Explore our recent initiatives and the impact we're making in communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <Card
              key={activity.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-48 w-full">
                <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{activity.title}</CardTitle>
                <CardDescription>{activity.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{activity.attendees} Participants</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/activities/${activity.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/activities">View All Activities</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

