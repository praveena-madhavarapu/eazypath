"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { User, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/contexts/user-context"
import { SignInDialog } from "@/components/sign-in-dialog"

export default function Header() {
  const { userProfile, logout, isProfileComplete } = useUser()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signInDialogOpen, setSignInDialogOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="h-8 w-8 rounded-md bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold mr-2">
                  E
                </div>
                <span className="text-xl font-bold text-slate-900">EazyPath</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className={`text-sm font-medium ${isActive("/") ? "text-teal-600" : "text-slate-700 hover:text-teal-600"}`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium ${isActive("/about") ? "text-teal-600" : "text-slate-700 hover:text-teal-600"}`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium ${isActive("/contact") ? "text-teal-600" : "text-slate-700 hover:text-teal-600"}`}
              >
                Contact
              </Link>

              {isProfileComplete ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{userProfile?.name.split(" ")[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="p-2">
                      <p className="font-medium">{userProfile?.name}</p>
                      <p className="text-sm text-slate-500">{userProfile?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile/edit">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/bookings">My Bookings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="default"
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() => setSignInDialogOpen(true)}
                >
                  Sign In
                </Button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-100">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className={`px-2 py-1 rounded-md ${isActive("/") ? "bg-slate-100 text-teal-600" : "text-slate-700"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`px-2 py-1 rounded-md ${isActive("/about") ? "bg-slate-100 text-teal-600" : "text-slate-700"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`px-2 py-1 rounded-md ${isActive("/contact") ? "bg-slate-100 text-teal-600" : "text-slate-700"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>

                {isProfileComplete ? (
                  <div className="border-t border-slate-100 pt-4 mt-2">
                    <div className="px-2 mb-2">
                      <p className="font-medium">{userProfile?.name}</p>
                      <p className="text-sm text-slate-500">{userProfile?.email}</p>
                    </div>
                    <Link
                      href="/profile/edit"
                      className="px-2 py-1 rounded-md block text-slate-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Edit Profile
                    </Link>
                    <Link
                      href="/bookings"
                      className="px-2 py-1 rounded-md block text-slate-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="px-2 py-1 rounded-md flex items-center text-red-600 w-full mt-2"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Button
                    variant="default"
                    className="bg-teal-600 hover:bg-teal-700 w-full"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setSignInDialogOpen(true)
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <SignInDialog open={signInDialogOpen} onOpenChange={setSignInDialogOpen} />
    </>
  )
}
