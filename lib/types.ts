export interface Lab {
  id: string
  name: string
  address: string
  distance: number
  rating: number
  reviewCount: number
  testPrice: number
  openingHours: string
  phone: string
  logoUrl?: string
  accreditations: string[]
  services: string[]
}
