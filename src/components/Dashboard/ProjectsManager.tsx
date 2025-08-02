import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Github,
  Save,
  X,
  Image as ImageIcon
} from 'lucide-react'
import { projectsService } from '../../lib/database'
import type { Project } from '../../lib/database'

const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    image: '',
    live_url: '',
    github_url: '',
    technologies: [],
    category: '',
    featured: false
  })

  const categories = ['All', 'Shopify', 'WordPress', 'WooCommerce', 'Angular', 'React']
  const techOptions = [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'MongoDB',
    'PostgreSQL', 'Tailwind CSS', 'SCSS', 'Shopify', 'WordPress', 'WooCommerce',
    'Angular', 'Vue.js', 'Next.js', 'Nuxt.js', 'Firebase', 'Supabase'
  ]

  useEffect(() => {
    fetchProjects()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProjects = async () => {
    try {
      const data = await projectsService.getAll()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingProject) {
        await projectsService.update(editingProject.id!, formData)
      } else {
        await projectsService.create(formData as Omit<Project, 'id' | 'created_at'>)
      }
      await fetchProjects()
      resetForm()
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsService.delete(id)
        await fetchProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData(project)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      live_url: '',
      github_url: '',
      technologies: [],
      category: '',
      featured: false
    })
    setEditingProject(null)
    setShowForm(false)
  }

  const handleTechToggle = (tech: string) => {
    const currentTech = formData.technologies || []
    if (currentTech.includes(tech)) {
      setFormData({
        ...formData,
        technologies: currentTech.filter(t => t !== tech)
      })
    } else {
      setFormData({
        ...formData,
        technologies: [...currentTech, tech]
      })
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">
            Projects Management
          </h1>
          <p className="text-slate-400">
            Manage your portfolio projects and showcase your work
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-gradient-custom text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200"
        >
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="card p-6 hover-lift">
            <div className="relative mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              {project.featured && (
                <div className="absolute top-2 right-2 bg-gradient-custom text-black px-2 py-1 rounded text-xs font-medium">
                  Featured
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-heading font-semibold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-slate-700 text-xs text-slate-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-slate-700 text-xs text-slate-300 rounded">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex space-x-2">
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200"
                  >
                    <ExternalLink size={16} className="text-slate-300" />
                  </a>
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200"
                  >
                    <Github size={16} className="text-slate-300" />
                  </a>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                  >
                    <Edit size={16} className="text-white" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id!)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
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
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
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
                    {categories.filter(cat => cat !== 'All').map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Technologies
                </label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {techOptions.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => handleTechToggle(tech)}
                      className={`px-3 py-2 text-xs rounded-lg transition-colors duration-200 ${
                        formData.technologies?.includes(tech)
                          ? 'bg-gradient-custom text-black'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-gradient-custom bg-slate-700 border-slate-600 rounded focus:ring-gradient-custom"
                />
                <label htmlFor="featured" className="text-sm text-slate-300">
                  Featured Project
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-gradient-custom text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  <Save size={20} />
                  <span>{editingProject ? 'Update' : 'Create'} Project</span>
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

export default ProjectsManager
