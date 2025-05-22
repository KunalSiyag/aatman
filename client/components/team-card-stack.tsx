"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import ColorThief from "colorthief"

interface TeamMember {
  _id: string
  name: string
  role: string
  bio: string
  image: string
}

interface CardProps {
  member: TeamMember
  index: number
  removeMember: (id: string) => void
  totalMembers: number
}

export default function TeamCardStack({ teamMembers }: { teamMembers: TeamMember[] }) {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers)
  const [loading, setLoading] = useState(true)
  const [colors, setColors] = useState<
    Record<string, { primary: string; secondary: string; text: string; shadow: string }>
  >({})

  // Extract colors from images when component mounts
  useEffect(() => {
    if (!teamMembers.length) return

    const extractColors = async () => {
      const colorThief = new ColorThief()
      const newColors: Record<string, any> = {}

      for (const member of teamMembers) {
        try {
          const img = new Image()
          img.crossOrigin = "Anonymous"
          img.src = member.image || "/placeholder.svg"

          await new Promise((resolve) => {
            img.onload = () => {
              try {
                const palette = colorThief.getPalette(img, 3)

                // Convert RGB to hex and create color scheme
                const primaryColor = `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})`
                const secondaryColor = `rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]})`
                const shadowColor = `rgba(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]}, 0.6)`

                // Determine if text should be white or black based on primary color brightness
                const brightness = (palette[0][0] * 299 + palette[0][1] * 587 + palette[0][2] * 114) / 1000
                const textColor = brightness < 128 ? "#ffffff" : "#000000"

                newColors[member._id] = {
                  primary: primaryColor,
                  secondary: secondaryColor,
                  text: textColor,
                  shadow: shadowColor,
                }
              } catch (error) {
                // Fallback colors if extraction fails
                newColors[member._id] = {
                  primary: "#1a3a5f",
                  secondary: "#2d5f8a",
                  text: "#ffffff",
                  shadow: "rgba(26, 58, 95, 0.6)",
                }
              }
              resolve(null)
            }

            img.onerror = () => {
              // Fallback colors if image fails to load
              newColors[member._id] = {
                primary: "#1a3a5f",
                secondary: "#2d5f8a",
                text: "#ffffff",
                shadow: "rgba(26, 58, 95, 0.6)",
              }
              resolve(null)
            }
          })
        } catch (error) {
          // Fallback colors if any error occurs
          newColors[member._id] = {
            primary: "#1a3a5f",
            secondary: "#2d5f8a",
            text: "#ffffff",
            shadow: "rgba(26, 58, 95, 0.6)",
          }
        }
      }

      setColors(newColors)
      setLoading(false)
    }

    extractColors()
  }, [teamMembers])

  const removeMember = (id: string) => {
    setMembers((prevMembers) => {
      const newMembers = prevMembers.filter((member) => member._id !== id)

      // If we've removed all members, reset to the original list
      if (newMembers.length === 0) {
        return teamMembers
      }

      return newMembers
    })
  }

  if (loading || !teamMembers.length) {
    return <div className="flex h-96 w-full items-center justify-center">Loading team members...</div>
  }

  return (
    <div className="relative h-[600px] w-full">
      <AnimatePresence mode="popLayout">
        {members.slice(0, 3).map((member, index) => (
          <Card
            key={member._id}
            member={member}
            index={index}
            removeMember={removeMember}
            totalMembers={Math.min(members.length, 3)}
          />
        ))}
      </AnimatePresence>
    </div>
  )

  function Card({ member, index, removeMember, totalMembers }: CardProps) {
    const zIndex = totalMembers - index
    const yOffset = index * 30 // Increased vertical offset
    const xOffset = index * 5 // Added horizontal offset
    const memberColors = colors[member._id] || {
      primary: "#1a3a5f",
      secondary: "#2d5f8a",
      text: "#ffffff",
      shadow: "rgba(26, 58, 95, 0.6)",
    }

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 100, x: xOffset }}
        animate={{
          opacity: 1,
          y: yOffset,
          x: xOffset,
          scale: 1 - index * 0.04,
          rotateZ: index * -3, // Slight rotation for each card
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.2 },
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 50,
          mass: 1,
        }}
        style={{
          zIndex,
          boxShadow: `0 ${10 + index * 5}px ${30 + index * 10}px ${memberColors.shadow}`,
          backgroundColor: memberColors.primary,
        }}
        className="absolute left-0 top-0 h-full w-full cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing"
        drag={index === 0} // Allow drag in all directions for the top card
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        dragElastic={0.6}
        onDragEnd={(_, info) => {
          if (index === 0) {
            const distance = Math.sqrt(Math.pow(info.offset.x, 2) + Math.pow(info.offset.y, 2))
            if (distance > 150) {
              // Adjust this threshold as needed
              removeMember(member._id)
            }
          }
        }}
        whileDrag={{
          scale: 1.05,
          boxShadow: `0 ${15 + index * 5}px ${40 + index * 10}px ${memberColors.shadow}`,
        }}
      >
        <motion.div
          className="relative flex h-full flex-col overflow-hidden rounded-2xl"
          style={{ color: memberColors.text }}
        >
          {/* Card Header */}
          <div className="flex items-center justify-between p-4">
            <div className="rounded-full bg-opacity-20 p-2" style={{ backgroundColor: `${memberColors.text}20` }}>
              <span className="font-bold">{member.name.charAt(0)}</span>
            </div>
            <div className="rounded-full bg-opacity-20 p-2" style={{ backgroundColor: `${memberColors.text}20` }}>
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>

          {/* Card Title */}
          <div className="px-4 py-2">
            <h2 className="text-3xl font-bold">{member.name}</h2>
            <h3 className="text-xl font-medium" style={{ color: `${memberColors.text}99` }}>
              {member.role}
            </h3>
          </div>

          {/* Card Image */}
          <div className="mt-2 overflow-hidden px-4">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-cover bg-center relative">
              <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-auto p-4">
            <div
              className="rounded-full px-3 py-1 text-sm"
              style={{
                backgroundColor: `${memberColors.text}20`,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              Team Member
            </div>
            <p className="mt-3 text-sm opacity-80 line-clamp-3">{member.bio}</p>
          </div>

          {/* Drag indicator for the top card */}
          {index === 0 && (
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center">
              <motion.div
                className="h-1 w-10 rounded-full"
                style={{ backgroundColor: `${memberColors.text}40` }}
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    )
  }
}
