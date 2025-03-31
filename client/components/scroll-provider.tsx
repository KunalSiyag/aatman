"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

export function ScrollProvider({ children }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    // Dynamically import Locomotive Scroll to avoid SSR issues
    const initLocomotiveScroll = async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default

        // Make sure the ref exists before initializing
        if (!scrollRef.current) return

        // Initialize Locomotive Scroll with simpler configuration
        const locoScroll = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          lerp: 0.08,
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
        })

        // Update ScrollTrigger when locomotive scroll updates
        locoScroll.on("scroll", () => {
          ScrollTrigger.update()
        })

        // Set up ScrollTrigger scroller proxy with safer implementation
        ScrollTrigger.scrollerProxy(scrollRef.current, {
          scrollTop(value) {
            if (locoScroll && locoScroll.scroll) {
              return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance?.scroll?.y || 0
            }
            return 0
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            }
          },
          pinType: scrollRef.current.style.transform ? "transform" : "fixed",
        })

        // Refresh ScrollTrigger and locomotive scroll
        ScrollTrigger.addEventListener("refresh", () => {
          if (locoScroll) locoScroll.update()
        })

        ScrollTrigger.refresh()

        // Clean up
        return () => {
          if (locoScroll) locoScroll.destroy()
          ScrollTrigger.clearScrollMemory()
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
      } catch (error) {
        console.error("Failed to initialize Locomotive Scroll:", error)
      }
    }

    // Initialize after a short delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      initLocomotiveScroll()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  )
}

