import React, { useState, useEffect } from 'react'
import {
  Menu,
  X,
  Home,
  FolderOpen,
  MessageSquare,
  Code,
  User,
  Settings,
  Search,
  Bell,
  ExternalLink,
  Command,
  Info,
  Mail,
  LogOut
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { contactSubmissionsService } from '../../lib/database'

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

interface SearchSuggestion {
  title: string
  type: string
  action: () => void
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState(0)
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { user, signOut } = useAuth()

  // Handle keyboard shortcuts and responsive behavior
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        const searchInput = document.querySelector('input[placeholder="Search dashboard..."]') as HTMLInputElement
        searchInput?.focus()
      }
      // Escape to close sidebar on mobile
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen])

  // Fetch real notifications from contact submissions
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const stats = await contactSubmissionsService.getStats()
        setNotifications(stats.unread)
      } catch (error) {
        console.error('Error fetching notifications:', error)
        setNotifications(0)
      }
    }

    fetchNotifications()
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000)
    
    return () => clearInterval(interval)
  }, [])

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.length > 0) {
      const suggestions: SearchSuggestion[] = []
      
      // Add tab suggestions
      const tabs = [
        { id: 'overview', label: 'Dashboard Overview', keywords: ['overview', 'dashboard', 'stats', 'summary'] },
        { id: 'projects', label: 'Projects Manager', keywords: ['projects', 'portfolio', 'work', 'showcase'] },
        { id: 'testimonials', label: 'Testimonials', keywords: ['testimonials', 'reviews', 'feedback', 'clients'] },
        { id: 'skills', label: 'Skills Manager', keywords: ['skills', 'technologies', 'expertise', 'tech stack'] },
        { id: 'personal', label: 'Personal Info', keywords: ['personal', 'profile', 'bio', 'information'] },
        { id: 'about', label: 'About Me Manager', keywords: ['about', 'features', 'highlights'] },
        { id: 'contact', label: 'Contact Submissions', keywords: ['contact', 'messages', 'inbox', 'submissions'] },
        { id: 'settings', label: 'Settings', keywords: ['settings', 'configuration', 'preferences'] }
      ]
      
      const query = searchQuery.toLowerCase()
      tabs.forEach(tab => {
        if (tab.label.toLowerCase().includes(query) || 
            tab.keywords.some(keyword => keyword.includes(query))) {
          suggestions.push({
            title: tab.label,
            type: 'Navigate to',
            action: () => {
              onTabChange(tab.id)
              setSearchQuery('')
              setShowSuggestions(false)
            }
          })
        }
      })
      
      // Add quick action suggestions
      if (query.includes('add') || query.includes('create') || query.includes('new')) {
        suggestions.push(
          {
            title: 'Add New Project',
            type: 'Quick Action',
            action: () => {
              onTabChange('projects')
              setSearchQuery('')
              setShowSuggestions(false)
            }
          },
          {
            title: 'Add New Testimonial',
            type: 'Quick Action',
            action: () => {
              onTabChange('testimonials')
              setSearchQuery('')
              setShowSuggestions(false)
            }
          }
        )
      }
      
      setSearchSuggestions(suggestions.slice(0, 5)) // Limit to 5 suggestions
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
      setSearchSuggestions([])
    }
  }, [searchQuery, onTabChange])

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'about', label: 'About Me', icon: Info },
    { id: 'contact', label: 'Contact Submissions', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform transition-transform duration-300 ease-in-out flex-shrink-0 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <h1 className="text-xl font-heading font-bold bg-text-gradient">
            Portfolio Dashboard
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 mt-8 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id)
                  setSidebarOpen(false)
                }}
                className={`
                  w-full flex items-center px-6 py-3 text-left transition-colors duration-200 outline-none focus:outline-none
                  ${activeTab === item.id
                    ? 'bg-gradient-custom'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }
                `}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="p-6 border-t border-slate-700">
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="text-sm text-slate-400 mb-2">Portfolio Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">Live & Updated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Enhanced Top bar */}
        <div className="bg-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative">
              <Search size={18} className="absolute left-3 text-slate-400 z-10" />
              <input
                type="text"
                placeholder="Search dashboard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-64 px-4 py-2 pl-10 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              
              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={suggestion.action}
                      className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">{suggestion.title}</span>
                        <span className="text-slate-400 text-xs">{suggestion.type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            
            {/* View Portfolio Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">View Portfolio</span>
            </a>
            
            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-2 bg-slate-700 rounded-lg">
                <div className="w-8 h-8 bg-gradient-custom rounded-full flex items-center justify-center">
                  <User size={16} className="" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-white text-sm font-medium">{user?.email?.split('@')[0] || 'Admin'}</p>
                  <p className="text-slate-400 text-xs">Portfolio Manager</p>
                </div>
              </div>
              
              <button
                onClick={signOut}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
