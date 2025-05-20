export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "This platform saved me so much time and money. I found a lab that was half the price of what my doctor's office quoted me!",
      author: "Sarah Johnson",
      role: "Patient",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "As a doctor, I recommend this service to all my patients. It helps them find quality labs with transparent pricing.",
      author: "Dr. Michael Chen",
      role: "Cardiologist",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "I was able to book my annual blood work in minutes and found a lab just 2 miles from my home. Incredibly convenient!",
      author: "Robert Garcia",
      role: "Patient",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">What Our Users Say</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have simplified their healthcare journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center mb-4">
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
                  className="h-8 w-8 text-teal-500"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <p className="text-slate-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">{testimonial.author}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
