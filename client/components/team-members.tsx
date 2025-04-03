"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function TeamMembers() {
  const containerRef = useRef<any>(null);
  const circlesRef = useRef<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const animationRef = useRef<any>(null);
  const velocitiesRef = useRef<any[]>([]);
  const positionsRef = useRef<any[]>([]);
  const circleSize = 450;

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => {
        setTeamMembers(data);

        // Initialize positions and velocities
        positionsRef.current = data.map(() => ({
          x: Math.random() * 300,
          y: Math.random() * 300,
        }));

        velocitiesRef.current = data.map(() => ({
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
        }));
      })
      .catch((error) => console.error("Error fetching members:", error));
  }, []);

  useEffect(() => {
    if (teamMembers.length === 0) return;

    const animate = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      positionsRef.current.forEach((pos, index) => {
        let { x, y } = pos;
        let { vx, vy } = velocitiesRef.current[index];

        x += vx * 2;
        y += vy * 2;

        if (x < 0 || x > containerRect.width - circleSize) {
          velocitiesRef.current[index].vx *= -1;
        }

        if (y < 0 || y > containerRect.height - circleSize) {
          velocitiesRef.current[index].vy *= -1;
        }

        positionsRef.current[index] = { x, y };

        gsap.to(circlesRef.current[index], {
          x,
          y,
          duration: 0.5,
          ease: "power1.out",
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [teamMembers]);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-lg text-muted-foreground">
            Meet the dedicated individuals who make our mission possible through their passion and expertise.
          </p>
        </div>

        <div ref={containerRef} className="relative h-[500px] md:h-[600px] border border-border rounded-xl bg-muted/30 mx-auto max-w-4xl overflow-hidden">
          {teamMembers.map((member, index) => (
            <div
              key={member._id}
              ref={(el) => (circlesRef.current[index] = el)}
              className="absolute cursor-pointer transition-transform"
              style={{
                width: `${circleSize}px`,
                height: `${circleSize}px`,
                transform: `translate(${positionsRef.current[index]?.x || 0}px, ${positionsRef.current[index]?.y || 0}px)`,
              }}
              onClick={() => {
                setSelectedMember(member);
                setOpen(true);
              }}
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
                  <Image src={selectedMember.image || "/placeholder.svg"} alt={selectedMember.name} fill className="object-cover" />
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
  );
}
