"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import TeamCardStack from "@/components/team-card-stack"

export default function TeamMembers() {
  const founderMessage = useRef<HTMLDivElement | null>(null)
  const leftColumnRef = useRef<HTMLDivElement | null>(null)

  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [selectedMember, setSelectedMember] = useState<any | null>(null)
  const [open, setOpen] = useState(false)

  // ────────────────────────────────────────────────────────────────────────────────
  // Fetch members once on mount
  // ────────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch((error) => console.error("Error fetching members:", error))
  }, [])

  // ────────────────────────────────────────────────────────────────────────────────
  // GSAP Animations
  // ────────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (teamMembers.length === 0) return

    gsap.registerPlugin(ScrollTrigger)

    // Animate founder message fade‑in
    if (founderMessage.current) {
      gsap.fromTo(
        founderMessage.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: founderMessage.current,
            start: "top 80%",
          },
        },
      )
    }

    // Animate left column
    if (leftColumnRef.current) {
      gsap.fromTo(
        leftColumnRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leftColumnRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [teamMembers])

  // ────────────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────────────
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50 via-sky-100 to-blue-200 bg-[length:200%_200%]" />

      <div className="container mx-auto px-4">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left column - Team info */}
          <div ref={leftColumnRef} className="flex flex-col justify-center">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Meet Our Experts</h3>
              <p className="text-slate-700 mb-6">
                Our team brings together diverse talents and expertise to deliver exceptional results. Each member
                contributes unique skills and perspectives that drive our success.
              </p>
              <p className="text-slate-700 mb-6">
                With backgrounds spanning various industries and disciplines, our team members share a common commitment
                to excellence and innovation.
              </p>
              <p className="text-slate-700">
                Swipe through the cards to learn more about each team member and their contributions to our mission.
              </p>
            </div>
          </div>

          {/* Right column - Card stack */}
          <div className="h-[600px]">{teamMembers.length > 0 && <TeamCardStack teamMembers={teamMembers} />}</div>
        </div>
      </div>

      {/* Dialog (modal) for full member bio */}
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
            <div className="mt-4 prose max-w-none">
              <p>{selectedMember.bio}</p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}
