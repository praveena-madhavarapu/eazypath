"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useUser, type UserProfile } from "@/contexts/user-context"
import { useToast } from "@/hooks/use-toast"

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.number().min(1, { message: "Age must be at least 1" }).max(120, { message: "Age must be less than 120" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
})

export default function EditProfilePage() {
  const { userProfile, setUserProfile, isProfileComplete } = useUser()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      age: undefined,
      email: "",
      phone: "",
    },
  })

  useEffect(() => {
    if (!isProfileComplete) {
      router.push("/profile")
      return
    }

    if (userProfile) {
      form.reset(userProfile)
    }
  }, [userProfile, isProfileComplete, form, router])

  const onSubmit = async (data: UserProfile) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the user profile
      setUserProfile(data)

      toast({
        title: "Profile updated successfully",
        description: "Your profile information has been updated.",
      })

      // Redirect to home page
      router.push("/")
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "Please try again later",
        variant: "destructive",
      })
    }
  }

  if (!isProfileComplete || !userProfile) {
    return null // Don't render anything while redirecting or loading
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 py-12">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">Edit Your Profile</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Update your personal information below.</p>
        </div>

        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Edit Profile</CardTitle>
            <CardDescription>Make changes to your profile information here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="30"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
