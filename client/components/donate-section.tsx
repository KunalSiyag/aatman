import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Users, Leaf, BookOpen } from "lucide-react"

export default function DonateSection() {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Our Cause</h2>
          <p className="text-lg text-muted-foreground">
            Your contribution helps us continue our mission of community service, promoting yoga, and nature
            conservation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-background rounded-xl p-6 text-center shadow-sm border border-border">
            <Heart className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">General Fund</h3>
            <p className="text-muted-foreground mb-4">
              Support all our initiatives and help us allocate resources where they're needed most.
            </p>
          </div>

          <div className="bg-background rounded-xl p-6 text-center shadow-sm border border-border">
            <Users className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-muted-foreground mb-4">
              Help us empower local communities through education, healthcare, and skill development.
            </p>
          </div>

          <div className="bg-background rounded-xl p-6 text-center shadow-sm border border-border">
            <Leaf className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Environment</h3>
            <p className="text-muted-foreground mb-4">
              Support our conservation efforts, tree plantation drives, and sustainable living initiatives.
            </p>
          </div>

          <div className="bg-background rounded-xl p-6 text-center shadow-sm border border-border">
            <BookOpen className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Education</h3>
            <p className="text-muted-foreground mb-4">
              Help us provide quality education and learning resources to underserved communities.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/donate">Donate Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

