"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface UserProfile {
  name: string
  age: number
  email: string
  phone: string
}

interface UserContextType {
  userProfile: UserProfile | null
  setUserProfile: (profile: UserProfile) => void
  isProfileComplete: boolean
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load profile from localStorage on initial render
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile")
    if (storedProfile) {
      try {
        setUserProfileState(JSON.parse(storedProfile))
      } catch (e) {
        console.error("Failed to parse stored profile", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save profile to localStorage whenever it changes
  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile)
    localStorage.setItem("userProfile", JSON.stringify(profile))
  }

  const logout = () => {
    setUserProfileState(null)
    localStorage.removeItem("userProfile")
  }

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        isProfileComplete: !!userProfile,
        logout,
      }}
    >
      {isLoaded ? children : null}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
