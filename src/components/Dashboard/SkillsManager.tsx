import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Code,
  Zap
} from 'lucide-react'
import { skillsService } from '../../lib/database'
import type { Skill } from '../../lib/database'

const SkillsManager: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    category: '',
    level: 80,
    icon: ''
  })

  const categories = [
    'Frontend',
    'Backend', 
    'Database',
    'Tools & Platforms',
    'Design',
    'Mobile'
  ]

  const skillIcons = [
    'react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css',
    'nodejs', 'python', 'php', 'java', 'csharp', 'go', 'rust',
    'mongodb', 'postgresql', 'mysql', 'redis', 'firebase',
    'git', 'docker', 'aws', 'vercel', 'netlify', 'figma', 'photoshop'
  ]

  useEffect(() => {
    fetchSkills()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSkills = async () => {
    try {
      const data = await skillsService.getAll()
      setSkills(data)
    } catch (error) {
      console.error('Error fetching skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingSkill) {
        await skillsService.update(editingSkill.id!, formData)
      } else {
        await skillsService.create(formData as Omit<Skill, 'id' | 'created_at'>)
      }
      await fetchSkills()
      resetForm()
    } catch (error) {
      console.error('Error saving skill:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillsService.delete(id)
        await fetchSkills()
      } catch (error) {
        console.error('Error deleting skill:', error)
      }
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData(skill)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      level: 80,
      icon: ''
    })
    setEditingSkill(null)
    setShowForm(false)
  }

  const getSkillsByCategory = () => {
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    }, {} as Record<string, Skill[]>)
    return grouped
  }

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'bg-green-500'
    if (level >= 75) return 'bg-blue-500'
    if (level >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-custom"></div>
      </div>
    )
  }

  const skillsByCategory = getSkillsByCategory()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">
            Skills Management
          </h1>
          <p className="text-slate-400">
            Manage your technical skills and proficiency levels
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-gradient-custom text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200"
        >
          <Plus size={20} />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills by Category */}
      <div className="space-y-8">
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <div key={category} className="card p-6">
            <h2 className="text-xl font-heading font-semibold text-white mb-6 flex items-center">
              <Code size={20} className="mr-2 text-gradient-custom" />
              {category}
              <span className="ml-2 text-sm text-slate-400">({categorySkills.length})</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="bg-slate-800/50 p-4 rounded-lg hover-lift">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {skill.icon && (
                        <div className="w-8 h-8 bg-gradient-custom/20 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold bg-text-gradient">
                            {skill.icon.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <h3 className="font-medium text-white">{skill.name}</h3>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-1 bg-blue-600 hover:bg-blue-700 rounded transition-colors duration-200"
                      >
                        <Edit size={12} className="text-white" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id!)}
                        className="p-1 bg-red-600 hover:bg-red-700 rounded transition-colors duration-200"
                      >
                        <Trash2 size={12} className="text-white" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Proficiency</span>
                      <span className="text-white font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getSkillColor(skill.level)}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-white">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                  placeholder="e.g., React, Node.js, Python"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Proficiency Level: {formData.level}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Icon/Technology (Optional)
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                >
                  <option value="">Select Icon</option>
                  {skillIcons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon.charAt(0).toUpperCase() + icon.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-gradient-custom text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  <Save size={20} />
                  <span>{editingSkill ? 'Update' : 'Create'} Skill</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillsManager
