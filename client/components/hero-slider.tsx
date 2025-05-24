"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import slides from "@/lib/SliderData.json"
import { cn } from "@/lib/utils"

/**
 * HeroSlider – Mission Impossible‐style intro
 * ------------------------------------------------------------
 * Sequence per slide:
 *   1. Text appears on full black background (left-aligned)
 *   2. Black background slowly reveals the image behind
 *   3. Text remains left-aligned with cinematic positioning
 */
export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0)
  const arrowLeftRef = useRef(null)
  const arrowRightRef = useRef(null)
  const totalSlides = slides.length

  /* Arrow micro‑anim */
  useEffect(() => {
    if (arrowLeftRef.current && arrowRightRef.current) {
      gsap.fromTo(
        [arrowLeftRef.current, arrowRightRef.current],
        { y: -4 },
        { y: 4, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut" },
      )
    }
  }, [])

  const next = () => setActiveSlide((p) => (p + 1) % totalSlides)
  const prev = () => setActiveSlide((p) => (p - 1 + totalSlides) % totalSlides)

  /* ─ Variants ─ */
  const titleVar = {
    initial: {
      opacity: 0,
      x: -50,
      y: 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: -30,
      transition: { duration: 0.6, ease: "easeIn" },
    },
  } as const

  const overlayVar = {
    initial: { opacity: 1 }, // solid black start
    animate: {
      opacity: 0,
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        delay: 1.5,
      },
    },
    exit: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  } as const

  const imageVar = {
    initial: {
      opacity: 0,
      scale: 1.1,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 2.5,
        ease: "easeOut",
        delay: 1.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.8, ease: "easeIn" },
    },
  } as const

  return (
    <section className="relative h-screen w-full overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {slides.map((slide, i) =>
          i === activeSlide ? (
            <motion.div
              key={i}
              className="absolute inset-0"
              variants={imageVar}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Black overlay that fades to reveal image */}
              <motion.div className="absolute inset-0 bg-black" variants={overlayVar} />

              {/* Text container with full height and left alignment */}
              <div className="absolute inset-0 z-10 flex items-center">
                <div className="w-full max-w-4xl px-8 md:px-16 lg:px-24">
                  <motion.h1
                    className="text-left font-bold tracking-tight text-white leading-tight"
                    style={{
                      fontSize: "clamp(3rem, 8vw, 8rem)",
                      lineHeight: 0.9,
                      textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                    }}
                    variants={titleVar}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Optional subtitle or description */}
                  {slide.description && (
                    <motion.p
                      className="mt-6 text-left text-lg md:text-xl text-white/90 max-w-2xl"
                      style={{
                        textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 1,
                          delay: 2.2,
                          ease: "easeOut",
                        },
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                        transition: { duration: 0.5 },
                      }}
                    >
                      {slide.description}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={cn(
              "h-3 w-3 rounded-full transition-all duration-300",
              i === activeSlide ? "w-6 bg-white" : "bg-white/30 hover:bg-white/50",
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        ref={arrowLeftRef}
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 backdrop-blur-sm hover:bg-black/70 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        ref={arrowRightRef}
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 backdrop-blur-sm hover:bg-black/70 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
    </section>
  )
}
