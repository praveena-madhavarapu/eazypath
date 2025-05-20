"use client"

import { useState } from "react"
import { Suspense } from "react"
import Image from "next/image"
import SearchForm from "@/components/search-form"
import { Skeleton } from "@/components/ui/skeleton"
import FeatureSection from "@/components/feature-section"
import TestimonialSection from "@/components/testimonial-section"
import TrustBadges from "@/components/trust-badges"
import { SignInDialog } from "@/components/sign-in-dialog"

export default function Home() {
  const [signInDialogOpen, setSignInDialogOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Background pattern"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container px-4 py-16 md:py-24 mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-2">
                Find Accredited Labs Near You
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Your Health Tests, <span className="text-teal-200">Simplified</span>
              </h1>
              <p className="text-lg md:text-xl text-teal-50 max-w-lg">
                Find the best medical laboratories for your diagnostic needs, compare prices, and book appointments in
                just a few clicks.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <span className="font-medium">Trusted by 10,000+ patients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    </svg>
                  </div>
                  <span className="font-medium">HIPAA Compliant</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-200 to-emerald-300 opacity-50 blur-xl"></div>
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
                  <SearchForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Features Section */}
      <FeatureSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="bg-slate-50 py-16">
        <div className="container px-4 mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
            Ready to find the right lab for your needs?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Join thousands of patients who have simplified their diagnostic testing experience with our platform.
          </p>
          <button
            onClick={() => setSignInDialogOpen(true)}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors"
          >
            Get Started Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2 h-4 w-4"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </section>

      <SignInDialog open={signInDialogOpen} onOpenChange={setSignInDialogOpen} />
    </main>
  )
}
