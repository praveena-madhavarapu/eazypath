"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/contexts/user-context"
import ProfileGuard from "@/components/profile-guard"

export default function BookingsPage() {
  const { isProfileComplete } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isProfileComplete) {
      router.push("/profile")
    }
  }, [isProfileComplete, router])

  if (!isProfileComplete) {
    return null // Don't render anything while redirecting
  }

  return (
    <ProfileGuard>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

          <Card>
            <CardHeader>
              <CardTitle>No Bookings Yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                You haven't made any lab test bookings yet. Start by searching for a lab and booking an appointment.
              </p>
              <Button asChild>
                <Link href="/">Find Labs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </ProfileGuard>
  )
}
