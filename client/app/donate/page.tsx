import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Users, Leaf, BookOpen } from "lucide-react"

export default function DonatePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Support Our Cause</h1>
        <p className="text-muted-foreground text-lg">
          Your contribution helps us continue our mission of community service, promoting yoga, and nature conservation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <Card className="text-center">
          <CardHeader>
            <Heart className="w-12 h-12 mx-auto text-primary" />
            <CardTitle>General Fund</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Support all our initiatives</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Users className="w-12 h-12 mx-auto text-primary" />
            <CardTitle>Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Help local community projects</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Leaf className="w-12 h-12 mx-auto text-primary" />
            <CardTitle>Environment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Support nature conservation</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <BookOpen className="w-12 h-12 mx-auto text-primary" />
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Fund educational programs</p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-2xl mx-auto">
        <Tabs defaultValue="one-time">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="one-time">One-time Donation</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Donation</TabsTrigger>
          </TabsList>

          <TabsContent value="one-time">
            <Card>
              <CardHeader>
                <CardTitle>Make a One-time Donation</CardTitle>
                <CardDescription>Your contribution will be put to immediate use in our programs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="donation-amount">Select Amount</Label>
                  <RadioGroup defaultValue="500" className="flex flex-wrap gap-4">
                    <div>
                      <RadioGroupItem value="100" id="amount-100" className="peer sr-only" />
                      <Label
                        htmlFor="amount-100"
                        className="flex h-14 w-20 cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        ₹100
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="500" id="amount-500" className="peer sr-only" />
                      <Label
                        htmlFor="amount-500"
                        className="flex h-14 w-20 cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        ₹500
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="1000" id="amount-1000" className="peer sr-only" />
                      <Label
                        htmlFor="amount-1000"
                        className="flex h-14 w-20 cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        ₹1000
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="5000" id="amount-5000" className="peer sr-only" />
                      <Label
                        htmlFor="amount-5000"
                        className="flex h-14 w-20 cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        ₹5000
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="custom" id="amount-custom" className="peer sr-only" />
                      <Label
                        htmlFor="amount-custom"
                        className="flex h-14 w-20 cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        Custom
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-amount">Custom Amount (₹)</Label>
                  <Input id="custom-amount" placeholder="Enter amount" type="number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fund">Select Fund</Label>
                  <RadioGroup defaultValue="general">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="general" id="fund-general" />
                      <Label htmlFor="fund-general">General Fund</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="community" id="fund-community" />
                      <Label htmlFor="fund-community">Community Projects</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="environment" id="fund-environment" />
                      <Label htmlFor="fund-environment">Environment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="education" id="fund-education" />
                      <Label htmlFor="fund-education">Education</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Proceed to Payment</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Become a Monthly Supporter</CardTitle>
                <CardDescription>
                  Your recurring donation helps us plan for the future and sustain our programs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly-amount">Select Monthly Amount</Label>
                  <RadioGroup defaultValue="200" className="flex flex-wrap gap-4">
                    <div>
                      <RadioGroupItem value="100" id="monthly-100" className="peer sr-only" />
                      <Label
                        htmlFor="monthly-100"
                        className="flex h-14 w-20 cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        ₹100
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="200" id="monthly-200" className="peer sr-only" />
                      <Label
                        htmlFor="monthly-200"
                        className="flex h-14 w-20 cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        ₹200
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="500" id="monthly-500" className="peer sr-only" />
                      <Label
                        htmlFor="monthly-500"
                        className="flex h-14 w-20 cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        ₹500
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="1000" id="monthly-1000" className="peer sr-only" />
                      <Label
                        htmlFor="monthly-1000"
                        className="flex h-14 w-20 cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        ₹1000
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="custom" id="monthly-custom" className="peer sr-only" />
                      <Label
                        htmlFor="monthly-custom"
                        className="flex h-14 w-20 cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        Custom
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly-custom-amount">Custom Monthly Amount (₹)</Label>
                  <Input id="monthly-custom-amount" placeholder="Enter amount" type="number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly-fund">Select Fund</Label>
                  <RadioGroup defaultValue="general">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="general" id="monthly-fund-general" />
                      <Label htmlFor="monthly-fund-general">General Fund</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="community" id="monthly-fund-community" />
                      <Label htmlFor="monthly-fund-community">Community Projects</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="environment" id="monthly-fund-environment" />
                      <Label htmlFor="monthly-fund-environment">Environment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="education" id="monthly-fund-education" />
                      <Label htmlFor="monthly-fund-education">Education</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Become a Monthly Supporter</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

