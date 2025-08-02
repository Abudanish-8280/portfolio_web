import React, { useState, useEffect } from 'react'
import { 
  Home, 
  FolderOpen, 
  MessageSquare, 
  Code, 
  User, 
  Settings,
  Menu,
  X,
  ExternalLink,
  Bell,
  Search
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState(3)

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

  // Simulate notification updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notifications > 0) {
        setNotifications(prev => Math.max(0, prev - 1))
      }
    }, 10000) // Reduce notifications every 10 seconds
    
    return () => clearTimeout(timer)
  }, [notifications])

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'personal', label: 'Personal Info', icon: User },
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
                  w-full flex items-center px-6 py-3 text-left transition-colors duration-200
                  ${activeTab === item.id
                    ? 'bg-blue-600 text-white border-r-4 border-blue-400'
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
              <Search size={18} className="absolute left-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search dashboard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Portfolio Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <ExternalLink size={16} />
              <span>View Portfolio</span>
            </a>
            
            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-slate-300">Welcome back,</p>
                <p className="text-sm font-medium text-white">MD Abudanish</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">MA</span>
              </div>
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
