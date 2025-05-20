"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import ResultsContainer from "@/components/results-container"
import { useUser } from "@/contexts/user-context"
import ProfileGuard from "@/components/profile-guard"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [test, setTest] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const { isProfileComplete } = useUser()
  const router = useRouter()

  useEffect(() => {
    // Check if there are URL params
    const testParam = searchParams.get("test")
    const locationParam = searchParams.get("location")

    if (testParam && locationParam) {
      setTest(testParam)
      setLocation(locationParam)
    } else {
      // Check if there's a pending search in session storage
      const pendingSearch = sessionStorage.getItem("pendingSearch")
      if (pendingSearch) {
        try {
          const { test: pendingTest, location: pendingLocation } = JSON.parse(pendingSearch)
          setTest(pendingTest)
          setLocation(pendingLocation)

          // Clear the pending search
          sessionStorage.removeItem("pendingSearch")

          // Update URL with the search params
          const params = new URLSearchParams({
            test: pendingTest,
            location: pendingLocation,
          })
          router.replace(`/results?${params.toString()}`)
        } catch (e) {
          console.error("Failed to parse pending search", e)
        }
      }
    }
  }, [searchParams, router])

  useEffect(() => {
    if (!isProfileComplete) {
      router.push("/")
    }
  }, [isProfileComplete, router])

  if (!isProfileComplete || !test || !location) {
    return null // Don't render anything while redirecting or loading
  }

  return (
    <ProfileGuard>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="bg-teal-600 text-white">
          <div className="container px-4 py-6 mx-auto max-w-5xl">
            <div className="mb-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-1 text-teal-50 hover:text-white hover:bg-teal-500/20">
                  <ChevronLeft className="h-4 w-4" />
                  Back to Search
                </Button>
              </Link>
            </div>

            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Laboratories near you</h1>
              <div className="flex items-center text-teal-100">
                <Search className="h-4 w-4 mr-2" />
                <span>Showing results near {location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 py-8 mx-auto max-w-5xl">
          <ResultsContainer test={test} location={location} />
        </div>
      </main>
    </ProfileGuard>
  )
}
