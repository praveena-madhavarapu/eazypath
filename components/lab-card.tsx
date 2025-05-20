import { Star, MapPin, DollarSign, Clock, ExternalLink, Phone, Shield, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Lab } from "@/lib/types"

export default function LabCard({
  lab,
  testName,
}: {
  lab: Lab
  testName: string
}) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border border-slate-200">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 bg-gradient-to-b from-slate-50 to-slate-100 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
                <img
                  src={lab.logoUrl || `/placeholder.svg?height=64&width=64`}
                  alt={`${lab.name} logo`}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
                <Star className="fill-amber-500 h-4 w-4" />
                <span className="font-medium">{lab.rating.toFixed(1)}</span>
                <span className="text-slate-500 text-sm">({lab.reviewCount})</span>
              </div>

              {lab.rating >= 4.5 && (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  <Award className="h-3 w-3 mr-1" /> Top Rated
                </Badge>
              )}
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-slate-900">{lab.name}</h3>
                  {lab.accreditations.includes("NABL") && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Shield className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center text-slate-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                  <span className="text-sm">{lab.address}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {lab.accreditations.map((accreditation, index) => (
                    <Badge key={index} variant="outline" className="bg-slate-50 text-slate-700">
                      {accreditation}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-slate-400" />
                    <span>{lab.openingHours}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-slate-400" />
                    <span>{lab.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 mb-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">${lab.testPrice}</span>
                  </div>
                  <p className="text-sm text-slate-500">for {testName}</p>

                  {lab.testPrice < 50 && (
                    <Badge className="mt-1 bg-green-100 hover:bg-green-100 text-green-800 border-0">Best Value</Badge>
                  )}
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full md:w-auto">
                  <div className="flex items-center text-slate-500 justify-end">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{lab.distance} km away</span>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Book Appointment
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
