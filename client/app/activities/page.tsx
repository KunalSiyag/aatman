import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Filter } from "lucide-react"

// Sample activities data - in a real app, this would come from a CMS or API
const activities = [
  {
    id: 1,
    title: "Community Yoga Workshop",
    description:
      "A free yoga workshop for community members of all ages and abilities, focusing on stress reduction and mindfulness.",
    date: "March 15, 2023",
    location: "Community Park, Delhi",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 45,
    category: "yoga",
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
    category: "environment",
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
    category: "community",
  },
  {
    id: 4,
    title: "Meditation Retreat",
    description: "A weekend retreat focused on meditation practices for inner peace and mental wellbeing.",
    date: "December 5, 2022",
    location: "Himalayan Retreat Center, Rishikesh",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 25,
    category: "yoga",
  },
  {
    id: 5,
    title: "Community Health Camp",
    description:
      "Free health check-ups and consultations for community members, with a focus on preventive healthcare.",
    date: "November 12, 2022",
    location: "Community Center, Jaipur",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 120,
    category: "community",
  },
  {
    id: 6,
    title: "River Cleanup Drive",
    description: "A community initiative to clean up local waterways and raise awareness about water pollution.",
    date: "October 8, 2022",
    location: "Yamuna River Bank, Delhi",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 75,
    category: "environment",
  },
  {
    id: 7,
    title: "Yoga for Children",
    description:
      "A specialized yoga program designed for children, promoting physical activity, focus, and emotional regulation.",
    date: "September 20, 2022",
    location: "Public School, Bangalore",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 40,
    category: "yoga",
  },
  {
    id: 8,
    title: "Sustainable Living Workshop",
    description:
      "Learn practical ways to reduce your environmental footprint and adopt more sustainable lifestyle practices.",
    date: "August 15, 2022",
    location: "Community Hall, Mumbai",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 50,
    category: "environment",
  },
  {
    id: 9,
    title: "Women's Empowerment Program",
    description: "A skill development initiative focused on empowering women through education and entrepreneurship.",
    date: "July 10, 2022",
    location: "Women's Center, Chennai",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 35,
    category: "community",
  },
]

export default function ActivitiesPage() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Activities</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our recent initiatives and the impact we're making in communities through yoga, environmental
              conservation, and community service.
            </p>
          </div>
        </div>
      </section>

      {/* Activities Listing */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <TabsList>
                <TabsTrigger value="all">All Activities</TabsTrigger>
                <TabsTrigger value="yoga">Yoga & Wellness</TabsTrigger>
                <TabsTrigger value="environment">Environment</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="text-sm border-none bg-transparent focus:outline-none">
                  <option>Most Recent</option>
                  <option>Oldest First</option>
                  <option>Most Participants</option>
                </select>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="yoga" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities
                  .filter((activity) => activity.category === "yoga")
                  .map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="environment" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities
                  .filter((activity) => activity.category === "environment")
                  .map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities
                  .filter((activity) => activity.category === "community")
                  .map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground">
              Join us for these upcoming activities and be part of creating positive change.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>World Yoga Day Celebration</CardTitle>
                <CardDescription>A day of yoga, meditation, and community connection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>June 21, 2023 | 6:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Central Park, Delhi</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Register Now</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monsoon Tree Plantation Drive</CardTitle>
                <CardDescription>Help us plant 1000 trees this monsoon season</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>July 15, 2023 | 8:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Forest Reserve, Mumbai Outskirts</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Register Now</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Involved</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              There are many ways to participate in our activities and support our mission. Whether you want to
              volunteer, donate, or collaborate, we welcome your involvement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/donate">Support Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ActivityCard({ activity }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
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
  )
}

