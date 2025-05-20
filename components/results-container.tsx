"use client"

import { useState, useEffect } from "react"
import { ArrowUpDown, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getMockLabData } from "@/lib/mock-data"
import type { Lab } from "@/lib/types"
import LabCard from "@/components/lab-card"

export default function ResultsContainer({
  test,
  location,
}: {
  test: string
  location: string
}) {
  const [labs, setLabs] = useState<Lab[]>([])
  const [filteredLabs, setFilteredLabs] = useState<Lab[]>([])
  const [sortOption, setSortOption] = useState("distance")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch data from an API
    // For demo purposes, we'll use mock data
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const data = getMockLabData(test, location)
        setLabs(data)
        setFilteredLabs(data)
      } catch (error) {
        console.error("Error fetching lab data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [test, location])

  const handleSort = (option: string) => {
    setSortOption(option)

    const sorted = [...filteredLabs].sort((a, b) => {
      switch (option) {
        case "price-asc":
          return a.testPrice - b.testPrice
        case "price-desc":
          return b.testPrice - a.testPrice
        case "rating":
          return b.rating - a.rating
        case "distance":
          return a.distance - b.distance
        default:
          return 0
      }
    })

    setFilteredLabs(sorted)
  }

  const handleFilter = (maxDistance: string) => {
    if (maxDistance === "all") {
      setFilteredLabs(labs)
    } else {
      const distance = Number.parseInt(maxDistance)
      const filtered = labs.filter((lab) => lab.distance <= distance)
      setFilteredLabs(filtered)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="w-full">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-6 bg-slate-200 rounded w-1/3 animate-pulse" />
                <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
                <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border border-slate-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <span className="font-medium text-slate-700">Filter by distance:</span>
              <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={handleFilter}>
                <TabsList className="bg-slate-100">
                  <TabsTrigger value="all" className="data-[state=active]:bg-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="5" className="data-[state=active]:bg-white">
                    Within 5 km
                  </TabsTrigger>
                  <TabsTrigger value="10" className="data-[state=active]:bg-white">
                    Within 10 km
                  </TabsTrigger>
                  <TabsTrigger value="20" className="data-[state=active]:bg-white">
                    Within 20 km
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-slate-500" />
              <span className="font-medium text-slate-700">Sort by:</span>
              <Select defaultValue="distance" onValueChange={handleSort}>
                <SelectTrigger className="w-[180px] bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance (Nearest)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  <SelectItem value="rating">Rating (Highest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredLabs.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-slate-600">No labs found matching your criteria. Try adjusting your filters.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredLabs.map((lab) => (
            <LabCard key={lab.id} lab={lab} testName={test} />
          ))}
        </div>
      )}
    </div>
  )
}
