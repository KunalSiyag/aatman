import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Users, Leaf, BookOpen, Award, Target, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Aatman Foundation</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Founded by Divyansh Gaur, Aatman Foundation is dedicated to community service, promoting yoga, and
                nature conservation. We believe in the power of collective action to create positive change in our
                communities and the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Get Involved</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/donate">Support Our Work</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Aatman Foundation Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-muted-foreground">
              Guided by our core values, we work towards creating a more harmonious and sustainable world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground">
                    To empower communities through sustainable initiatives, promote holistic wellbeing through yoga, and
                    foster a deeper connection with nature through conservation efforts.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground">
                    A world where communities thrive in harmony with nature, where ancient wisdom guides modern living,
                    and where every individual has the opportunity to reach their full potential.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">Our Values</h3>
                  </div>
                  <ul className="grid grid-cols-2 gap-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Compassion
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Sustainability
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Integrity
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Community
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Mindfulness
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Inclusivity
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Our Mission and Vision"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Focus Areas */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Focus Areas</h2>
            <p className="text-lg text-muted-foreground">
              We concentrate our efforts in three key areas to create meaningful and lasting impact.
            </p>
          </div>

          <Tabs defaultValue="community" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="community">Community Service</TabsTrigger>
              <TabsTrigger value="yoga">Yoga & Wellness</TabsTrigger>
              <TabsTrigger value="nature">Nature Conservation</TabsTrigger>
            </TabsList>

            <TabsContent value="community" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Community Service"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Community Service</h3>
                  <p className="text-muted-foreground">
                    Our community initiatives focus on addressing real needs through sustainable solutions. We work
                    closely with local communities to identify challenges and develop programs that empower individuals
                    and create lasting positive change.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Educational support for underserved communities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Skill development programs for sustainable livelihoods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Healthcare initiatives focusing on preventive care</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="yoga" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Yoga & Wellness"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Yoga & Wellness</h3>
                  <p className="text-muted-foreground">
                    We believe in the transformative power of yoga and holistic wellness practices. Our programs make
                    these ancient practices accessible to all, promoting physical, mental, and spiritual wellbeing in
                    modern contexts.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Heart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Free community yoga classes for all ages and abilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Meditation and mindfulness workshops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Holistic health education and stress management programs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="nature" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Nature Conservation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Nature Conservation</h3>
                  <p className="text-muted-foreground">
                    Our environmental initiatives aim to foster a deeper connection with nature and promote sustainable
                    living practices. We work to protect and restore natural ecosystems while raising awareness about
                    environmental issues.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Leaf className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Tree plantation drives in urban and rural areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Environmental education programs for schools and communities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Sustainable living workshops and waste management initiatives</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              From humble beginnings to impactful initiatives, our journey has been one of growth and learning.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="relative pl-10 md:pl-0">
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start">
                  <div className="md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-bold">Foundation Established</h3>
                    <p className="text-muted-foreground">
                      Divyansh Gaur established Aatman Foundation with a vision to bridge traditional wisdom with modern
                      challenges.
                    </p>
                  </div>

                  <div className="flex items-center justify-center order-1 md:order-2">
                    <div className="absolute md:static left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="hidden md:block text-muted-foreground font-medium">2018</div>
                  </div>

                  <div className="order-3 md:order-3">
                    <div className="relative h-32 w-full rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=128&width=200"
                        alt="Foundation Established"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative pl-10 md:pl-0">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start">
                  <div className="order-3 md:order-1">
                    <div className="relative h-32 w-full rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=128&width=200"
                        alt="First Community Program"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center order-1 md:order-2">
                    <div className="absolute md:static left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="hidden md:block text-muted-foreground font-medium">2019</div>
                  </div>

                  <div className="order-2 md:order-3">
                    <h3 className="text-xl font-bold">First Community Program</h3>
                    <p className="text-muted-foreground">
                      Launched our first community service program, providing educational support to children in
                      underserved areas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative pl-10 md:pl-0">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start">
                  <div className="md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-bold">Yoga Initiative Begins</h3>
                    <p className="text-muted-foreground">
                      Started free community yoga classes, making ancient practices accessible to people of all
                      backgrounds.
                    </p>
                  </div>

                  <div className="flex items-center justify-center order-1 md:order-2">
                    <div className="absolute md:static left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="hidden md:block text-muted-foreground font-medium">2020</div>
                  </div>

                  <div className="order-3 md:order-3">
                    <div className="relative h-32 w-full rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=128&width=200"
                        alt="Yoga Initiative Begins"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative pl-10 md:pl-0">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start">
                  <div className="order-3 md:order-1">
                    <div className="relative h-32 w-full rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=128&width=200"
                        alt="Environmental Focus"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center order-1 md:order-2">
                    <div className="absolute md:static left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="hidden md:block text-muted-foreground font-medium">2021</div>
                  </div>

                  <div className="order-2 md:order-3">
                    <h3 className="text-xl font-bold">Environmental Focus</h3>
                    <p className="text-muted-foreground">
                      Launched our first environmental conservation project with a major tree plantation drive and
                      community education program.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative pl-10 md:pl-0">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start">
                  <div className="md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-bold">Expanding Reach</h3>
                    <p className="text-muted-foreground">
                      Expanded our programs to multiple locations, reaching more communities and creating a wider
                      impact.
                    </p>
                  </div>

                  <div className="flex items-center justify-center order-1 md:order-2">
                    <div className="absolute md:static left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="hidden md:block text-muted-foreground font-medium">2022</div>
                  </div>

                  <div className="order-3 md:order-3">
                    <div className="relative h-32 w-full rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=128&width=200"
                        alt="Expanding Reach"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative pl-10 md:pl-0">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start">
                  <div className="order-3 md:order-1">
                    <div className="relative h-32 w-full rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=128&width=200"
                        alt="Present Day"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center order-1 md:order-2">
                    <div className="absolute md:static left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="hidden md:block text-muted-foreground font-medium">Today</div>
                  </div>

                  <div className="order-2 md:order-3">
                    <h3 className="text-xl font-bold">Present Day</h3>
                    <p className="text-muted-foreground">
                      Today, Aatman Foundation continues to grow, with a dedicated team working across multiple
                      initiatives to create positive change.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground">
              Numbers that reflect our journey and the difference we've made together.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-10 w-10 mx-auto text-primary mb-4" />
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <p className="text-muted-foreground">People Impacted</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Leaf className="h-10 w-10 mx-auto text-primary mb-4" />
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <p className="text-muted-foreground">Trees Planted</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="h-10 w-10 mx-auto text-primary mb-4" />
                <div className="text-4xl font-bold mb-2">200+</div>
                <p className="text-muted-foreground">Yoga Sessions</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <BookOpen className="h-10 w-10 mx-auto text-primary mb-4" />
                <div className="text-4xl font-bold mb-2">50+</div>
                <p className="text-muted-foreground">Community Programs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in Making a Difference</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you want to volunteer, donate, or collaborate, there are many ways to be part of our journey and
              contribute to positive change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Get Involved</Link>
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

