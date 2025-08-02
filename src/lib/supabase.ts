import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project credentials
const supabaseUrl = 'https://ydaheivkvwthdrhiphvz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkYWhlaXZrdnd0aGRyaGlwaHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTIzNTcsImV4cCI6MjA2OTY4ODM1N30._49SeVf-iPNWwdLMyy4Y3IRTt9WXn6CkOItx7TPqEnk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Project {
  id?: number
  title: string
  description: string
  image: string
  live_url: string
  github_url: string
  technologies: string[]
  category: string
  featured: boolean
  created_at?: string
}

export interface Testimonial {
  id?: number
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  project: string
  created_at?: string
}

export interface Skill {
  id?: number
  name: string
  category: string
  level: number
  icon?: string
  created_at?: string
}

export interface PersonalInfo {
  id?: number
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  twitter: string
  resume_url: string
  created_at?: string
}
