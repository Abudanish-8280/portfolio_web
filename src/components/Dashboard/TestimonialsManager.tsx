import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star,
  Save,
  X,
  User
} from 'lucide-react'
import { testimonialsService } from '../../lib/database'
import type { Testimonial } from '../../lib/database'

const TestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    company: '',
    avatar: '',
    content: '',
    rating: 5,
    project: ''
  })

  useEffect(() => {
    fetchTestimonials()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialsService.getAll()
      setTestimonials(data)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingTestimonial) {
        await testimonialsService.update(editingTestimonial.id!, formData)
      } else {
        await testimonialsService.create(formData as Omit<Testimonial, 'id' | 'created_at'>)
      }
      await fetchTestimonials()
      resetForm()
    } catch (error) {
      console.error('Error saving testimonial:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await testimonialsService.delete(id)
        await fetchTestimonials()
      } catch (error) {
        console.error('Error deleting testimonial:', error)
      }
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData(testimonial)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      company: '',
      avatar: '',
      content: '',
      rating: 5,
      project: ''
    })
    setEditingTestimonial(null)
    setShowForm(false)
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
            Testimonials Management
          </h1>
          <p className="text-slate-400">
            Manage client testimonials and feedback for your portfolio
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-gradient-custom text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200"
        >
          <Plus size={20} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="card p-6 hover-lift">
            {/* Rating */}
            <div className="flex justify-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={16} className="bg-text-gradient fill-current mx-0.5" />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-slate-300 text-center mb-6 leading-relaxed italic">
              "{testimonial.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gradient-custom/30"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=random`
                }}
              />
              <div className="text-center">
                <h4 className="text-base font-heading font-semibold text-white">
                  {testimonial.name}
                </h4>
                <p className="text-muted text-xs">{testimonial.role}</p>
                <p className="bg-text-gradient text-xs font-medium">{testimonial.company}</p>
              </div>
            </div>

            {/* Project Tag */}
            <div className="text-center mb-4">
              <span className="px-3 py-1 bg-gradient-custom/10 bg-text-gradient rounded-lg text-xs font-medium">
                {testimonial.project}
              </span>
            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => handleEdit(testimonial)}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                <Edit size={16} className="text-white" />
              </button>
              <button
                onClick={() => handleDelete(testimonial.id!)}
                className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
              >
                <Trash2 size={16} className="text-white" />
              </button>
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
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Role/Position
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                  placeholder="https://example.com/avatar.jpg (optional)"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Leave empty to use auto-generated avatar
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        (formData.rating || 5) >= rating
                          ? 'text-yellow-400'
                          : 'text-slate-600 hover:text-slate-400'
                      }`}
                    >
                      <Star size={20} className={(formData.rating || 5) >= rating ? 'fill-current' : ''} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Testimonial Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gradient-custom"
                  placeholder="Write the client's testimonial here..."
                  required
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-gradient-custom text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  <Save size={20} />
                  <span>{editingTestimonial ? 'Update' : 'Create'} Testimonial</span>
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

export default TestimonialsManager
