import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12">
      <div className="container px-4 mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center">About Medical Lab Finder</h1>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-slate-700 mb-6">
            Medical Lab Finder was created with a simple mission: to make healthcare more accessible and affordable by
            connecting patients with the right diagnostic laboratories. We believe that everyone deserves access to
            quality healthcare services without the burden of excessive costs or inconvenience.
          </p>

          <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
          <p className="text-slate-700 mb-6">
            Our platform helps patients find accredited medical laboratories near their location that offer the specific
            diagnostic tests they need. We provide transparent pricing information, verified reviews, and easy booking
            options to simplify the process of getting medical tests done.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2 text-teal-700">Transparency</h3>
              <p className="text-slate-600">We believe in complete transparency in healthcare pricing and services.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2 text-teal-700">Accessibility</h3>
              <p className="text-slate-600">Making healthcare services accessible to everyone, everywhere.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2 text-teal-700">Quality</h3>
              <p className="text-slate-600">
                We only partner with accredited laboratories that meet our quality standards.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2 text-teal-700">Privacy</h3>
              <p className="text-slate-600">
                We take your privacy seriously and protect your personal health information.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/">Find Labs Near You</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
