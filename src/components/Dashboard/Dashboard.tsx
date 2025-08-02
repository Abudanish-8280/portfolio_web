import React, { useState } from 'react'
import DashboardLayout from './DashboardLayout'
import Overview from './Overview'
import ProjectsManager from './ProjectsManager'
import TestimonialsManager from './TestimonialsManager'
import SkillsManager from './SkillsManager'
import PersonalInfoManager from './PersonalInfoManager'

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />
      case 'projects':
        return <ProjectsManager />
      case 'testimonials':
        return <TestimonialsManager />
      case 'skills':
        return <SkillsManager />
      case 'personal':
        return <PersonalInfoManager />
      case 'settings':
        return <Settings />
      default:
        return <Overview />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}

// Settings Component
const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">
          Settings
        </h1>
        <p className="text-slate-400">
          Configure your dashboard and portfolio settings
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Database Configuration */}
        <div className="card p-6">
          <h2 className="text-xl font-heading font-semibold text-white mb-4">
            Database Configuration
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Supabase URL
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                placeholder="https://your-project.supabase.co"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Supabase Anon Key
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                placeholder="Your Supabase anonymous key"
              />
            </div>
            <button className="bg-gradient-custom text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200">
              Test Connection
            </button>
          </div>
        </div>

        {/* Portfolio Settings */}
        <div className="card p-6">
          <h2 className="text-xl font-heading font-semibold text-white mb-4">
            Portfolio Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Auto-sync with portfolio</p>
                <p className="text-sm text-slate-400">Automatically update portfolio when data changes</p>
              </div>
              <input
                type="checkbox"
                className="w-4 h-4 text-gradient-custom bg-slate-700 border-slate-600 rounded focus:ring-gradient-custom"
                defaultChecked
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enable analytics</p>
                <p className="text-sm text-slate-400">Track portfolio views and interactions</p>
              </div>
              <input
                type="checkbox"
                className="w-4 h-4 text-gradient-custom bg-slate-700 border-slate-600 rounded focus:ring-gradient-custom"
                defaultChecked
              />
            </div>
          </div>
        </div>

        {/* Backup & Export */}
        <div className="card p-6">
          <h2 className="text-xl font-heading font-semibold text-white mb-4">
            Backup & Export
          </h2>
          <div className="space-y-4">
            <button className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors duration-200">
              Export All Data (JSON)
            </button>
            <button className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors duration-200">
              Import Data from File
            </button>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Create Backup
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card p-6 border border-red-500/20">
          <h2 className="text-xl font-heading font-semibold text-red-400 mb-4">
            Danger Zone
          </h2>
          <div className="space-y-4">
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
              Clear All Data
            </button>
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
              Reset Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
