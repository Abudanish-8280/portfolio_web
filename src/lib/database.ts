import { supabase } from './supabase'
import type { Project, Testimonial, Skill, PersonalInfo, AboutFeature, ContactInfo, ContactSubmission } from './supabase'

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

// About Features CRUD operations
export const aboutFeaturesService = {
  async getAll(): Promise<AboutFeature[]> {
    const { data, error } = await supabase
      .from('about_features')
      .select('*')
      .eq('active', true)
      .order('order_index', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async create(aboutFeature: Omit<AboutFeature, 'id' | 'created_at' | 'updated_at'>): Promise<AboutFeature> {
    const { data, error } = await supabase
      .from('about_features')
      .insert([aboutFeature])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: number, updates: Partial<Omit<AboutFeature, 'id' | 'created_at' | 'updated_at'>>): Promise<AboutFeature> {
    const { data, error } = await supabase
      .from('about_features')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating about feature:', error)
      throw error
    }
    
    return data
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('about_features')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting about feature:', error)
      throw error
    }
  }
}

// Contact Info CRUD operations
export const contactInfoService = {
  async getAll(): Promise<ContactInfo[]> {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .eq('active', true)
      .order('type', { ascending: true })
      .order('order_index', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  async getByType(type: 'contact' | 'social'): Promise<ContactInfo[]> {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .eq('type', type)
      .eq('active', true)
      .order('order_index', { ascending: true })
    
    if (error) {
      console.error('Error fetching contact info by type:', error)
      throw error
    }
    
    return data || []
  },

  async create(contactInfo: Omit<ContactInfo, 'id' | 'created_at' | 'updated_at'>): Promise<ContactInfo> {
    const { data, error } = await supabase
      .from('contact_info')
      .insert([contactInfo])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating contact info:', error)
      throw error
    }
    
    return data
  },

  async update(id: number, updates: Partial<Omit<ContactInfo, 'id' | 'created_at' | 'updated_at'>>): Promise<ContactInfo> {
    const { data, error } = await supabase
      .from('contact_info')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating contact info:', error)
      throw error
    }
    
    return data
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('contact_info')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting contact info:', error)
      throw error
    }
  }
}

// Contact Submissions Service
export const contactSubmissionsService = {
  async getAll(): Promise<ContactSubmission[]> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching contact submissions:', error)
      throw error
    }
    
    return data || []
  },

  async getById(id: number): Promise<ContactSubmission | null> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching contact submission:', error)
      throw error
    }
    
    return data
  },

  async getByStatus(status: 'unread' | 'read' | 'replied'): Promise<ContactSubmission[]> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching contact submissions by status:', error)
      throw error
    }
    
    return data || []
  },

  async create(submission: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>): Promise<ContactSubmission> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([submission])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating contact submission:', error)
      throw error
    }
    
    return data
  },

  async updateStatus(id: number, status: 'unread' | 'read' | 'replied'): Promise<ContactSubmission> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating contact submission status:', error)
      throw error
    }
    
    return data
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting contact submission:', error)
      throw error
    }
  },

  async getStats(): Promise<{ total: number; unread: number; read: number; replied: number }> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('status')
    
    if (error) {
      console.error('Error fetching contact submission stats:', error)
      throw error
    }
    
    const stats = {
      total: data?.length || 0,
      unread: data?.filter(s => s.status === 'unread').length || 0,
      read: data?.filter(s => s.status === 'read').length || 0,
      replied: data?.filter(s => s.status === 'replied').length || 0
    }
    
    return stats
  }
}
