"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote } from "lucide-react"

export default function FounderMessage() {
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const quote = quoteRef.current
    const image = imageRef.current
    const text = textRef.current

    gsap.fromTo(
      quote,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      image,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      text,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Stripes */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 to-blue-500 bg-[length:200%_200%] rotate-[45deg]"></div>

      <div className="container mx-auto px-4">
        {/* Section Header with Color */}
        <div className="max-w-4xl mx-auto text-center mb-12 bg-red-100 p-6 rounded-lg shadow-lg">
          <Quote ref={quoteRef} className="h-12 w-12 mx-auto text-primary mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-800">Founder's Message</h2>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
          {/* Image with Background Color */}
          <div
            ref={imageRef}
            className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden bg-yellow-100 shadow-lg"
          >
            <Image
              src="/placeholder.svg?height=320&width=320"
              alt="Divyansh Gaur - Founder"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Section with Background Color */}
          <div ref={textRef} className="space-y-6 bg-green-100 p-6 rounded-lg shadow-lg">
            <blockquote className="text-lg md:text-xl italic text-green-800">
              "At Aatman Foundation, we believe in the power of community, the wisdom of ancient practices like yoga,
              and the importance of living in harmony with nature. Our mission is to create a world where these values
              guide our actions and decisions, leading to more sustainable and compassionate communities."
            </blockquote>

            <div className="flex items-center">
              <div>
                <h3 className="font-bold text-lg text-green-800">Divyansh Gaur</h3>
                <p className="text-green-600">Founder, Aatman Foundation</p>
              </div>
            </div>

            <p className="text-green-800">
              Divyansh founded Aatman Foundation with a vision to bridge traditional wisdom with modern challenges. With
              a background in community development and a deep personal practice of yoga, he has dedicated his life to
              creating positive change through grassroots initiatives that empower individuals and communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
