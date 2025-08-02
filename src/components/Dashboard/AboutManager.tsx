import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Code, Palette, Zap, Smartphone, Layers, Target } from 'lucide-react';
import { aboutFeaturesService } from '../../lib/database';
import type { AboutFeature } from '../../lib/supabase';

const AboutManager: React.FC = () => {
  const [features, setFeatures] = useState<AboutFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Code',
    order_index: 0,
    active: true
  });

  // Icon mapping for display
  const iconMap: { [key: string]: React.ReactNode } = {
    Code: <Code size={20} />,
    Palette: <Palette size={20} />,
    Zap: <Zap size={20} />,
    Smartphone: <Smartphone size={20} />,
    Layers: <Layers size={20} />,
    Target: <Target size={20} />
  };

  const iconOptions = ['Code', 'Palette', 'Zap', 'Smartphone', 'Layers', 'Target'];

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const data = await aboutFeaturesService.getAll();
      setFeatures(data);
    } catch (error) {
      console.error('Error fetching about features:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              name === 'order_index' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await aboutFeaturesService.update(editingId, formData);
      } else {
        await aboutFeaturesService.create(formData);
      }
      await fetchFeatures();
      resetForm();
    } catch (error) {
      console.error('Error saving about feature:', error);
      alert('Error saving feature. Please try again.');
    }
  };

  const handleEdit = (feature: AboutFeature) => {
    setFormData({
      title: feature.title,
      description: feature.description,
      icon: feature.icon,
      order_index: feature.order_index,
      active: feature.active
    });
    setEditingId(feature.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      try {
        await aboutFeaturesService.delete(id);
        await fetchFeatures();
      } catch (error) {
        console.error('Error deleting about feature:', error);
        alert('Error deleting feature. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Code',
      order_index: 0,
      active: true
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-800 rounded-lg p-6">
            <div className="h-4 bg-slate-700 rounded mb-2"></div>
            <div className="h-3 bg-slate-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">About Me Features</h2>
          <p className="text-slate-400 mt-1">Manage the feature cards displayed in your About section</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Feature</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              {editingId ? 'Edit Feature' : 'Add New Feature'}
            </h3>
            <button
              onClick={resetForm}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Feature title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Icon
                </label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                placeholder="Feature description"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Order Index
                </label>
                <input
                  type="number"
                  name="order_index"
                  value={formData.order_index}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2 text-white">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                    className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500/20"
                  />
                  <span>Active</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save size={16} />
                <span>{editingId ? 'Update' : 'Create'} Feature</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Features List */}
      <div className="space-y-4">
        {features.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg">
            <p className="text-slate-400">No features found. Add your first feature to get started.</p>
          </div>
        ) : (
          features.map((feature) => (
            <div
              key={feature.id}
              className={`bg-slate-800 rounded-lg p-6 border ${
                feature.active ? 'border-slate-700' : 'border-slate-600 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-blue-400 mt-1">
                    {iconMap[feature.icon] || <Code size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                      {!feature.active && (
                        <span className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded">
                          Inactive
                        </span>
                      )}
                      <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                        Order: {feature.order_index}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(feature)}
                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Edit feature"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(feature.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Delete feature"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AboutManager;
