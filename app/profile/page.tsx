import ProfileForm from "@/components/profile-form"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 py-12">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">Join Medical Lab Finder</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Create your profile to access our platform and find the best medical laboratories near you.
          </p>
        </div>

        <ProfileForm />
      </div>
    </main>
  )
}
