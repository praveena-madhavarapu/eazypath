"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useUser, type UserProfile } from "@/contexts/user-context"
import { useToast } from "@/hooks/use-toast"

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.number().min(1, { message: "Age must be at least 1" }).max(120, { message: "Age must be less than 120" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type SignInFormValues = z.infer<typeof signInSchema>
type SignUpFormValues = z.infer<typeof signUpSchema>

interface SignInDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  redirectUrl?: string
}

export function SignInDialog({ open, onOpenChange, redirectUrl = "/" }: SignInDialogProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUserProfile } = useUser()
  const { toast } = useToast()
  const router = useRouter()

  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      age: undefined,
      email: "",
      phone: "",
      password: "",
    },
  })

  const onSignIn = async (data: SignInFormValues) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll create a mock user profile
      const userProfile: UserProfile = {
        name: "Demo User",
        age: 30,
        email: data.email,
        phone: "(555) 123-4567",
      }

      setUserProfile(userProfile)

      toast({
        title: "Signed in successfully",
        description: "Welcome back to EazyPath!",
      })

      onOpenChange(false)

      // Redirect to the specified URL
      if (redirectUrl) {
        router.push(redirectUrl)
      }
    } catch (error) {
      toast({
        title: "Error signing in",
        description: "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSignUp = async (data: SignUpFormValues) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create user profile from form data
      const userProfile: UserProfile = {
        name: data.name,
        age: data.age,
        email: data.email,
        phone: data.phone,
      }

      setUserProfile(userProfile)

      toast({
        title: "Account created successfully",
        description: "Welcome to EazyPath!",
      })

      onOpenChange(false)

      // Redirect to the specified URL
      if (redirectUrl) {
        router.push(redirectUrl)
      }
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to EazyPath</DialogTitle>
          <DialogDescription>Sign in to your account or create a new one to access all features.</DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="signin"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Create Account</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-4">
            <Form {...signInForm}>
              <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signInForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-center text-sm">
              <span className="text-slate-500">Don't have an account?</span>{" "}
              <button
                type="button"
                onClick={() => setActiveTab("signup")}
                className="text-teal-600 hover:underline font-medium"
              >
                Create one
              </button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="mt-4">
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                <FormField
                  control={signUpForm.control}
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
                  control={signUpForm.control}
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
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
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

                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-center text-sm">
              <span className="text-slate-500">Already have an account?</span>{" "}
              <button
                type="button"
                onClick={() => setActiveTab("signin")}
                className="text-teal-600 hover:underline font-medium"
              >
                Sign in
              </button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col space-y-2">
          <div className="text-xs text-center text-slate-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-teal-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-teal-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
