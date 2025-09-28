import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour les pronostics
export type Pronostic = {
  id: number
  sport: 'FOOTBALL' | 'TENNIS' | 'BASKET'
  teamA: string
  teamB: string
  odds: number
  prediction: string
  result: 'PENDING' | 'WON' | 'LOST'
  visibleTo: 'FREE' | 'BASIC' | 'PREMIUM'
  createdAt: string
  updatedAt: string
}
