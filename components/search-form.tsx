"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Locate, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/contexts/user-context"
import { SignInDialog } from "@/components/sign-in-dialog"

export default function SearchForm() {
  const [testName, setTestName] = useState("")
  const [location, setLocation] = useState("")
  const [isLocating, setIsLocating] = useState(false)
  const [signInDialogOpen, setSignInDialogOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { isProfileComplete } = useUser()

  const detectLocation = () => {
    setIsLocating(true)

    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support location detection. Please enter your location manually.",
        variant: "destructive",
      })
      setIsLocating(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, we would convert coordinates to a city name using a geocoding service
        // For demo purposes, we'll just use the coordinates
        setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`)
        toast({
          title: "Location detected",
          description: "We've detected your current location.",
        })
        setIsLocating(false)
      },
      (error) => {
        console.error("Error getting location:", error)
        toast({
          title: "Location detection failed",
          description: "We couldn't detect your location. Please enter it manually.",
          variant: "destructive",
        })
        setIsLocating(false)
      },
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!testName.trim()) {
      toast({
        title: "Test name required",
        description: "Please enter the name of the diagnostic test.",
        variant: "destructive",
      })
      return
    }

    if (!location.trim()) {
      toast({
        title: "Location required",
        description: "Please enter your location or use the detect location feature.",
        variant: "destructive",
      })
      return
    }

    // If user is not logged in, show sign-in dialog
    if (!isProfileComplete) {
      // Store search params to use after sign-in
      sessionStorage.setItem("pendingSearch", JSON.stringify({ test: testName, location }))
      setSignInDialogOpen(true)
      return
    }

    // Encode the parameters for the URL
    const params = new URLSearchParams({
      test: testName,
      location: location,
    })

    router.push(`/results?${params.toString()}`)
  }

  return (
    <>
      <Card className="shadow-none border-0" id="search-form">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-slate-900">Find Medical Labs</CardTitle>
          <CardDescription>Enter your test details and location to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="test-name" className="text-base font-medium text-slate-900">
                Diagnostic Test
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="test-name"
                  placeholder="Enter test name (e.g., Complete Blood Count, Lipid Panel)"
                  className="pl-10 py-6 bg-slate-50 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-base font-medium text-slate-900">
                Your Location
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="location"
                    placeholder="City, State or Postal Code"
                    className="pl-10 py-6 bg-slate-50 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={detectLocation}
                  disabled={isLocating}
                  className="border-slate-200 hover:bg-slate-50 hover:text-teal-600"
                >
                  {isLocating ? "Detecting..." : "Detect"}
                  <Locate className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-base bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 transition-all duration-200"
            >
              Find Labs Near Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              By searching, you agree to our{" "}
              <a href="#" className="text-teal-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-teal-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      <SignInDialog open={signInDialogOpen} onOpenChange={setSignInDialogOpen} redirectUrl="/results" />
    </>
  )
}
