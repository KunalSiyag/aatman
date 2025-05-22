"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import QRCode from "react-qr-code"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, Users, Leaf, BookOpen, CheckCircle2 } from "lucide-react"

/**
 * DonatePage – single‑time UPI/Google Pay donations via QR.
 *
 * 👉 Install deps:
 *    npm i react-qr-code
 *
 * 👉 Configure:
 *    const UPI_ID   = "example@upi"         // your VPA
 *    const MERCHANT = "Your Organisation"    // display name in UPI apps
 */

const UPI_ID = "example@upi" // TODO: replace with real VPA
const MERCHANT = "Your Organisation"

export default function DonatePage() {
  /* ------------------------------------------------------------------ */
  const router = useRouter()
  const [preset, setPreset] = useState("500")
  const [custom, setCustom] = useState("")
  const [showQR, setShowQR] = useState(false)
  const [paid, setPaid] = useState(false)

  const amount = preset === "custom" ? Number(custom || 0) : Number(preset)

  /* -------------------------- redirect after paid ------------------- */
  useEffect(() => {
    if (paid) {
      const timer = setTimeout(() => router.push("/"), 2500)
      return () => clearTimeout(timer)
    }
  }, [paid, router])

  /* --------------------------- helpers ------------------------------ */
  const upiUrl = `upi://pay?pa=${encodeURIComponent(
    UPI_ID,
  )}&pn=${encodeURIComponent(MERCHANT)}&am=${amount.toFixed(
    2,
  )}&cu=INR&tn=${encodeURIComponent("Donation")}`

  const handleDonate = () => {
    if (amount <= 0) return alert("Please enter a valid amount")
    setShowQR(true)
  }

  /* ------------------------------------------------------------------ */
  return (
    <div className="container mx-auto py-16 px-4">
      {/* header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Support Our Cause</h1>
        <p className="text-muted-foreground text-lg">
          Your contribution helps us continue our mission of community service, promoting yoga, and nature
          conservation.
        </p>
      </div>

      {/* fund cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {[
          { icon: Heart, title: "General Fund", desc: "Support all our initiatives" },
          { icon: Users, title: "Community", desc: "Help local community projects" },
          { icon: Leaf, title: "Environment", desc: "Support nature conservation" },
          { icon: BookOpen, title: "Education", desc: "Fund educational programs" },
        ].map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="text-center">
            <CardHeader>
              <Icon className="w-12 h-12 mx-auto text-primary" />
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* donation card or QR/success */}
      <div className="max-w-md mx-auto">
        {!showQR && !paid && (
          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>Your contribution will be put to immediate use in our programs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* amount selection */}
              <div className="space-y-2">
                <Label htmlFor="donation-amount">Select Amount</Label>
                <RadioGroup
                  defaultValue={preset}
                  className="flex flex-wrap gap-4"
                  onValueChange={setPreset}
                >
                  {["100", "500", "1000", "5000", "custom"].map((value) => (
                    <div key={value}>
                      <RadioGroupItem value={value} id={`amount-${value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`amount-${value}`}
                        className="flex h-14 w-20 cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        {value === "custom" ? "Custom" : `₹${value}`}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              {preset === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="custom-amount">Custom Amount (₹)</Label>
                  <Input
                    id="custom-amount"
                    placeholder="Enter amount"
                    type="number"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleDonate}>
                Generate QR & Pay
              </Button>
            </CardFooter>
          </Card>
        )}

        {showQR && !paid && (
          <Card>
            <CardHeader>
              <CardTitle>Scan & Pay with any UPI app</CardTitle>
              <CardDescription className="flex flex-col items-center gap-1">
                <span className="text-sm">Amount: ₹{amount.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground">VPA: {UPI_ID}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-8">
              <QRCode value={upiUrl} size={200} />
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button variant="secondary" className="w-full" onClick={() => navigator.clipboard.writeText(upiUrl)}>
                Copy UPI Link
              </Button>
              <Button className="w-full" onClick={() => setPaid(true)}>
                I've Paid
              </Button>
            </CardFooter>
          </Card>
        )}

        {paid && (
          <Card className="text-center">
            <CardHeader>
              <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
              <CardTitle>Payment Successful!</CardTitle>
              <CardDescription>Redirecting to homepage…</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  )
}
