"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample team data - in a real app, this would come from a CMS or API
const teamMembers = [
  {
    id: 1,
    name: "Divyansh Gaur",
    role: "Founder & Director",
    bio: "Divyansh founded Aatman Foundation with a vision to bridge traditional wisdom with modern challenges. With a background in community development and a deep personal practice of yoga, he has dedicated his life to creating positive change.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Yoga Program Lead",
    bio: "Priya is a certified yoga instructor with over 10 years of experience. She leads our yoga programs and workshops, bringing ancient practices to modern contexts with sensitivity and expertise.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Environmental Initiatives",
    bio: "With a background in environmental science, Amit leads our nature conservation efforts. He has successfully implemented several community-based conservation projects across the region.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Ritu Verma",
    role: "Community Outreach",
    bio: "Ritu coordinates our community service programs, ensuring they address real needs and create lasting impact. Her background in social work informs her compassionate approach.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Education Programs",
    bio: "Vikram develops and implements our educational initiatives, focusing on holistic learning approaches that combine traditional wisdom with contemporary knowledge.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Neha Gupta",
    role: "Wellness Coordinator",
    bio: "Neha brings her expertise in holistic health to our wellness programs, creating integrated approaches that address physical, mental, and spiritual wellbeing.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Rajesh Kumar",
    role: "Operations Manager",
    bio: "Rajesh ensures the smooth functioning of all our programs and initiatives, bringing his organizational expertise to support our mission and vision.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Ananya Desai",
    role: "Communications",
    bio: "Ananya manages our communications and social media presence, sharing our story and impact with the wider community and building meaningful connections.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function TeamMembers() {
  const containerRef = useRef(null)
  const circlesRef = useRef([])
  const [selectedMember, setSelectedMember] = useState(null)
  const [open, setOpen] = useState(false)
  const animationRef = useRef(null)
  const velocitiesRef = useRef([])
  const positionsRef = useRef([])
  const circleSize = 120 // Size of each circle in pixels

  useEffect(() => {
    const container = containerRef.current
    const circles = circlesRef.current
    const containerRect = container.getBoundingClientRect()
    const containerWidth = containerRect.width
    const containerHeight = containerRect.height

    // Initialize positions and velocities
    positionsRef.current = circles.map(() => ({
      x: Math.random() * (containerWidth - circleSize),
      y: Math.random() * (containerHeight - circleSize),
    }))

    velocitiesRef.current = circles.map(() => ({
      x: (Math.random() - 0.5) * 2, // Random velocity between -1 and 1
      y: (Math.random() - 0.5) * 2,
    }))

    // Function to update positions and handle collisions
    const updatePositions = () => {
      const positions = positionsRef.current
      const velocities = velocitiesRef.current

      // Update positions based on velocities
      for (let i = 0; i < circles.length; i++) {
        positions[i].x += velocities[i].x
        positions[i].y += velocities[i].y

        // Bounce off walls
        if (positions[i].x <= 0 || positions[i].x >= containerWidth - circleSize) {
          velocities[i].x *= -1
          positions[i].x = Math.max(0, Math.min(positions[i].x, containerWidth - circleSize))
        }
        if (positions[i].y <= 0 || positions[i].y >= containerHeight - circleSize) {
          velocities[i].y *= -1
          positions[i].y = Math.max(0, Math.min(positions[i].y, containerHeight - circleSize))
        }

        // Apply position to DOM
        gsap.set(circles[i], {
          x: positions[i].x,
          y: positions[i].y,
        })
      }

      // Check for collisions between circles
      for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
          const dx = positions[i].x - positions[j].x
          const dy = positions[i].y - positions[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // If circles are colliding
          if (distance < circleSize) {
            // Calculate collision response
            const angle = Math.atan2(dy, dx)
            const sin = Math.sin(angle)
            const cos = Math.cos(angle)

            // Rotate velocities
            const vx1 = velocities[i].x * cos + velocities[i].y * sin
            const vy1 = velocities[i].y * cos - velocities[i].x * sin
            const vx2 = velocities[j].x * cos + velocities[j].y * sin
            const vy2 = velocities[j].y * cos - velocities[j].x * sin

            // Swap velocities
            const temp_vx1 = vx2
            const temp_vy1 = vy1
            const temp_vx2 = vx1
            const temp_vy2 = vy2

            // Rotate velocities back
            velocities[i].x = temp_vx1 * cos - temp_vy1 * sin
            velocities[i].y = temp_vy1 * cos + temp_vx1 * sin
            velocities[j].x = temp_vx2 * cos - temp_vy2 * sin
            velocities[j].y = temp_vy2 * cos + temp_vx2 * sin

            // Move circles apart to prevent sticking
            const overlap = circleSize - distance
            const moveX = (overlap / 2) * Math.cos(angle)
            const moveY = (overlap / 2) * Math.sin(angle)

            positions[i].x += moveX
            positions[i].y += moveY
            positions[j].x -= moveX
            positions[j].y -= moveY
          }
        }
      }

      animationRef.current = requestAnimationFrame(updatePositions)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(updatePositions)

    // Add hover interactions
    circles.forEach((circle) => {
      circle.addEventListener("mouseenter", () => {
        gsap.to(circle, {
          scale: 1.1,
          duration: 0.3,
          zIndex: 10,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        })
      })

      circle.addEventListener("mouseleave", () => {
        gsap.to(circle, {
          scale: 1,
          duration: 0.3,
          zIndex: 1,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        })
      })
    })

    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handleMemberClick = (member) => {
    setSelectedMember(member)
    setOpen(true)
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-lg text-muted-foreground">
            Meet the dedicated individuals who make our mission possible through their passion and expertise.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative h-[500px] md:h-[600px] border border-border rounded-xl bg-muted/30 mx-auto max-w-4xl overflow-hidden"
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => (circlesRef.current[index] = el)}
              className={cn(
                "absolute cursor-pointer transition-transform",
                "bg-background rounded-full shadow-md overflow-hidden",
                "flex flex-col items-center justify-center text-center p-2",
              )}
              style={{
                width: `${circleSize}px`,
                height: `${circleSize}px`,
                left: 0,
                top: 0,
                transform: `translate(${Math.random() * 100}px, ${Math.random() * 100}px)`,
              }}
              onClick={() => handleMemberClick(member)}
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden mb-1">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xs font-medium line-clamp-1">{member.name}</h3>
              <p className="text-[10px] text-muted-foreground line-clamp-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {selectedMember && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={selectedMember.image || "/placeholder.svg"}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <DialogTitle>{selectedMember.name}</DialogTitle>
                  <DialogDescription>{selectedMember.role}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="mt-4">
              <p>{selectedMember.bio}</p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}

