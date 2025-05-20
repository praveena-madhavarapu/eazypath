"use client"

import type { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"

export default function ProfileGuard({ children }: { children: ReactNode }) {
  const { isProfileComplete } = useUser()
  const router = useRouter()

  // If profile is not complete, redirect to profile creation page
  if (!isProfileComplete) {
    router.push("/profile")
    return null
  }

  // If profile is complete, render children
  return <>{children}</>
}
