import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2 } from "lucide-react"

// Sample activities data - in a real app, this would come from a CMS or API
const activities = [
  {
    id: 1,
    title: "Community Yoga Workshop",
    description:
      "A free yoga workshop for community members of all ages and abilities, focusing on stress reduction and mindfulness.",
    longDescription:
      "Join us for a transformative yoga experience designed for practitioners of all levels. This workshop will focus on stress reduction techniques, mindfulness practices, and gentle yoga postures that promote physical and mental wellbeing. Our experienced instructors will guide participants through a series of practices that can be easily incorporated into daily life for continued benefits. The workshop will conclude with a group meditation and refreshments, providing an opportunity for community connection and sharing.",
    date: "March 15, 2023",
    time: "9:00 AM - 11:00 AM",
    location: "Community Park, Delhi",
    address: "123 Park Avenue, Central Delhi, 110001",
    image: "/placeholder.svg?height=400&width=800",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    attendees: 45,
    category: "yoga",
    organizer: "Priya Sharma",
    organizerRole: "Yoga Program Lead",
    contact: "priya@aatmanfoundation.org",
    highlights: [
      "Guided yoga sessions for all experience levels",
      "Stress reduction and mindfulness techniques",
      "Community connection and sharing",
      "Refreshments provided",
    ],
    upcoming: true,
  },
  {
    id: 2,
    title: "Tree Plantation Drive",
    description:
      "Join us in our effort to increase green cover in urban areas. We'll be planting native tree species that support local biodiversity.",
    longDescription:
      "This tree plantation drive is part of our ongoing commitment to environmental conservation and sustainability. Participants will help plant native tree species that are well-adapted to the local climate and support indigenous biodiversity. Our environmental experts will provide guidance on proper planting techniques and share information about the ecological importance of each species. This is a family-friendly event, and we encourage participants of all ages to join us in this meaningful effort to enhance our urban green spaces and combat climate change.",
    date: "February 20, 2023",
    time: "7:00 AM - 11:00 AM",
    location: "Riverside Area, Mumbai",
    address: "Riverside Park, Eastern Mumbai, 400001",
    image: "/placeholder.svg?height=400&width=800",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    attendees: 60,
    category: "environment",
    organizer: "Amit Patel",
    organizerRole: "Environmental Initiatives Lead",
    contact: "amit@aatmanfoundation.org",
    highlights: [
      "Planting of 200+ native tree species",
      "Educational talks on local ecology",
      "Family-friendly activities",
      "Refreshments and t-shirts for volunteers",
    ],
    upcoming: false,
  },
  {
    id: 3,
    title: "Rural Education Initiative",
    description:
      "A program to provide educational resources and mentorship to children in underserved rural communities.",
    longDescription:
      "Our Rural Education Initiative aims to bridge the educational gap between urban and rural areas by providing quality learning resources and mentorship to children in underserved communities. This program includes regular tutoring sessions, distribution of educational materials, and workshops that make learning engaging and relevant to rural contexts. Our team of educators and volunteers work closely with local schools and community leaders to ensure that the program addresses specific needs and builds on existing strengths. Through this initiative, we hope to empower rural children with the knowledge, skills, and confidence they need to pursue their dreams and contribute to their communities.",
    date: "January 10, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Village School, Rajasthan",
    address: "Government Primary School, Jaipur District, Rajasthan, 302001",
    image: "/placeholder.svg?height=400&width=800",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    attendees: 30,
    category: "community",
    organizer: "Vikram Singh",
    organizerRole: "Education Programs Lead",
    contact: "vikram@aatmanfoundation.org",
    highlights: [
      "Distribution of educational materials",
      "Interactive learning workshops",
      "Mentorship program launch",
      "Community engagement activities",
    ],
    upcoming: false,
  },
]

export default function ActivityDetailPage({ params }) {
  const activityId = Number.parseInt(params.id)
  const activity = activities.find((a) => a.id === activityId) || activities[0]

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
          <Image
            src={activity.image || "/placeholder.svg"}
            alt={activity.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative -mt-20 md:-mt-32">
          <div className="bg-background rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <Button variant="outline" size="sm" asChild className="w-fit">
                <Link href="/activities">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Activities
                </Link>
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                {activity.upcoming && <Button size="sm">Register Now</Button>}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{activity.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-muted-foreground">{activity.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-muted-foreground">{activity.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-muted-foreground">{activity.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Participants</p>
                  <p className="text-muted-foreground">{activity.attendees} People</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Details */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">About This Activity</h2>
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-6">{activity.longDescription}</p>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">Highlights</h3>
              <ul className="space-y-2">
                {activity.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2"></span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold mt-8 mb-4">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activity.gallery.map((image, index) => (
                  <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${activity.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-muted/30 rounded-xl p-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">Activity Details</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-muted-foreground">{activity.address}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Organizer</p>
                    <p>{activity.organizer}</p>
                    <p className="text-muted-foreground text-sm">{activity.organizerRole}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Contact</p>
                    <p className="text-muted-foreground">{activity.contact}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <div className="mt-1">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {activity.upcoming ? (
                  <Button className="w-full">Register Now</Button>
                ) : (
                  <div className="text-center p-3 border border-muted rounded-lg">
                    <p className="text-muted-foreground">This activity has already taken place</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Activities */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Related Activities</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activities
                .filter((a) => a.id !== activity.id && a.category === activity.category)
                .slice(0, 2)
                .map((relatedActivity) => (
                  <div key={relatedActivity.id} className="bg-background rounded-xl overflow-hidden shadow-sm">
                    <div className="relative h-48">
                      <Image
                        src={relatedActivity.image || "/placeholder.svg"}
                        alt={relatedActivity.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{relatedActivity.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{relatedActivity.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {relatedActivity.date}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {relatedActivity.location}
                        </div>
                      </div>
                      <Button variant="outline" asChild className="w-full">
                        <Link href={`/activities/${relatedActivity.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

