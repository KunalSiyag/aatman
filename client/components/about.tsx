"use client"

import { useLayoutEffect, useEffect, useRef , useState} from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Users, Leaf, Award, Target, Clock } from "lucide-react"
import TeamMembers from "./team-members"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import journeyData from "@/lib/journeyData.json"


// Mission Impossible Style Slideshow Component
function MissionImpossibleSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const slideshowRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-advance slides
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % journeyData.length)
      }, 4000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered])

  // GSAP animations for slide transitions
  useEffect(() => {
    if (!dateRef.current || !textRef.current || !imageRef.current) return

    const tl = gsap.timeline()

    // Date woosh effect
    tl.fromTo(
      dateRef.current,
      {
        x: -200,
        opacity: 0,
        scale: 0.5,
        rotation: -10,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
    )

    // Text pop-up from right
    tl.fromTo(
      textRef.current.children,
      {
        x: 100,
        opacity: 0,
        y: 20,
      },
      {
        x: 0,
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.4",
    )

    // Image slide in
    tl.fromTo(
      imageRef.current,
      {
        scale: 1.2,
        opacity: 0,
        filter: "blur(10px)",
      },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
      },
      "-=0.6",
    )
  }, [currentSlide])

  const currentData = journeyData[currentSlide]

  return (
    <div
      ref={slideshowRef}
      className="relative h-[600px]  bg-black rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0">
        <Image src={currentData.image || "/placeholder.svg"} alt={currentData.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/45"/>
      </div>

      {/* Date Display - Top */}
      <div ref={dateRef} className="absolute top-8 left-8 z-10">
        <div className="bg-primary/90 backdrop-blur-sm px-6 py-3 rounded-full">
          <span className="text-white font-bold text-xl tracking-wider">{currentData.date}</span>
        </div>
      </div>

      {/* Content - Right Side */}
      <div ref={textRef}  className="absolute z-10 max-w-md
             bottom-4 left-1/2 -translate-x-1/2
             sm:bottom-auto sm:left-auto sm:right-16 sm:top-3/4 sm:-translate-y-1/2 sm:translate-x-0"
>
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">{currentData.title}</h3>
          <p className="text-gray-700 leading-relaxed">{currentData.description}</p>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {journeyData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-10">
        <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-white font-mono text-sm">
            {String(currentSlide + 1).padStart(2, "0")} / {String(journeyData.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + journeyData.length) % journeyData.length)}
       className="absolute left-2 sm:left-4 top-auto bottom-4 sm:top-1/2 sm:-translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % journeyData.length)}
        className="absolute right-2 sm:right-4 top-auto bottom-4 sm:top-1/2 sm:-translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}


export default function AboutPage() {
  // Refs for animation targets
  const heroRef = useRef<HTMLElement | null>(null)
  const missionRef = useRef<HTMLElement | null>(null)
  const focusRef = useRef<HTMLElement | null>(null)
  const journeyRef = useRef<HTMLElement | null>(null)
  const ctaRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Use GSAP context – keeps animations scoped and easy to clean up
    const ctx = gsap.context(() => {
      /** HERO */
      if (heroRef.current) {
        const heroContent = heroRef.current.querySelector(".hero-content")
        const heroImage = heroRef.current.querySelector(".hero-image")

        heroContent &&
          gsap.fromTo(
            heroContent,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          )

        heroImage &&
          gsap.fromTo(
            heroImage,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: "back.out(1.7)" },
          )
      }

      /** MISSION & VISION */
      if (missionRef.current) {
        const missionItems = missionRef.current.querySelectorAll(".mission-item")
        if (missionItems.length)
          gsap.fromTo(
            missionItems,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power2.out",
              scrollTrigger: { trigger: missionRef.current, start: "top 80%" },
            },
          )

        const missionImage = missionRef.current.querySelector(".mission-image")
        missionImage &&
          gsap.fromTo(
            missionImage,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: missionRef.current, start: "top 80%" },
            },
          )
      }

      /** FOCUS AREAS */
      if (focusRef.current) {
        const focusHeading = focusRef.current.querySelector("h2")
        focusHeading &&
          gsap.fromTo(
            focusHeading,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: focusRef.current, start: "top 80%" },
            },
          )

        const tabsContainer = focusRef.current.querySelector(".tabs-container")
        tabsContainer &&
          gsap.fromTo(
            tabsContainer,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.3,
              ease: "power2.out",
              scrollTrigger: { trigger: focusRef.current, start: "top 80%" },
            },
          )
      }

      /** JOURNEY */
      const journeyItems = journeyRef.current?.querySelectorAll(".journey-item") ?? []
      journeyItems.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          },
        )
      })

      /** CTA */
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
          },
        )
      }
    })

    // Cleanup on unmount
    return () => ctx.revert()
  }, [])

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section ref={heroRef} className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hero-content">
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
            <div className="hero-image relative h-[300px] md:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/Event/Change.webp"
                alt="Aatman Foundation Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <TeamMembers />
      {/* Mission & Vision */}
      <section ref={missionRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 mission-item">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-muted-foreground">
              Guided by our core values, we work towards creating a more harmonious and sustainable world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                <div className="space-y-3 mission-item">
                  <div className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground">
                    To empower communities through sustainable initiatives, promote holistic wellbeing through yoga, and
                    foster a deeper connection with nature through conservation efforts.
                  </p>
                </div>

                <div className="space-y-3 mission-item">
                  <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground">
                    A world where communities thrive in harmony with nature, where ancient wisdom guides modern living,
                    and where every individual has the opportunity to reach their full potential.
                  </p>
                </div>

                <div className="space-y-3 mission-item">
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

            <div className="mission-image order-1 md:order-2 relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"
                alt="Our Mission and Vision"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Focus Areas */}
      <section ref={focusRef} className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Focus Areas</h2>
            <p className="text-lg text-muted-foreground">
              We concentrate our efforts in three key areas to create meaningful and lasting impact.
            </p>
          </div>

          <Tabs defaultValue="community" className="max-w-4xl mx-auto tabs-container">
            <TabsList className="grid w-full grid-cols-1 mb-20 md:grid-cols-3">
              <TabsTrigger value="community">Community Service</TabsTrigger>
              <TabsTrigger value="yoga">Yoga & Wellness</TabsTrigger>
              <TabsTrigger value="nature">Nature Conservation</TabsTrigger>
            </TabsList>

            <TabsContent value="community" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] rounded-xl overflow-hidden">
                  <Image
                    src="/Event/donation.webp"
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
                    src="/Event/yoga.webp"
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
                    src="/Event/plantation.webp"
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

       {/* Our Journey - Mission Impossible Style Slideshow */}
      <section ref={journeyRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              From humble beginnings to impactful initiatives, our journey has been one of growth and learning.
            </p>
          </div>

          <div className="max-w-6xl mx-auto journey-slideshow">
            <MissionImpossibleSlideshow />
          </div>
        </div>
      </section>
    </main>
  )
}
