import React, { useState, useEffect } from 'react'
import { 
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  FileText
} from 'lucide-react'
import { personalInfoService } from '../../lib/database'
import type { PersonalInfo } from '../../lib/database'

const PersonalInfoManager: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<PersonalInfo>>({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    twitter: '',
    resume_url: ''
  })

  useEffect(() => {
    fetchPersonalInfo()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPersonalInfo = async () => {
    try {
      const data = await personalInfoService.get()
      if (data) {
        setFormData(data)
      }
    } catch (error) {
      console.error('Error fetching personal info:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await personalInfoService.update(formData)
      alert('Personal information updated successfully!')
    } catch (error) {
      console.error('Error saving personal info:', error)
      alert('Error saving personal information. Please try again.')
    } finally {
      setSaving(false)
    }
  }

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
          Personal Information
        </h1>
        <p className="text-slate-400">
          Update your personal details and contact information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="card p-6">
          <h2 className="text-xl font-heading font-semibold text-white mb-6 flex items-center">
            <User size={20} className="mr-2 text-gradient-custom" />
            Basic Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Professional Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                placeholder="e.g., Front-End Developer"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Bio/About
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
              placeholder="Write a brief description about yourself..."
              required
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="card p-6">
          <h2 className="text-xl font-heading font-semibold text-white mb-6 flex items-center">
            <Mail size={20} className="mr-2 text-gradient-custom" />
            Contact Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="card p-6">
          <h2 className="text-xl font-heading font-semibold text-white mb-6 flex items-center">
            <Github size={20} className="mr-2 text-gradient-custom" />
            Social Media & Links
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                GitHub Profile
              </label>
              <div className="relative">
                <Github size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                  placeholder="https://github.com/yourusername"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                LinkedIn Profile
              </label>
              <div className="relative">
                <Linkedin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Twitter Profile
              </label>
              <div className="relative">
                <Twitter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Resume/CV URL
              </label>
              <div className="relative">
                <FileText size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={formData.resume_url}
                  onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                  placeholder="https://example.com/your-resume.pdf"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 bg-gradient-custom text-black px-6 py-3 rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
          >
            <Save size={20} />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonalInfoManager
