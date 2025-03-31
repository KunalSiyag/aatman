import HeroSlider from "@/components/hero-slider"
import FounderMessage from "@/components/founder-message"
import TeamMembers from "@/components/team-members"
import FeedbackForm from "@/components/feedback-form"
import ReviewSection from "@/components/review-section"
import RecentActivities from "@/components/recent-activities"
import DonateSection from "@/components/donate-section"

export default function Home() {
  return (
    <main className="relative">
      <HeroSlider />
      <FounderMessage />
      <TeamMembers />
      <ReviewSection />
      <RecentActivities />
      <FeedbackForm />
    </main>
  )
}

