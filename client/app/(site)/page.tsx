import HeroSlider from "@/components/hero-slider"
import FounderMessage from "@/components/founder-message"
import AboutPage from "@/components/about"

export default function Home() {
  return (
    <main className="relative">
      <HeroSlider />
      <FounderMessage />
      <AboutPage/>
    </main>
  )
}

