import { supabase } from './supabase'
import type { Project, Testimonial, Skill, PersonalInfo } from './supabase'

// Re-export types for easier importing
export type { Project, Testimonial, Skill, PersonalInfo }

// Projects CRUD operations
export const projectsService = {
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getById(id: number): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(project: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: number, project: Partial<Project>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Testimonials CRUD operations
export const testimonialsService = {
  async getAll(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async create(testimonial: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial> {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonial])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: number, testimonial: Partial<Testimonial>): Promise<Testimonial> {
    const { data, error } = await supabase
      .from('testimonials')
      .update(testimonial)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Skills CRUD operations
export const skillsService = {
  async getAll(): Promise<Skill[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async create(skill: Omit<Skill, 'id' | 'created_at'>): Promise<Skill> {
    const { data, error } = await supabase
      .from('skills')
      .insert([skill])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: number, skill: Partial<Skill>): Promise<Skill> {
    const { data, error } = await supabase
      .from('skills')
      .update(skill)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Personal Info operations
export const personalInfoService = {
  async get(): Promise<PersonalInfo | null> {
    const { data, error } = await supabase
      .from('personal_info')
      .select('*')
      .limit(1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async update(info: Partial<PersonalInfo>): Promise<PersonalInfo> {
    // First try to update existing record
    const existing = await this.get()
    
    if (existing) {
      const { data, error } = await supabase
        .from('personal_info')
        .update(info)
        .eq('id', existing.id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } else {
      // Create new record if none exists
      const { data, error } = await supabase
        .from('personal_info')
        .insert([info])
        .select()
        .single()
      
      if (error) throw error
      return data
    }
  }
}
