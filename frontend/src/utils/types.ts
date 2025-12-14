export interface Sweet {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  category: string
  image: string
}

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}


export interface NavBarProps {
  user: User | null
  onLogout: () => void
}