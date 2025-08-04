import React, { useState, useEffect } from 'react'
import { 
  FolderOpen, 
  MessageSquare, 
  Code, 
  TrendingUp,
  Eye,
  Calendar,
  Activity
} from 'lucide-react'
import { projectsService, testimonialsService, skillsService } from '../../lib/database'


interface Stats {
  projects: number
  testimonials: number
  skills: number
  portfolioViews: number
  lastUpdated: string
}

interface ActivityItem {
  id: string
  action: string
  item: string
  time: string
  type: 'project' | 'testimonial' | 'skill' | 'profile' | 'contact'
  created_at: string
}

interface OverviewProps {
  onTabChange?: (tab: string) => void
}

const Overview: React.FC<OverviewProps> = ({ onTabChange }) => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    testimonials: 0,
    skills: 0,
    portfolioViews: 0,
    lastUpdated: new Date().toLocaleDateString()
  })
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, testimonials, skills] = await Promise.all([
          projectsService.getAll(),
          testimonialsService.getAll(),
          skillsService.getAll()
        ])

        // Get portfolio views from analytics (mock for now, can be replaced with real analytics)
        const portfolioViews = Math.floor(Math.random() * 5000) + 1000 // Mock data

        setStats({
          projects: projects.length,
          testimonials: testimonials.length,
          skills: skills.length,
          portfolioViews,
          lastUpdated: new Date().toLocaleDateString()
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    const fetchRecentActivity = async () => {
      try {
        // Fetch recent activities from multiple sources
        const activities: ActivityItem[] = []
        
        // Get recent projects
        const projects = await projectsService.getAll()
        const recentProjects = projects
          .filter(p => p.created_at)
          .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
          .slice(0, 2)
        
        recentProjects.forEach(project => {
          if (project.created_at) {
            activities.push({
              id: `project-${project.id}`,
              action: 'Updated project',
              item: project.title,
              time: getRelativeTime(project.created_at),
              type: 'project',
              created_at: project.created_at
            })
          }
        })

        // Get recent testimonials
        const testimonials = await testimonialsService.getAll()
        const recentTestimonials = testimonials
          .filter(t => t.created_at)
          .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
          .slice(0, 1)
        
        recentTestimonials.forEach(testimonial => {
          if (testimonial.created_at) {
            activities.push({
              id: `testimonial-${testimonial.id}`,
              action: 'New testimonial',
              item: `From ${testimonial.name}`,
              time: getRelativeTime(testimonial.created_at),
              type: 'testimonial',
              created_at: testimonial.created_at
            })
          }
        })

        // Get recent skills
        const skills = await skillsService.getAll()
        const recentSkills = skills
          .filter(s => s.created_at)
          .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
          .slice(0, 1)
        
        recentSkills.forEach(skill => {
          if (skill.created_at) {
            activities.push({
              id: `skill-${skill.id}`,
              action: 'Skill updated',
              item: `${skill.name} proficiency`,
              time: getRelativeTime(skill.created_at),
              type: 'skill',
              created_at: skill.created_at
            })
          }
        })

        // Sort all activities by date and take top 4
        const sortedActivities = activities
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 4)

        setRecentActivity(sortedActivities)
      } catch (error) {
        console.error('Error fetching recent activity:', error)
        // Fallback to empty array
        setRecentActivity([])
      }
    }

    fetchStats()
    fetchRecentActivity()
  }, [])

  const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} day${days > 1 ? 's' : ''} ago`
    }
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      icon: MessageSquare,
      color: 'bg-green-500',
      change: '+1 this week'
    },
    {
      title: 'Skills',
      value: stats.skills,
      icon: Code,
      color: 'bg-purple-500',
      change: '+3 updated'
    },
    {
      title: 'Portfolio Views',
      value: stats.portfolioViews >= 1000 ? `${(stats.portfolioViews / 1000).toFixed(1)}k` : stats.portfolioViews.toString(),
      icon: Eye,
      color: 'bg-orange-500',
      change: '+12% this month'
    }
  ]



  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-custom"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-slate-400">
          Manage your portfolio content and track performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card p-6 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}/20`}>
                  <Icon size={24} className={`${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <TrendingUp size={16} className="text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400 mb-2">{stat.title}</p>
                <p className="text-xs text-green-400">{stat.change}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold text-white">
              Recent Activity
            </h2>
            <Activity size={20} className="text-slate-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-slate-800/50 rounded-lg">
                <div className="w-2 h-2 bg-gradient-custom rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.action}</span> {activity.item}
                  </p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold text-white">
              Quick Actions
            </h2>
            <Calendar size={20} className="text-slate-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onTabChange?.('projects')}
              className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 hover:scale-105 transition-all duration-200 text-left group"
            >
              <FolderOpen size={20} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-white">Add Project</p>
              <p className="text-xs text-slate-400">Create new portfolio item</p>
            </button>
            <button 
              onClick={() => onTabChange?.('testimonials')}
              className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 hover:scale-105 transition-all duration-200 text-left group"
            >
              <MessageSquare size={20} className="text-green-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-white">Add Testimonial</p>
              <p className="text-xs text-slate-400">New client feedback</p>
            </button>
            <button 
              onClick={() => onTabChange?.('skills')}
              className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 hover:scale-105 transition-all duration-200 text-left group"
            >
              <Code size={20} className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-white">Update Skills</p>
              <p className="text-xs text-slate-400">Manage tech stack</p>
            </button>
            <button 
              onClick={() => window.open('/', '_blank')}
              className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 hover:scale-105 transition-all duration-200 text-left group"
            >
              <Eye size={20} className="text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-white">View Portfolio</p>
              <p className="text-xs text-slate-400">See live site</p>
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Health */}
      <div className="card p-6">
        <h2 className="text-xl font-heading font-semibold text-white mb-6">
          Portfolio Health
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-white">Content Complete</p>
            <p className="text-xs text-slate-400">All sections filled</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-white">SEO Optimized</p>
            <p className="text-xs text-slate-400">Meta tags updated</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-white">Performance</p>
            <p className="text-xs text-slate-400">Fast loading</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
