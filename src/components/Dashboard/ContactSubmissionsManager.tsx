import React, { useState, useEffect } from 'react';
import { Mail, Eye, Trash2, Clock, CheckCircle, Reply, Filter, Search, ExternalLink } from 'lucide-react';
import { contactSubmissionsService } from '../../lib/database';
import type { ContactSubmission } from '../../lib/supabase';

const ContactSubmissionsManager: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0, replied: 0 });

  useEffect(() => {
    fetchSubmissions();
    fetchStats();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, statusFilter, searchTerm]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const data = await contactSubmissionsService.getAll();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await contactSubmissionsService.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const filterSubmissions = () => {
    let filtered = submissions;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(sub => 
        sub.name.toLowerCase().includes(term) ||
        sub.email.toLowerCase().includes(term) ||
        sub.subject.toLowerCase().includes(term) ||
        sub.message.toLowerCase().includes(term)
      );
    }

    setFilteredSubmissions(filtered);
  };

  const handleStatusChange = async (id: number, status: 'unread' | 'read' | 'replied') => {
    try {
      await contactSubmissionsService.updateStatus(id, status);
      await fetchSubmissions();
      await fetchStats();
      
      // Update selected submission if it's the one being changed
      if (selectedSubmission && selectedSubmission.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await contactSubmissionsService.delete(id);
        await fetchSubmissions();
        await fetchStats();
        if (selectedSubmission && selectedSubmission.id === id) {
          setSelectedSubmission(null);
        }
      } catch (error) {
        console.error('Error deleting submission:', error);
        alert('Error deleting submission. Please try again.');
      }
    }
  };

  const handleViewSubmission = async (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    
    // Mark as read if it's unread
    if (submission.status === 'unread') {
      await handleStatusChange(submission.id, 'read');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-500';
      case 'read': return 'bg-yellow-500';
      case 'replied': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread': return <Clock size={16} />;
      case 'read': return <Eye size={16} />;
      case 'replied': return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-800 rounded-lg p-4">
              <div className="h-4 bg-slate-700 rounded mb-2"></div>
              <div className="h-6 bg-slate-700 rounded"></div>
            </div>
          ))}
        </div>
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
      <div>
        <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
        <p className="text-slate-400 mt-1">Manage and respond to contact form submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Mail className="text-slate-400" size={24} />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Unread</p>
              <p className="text-2xl font-bold text-red-400">{stats.unread}</p>
            </div>
            <Clock className="text-red-400" size={24} />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Read</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.read}</p>
            </div>
            <Eye className="text-yellow-400" size={24} />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Replied</p>
              <p className="text-2xl font-bold text-green-400">{stats.replied}</p>
            </div>
            <CheckCircle className="text-green-400" size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 flex-1">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Submissions List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12 bg-slate-800 rounded-lg">
              <Mail className="mx-auto text-slate-400 mb-4" size={48} />
              <p className="text-slate-400">
                {submissions.length === 0 ? 'No submissions yet.' : 'No submissions match your filters.'}
              </p>
            </div>
          ) : (
            filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className={`bg-slate-800 rounded-lg p-4 border cursor-pointer transition-all hover:border-blue-500/50 ${
                  selectedSubmission?.id === submission.id ? 'border-blue-500' : 'border-slate-700'
                }`}
                onClick={() => handleViewSubmission(submission)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(submission.status)}`}></div>
                    <div>
                      <h3 className="font-semibold text-white">{submission.name}</h3>
                      <p className="text-sm text-slate-400">{submission.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${getStatusColor(submission.status)} text-white`}>
                      {getStatusIcon(submission.status)}
                      <span className="capitalize">{submission.status}</span>
                    </span>
                  </div>
                </div>
                <h4 className="font-medium text-white mb-2">{submission.subject}</h4>
                <p className="text-sm text-slate-300 line-clamp-2 mb-3">
                  {submission.message}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{formatDate(submission.created_at)}</span>
                  <span>Click to view details</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Submission Details */}
        <div className="lg:sticky lg:top-6">
          {selectedSubmission ? (
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedSubmission.name}</h3>
                  <p className="text-slate-400">{selectedSubmission.email}</p>
                </div>
                <div className="flex space-x-2">
                  <select
                    value={selectedSubmission.status}
                    onChange={(e) => handleStatusChange(selectedSubmission.id, e.target.value as any)}
                    className="px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:border-blue-500"
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                  <button
                    onClick={() => handleDelete(selectedSubmission.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition-colors"
                    title="Delete submission"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Subject</label>
                  <p className="text-white bg-slate-700 rounded p-3">{selectedSubmission.subject}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                  <div className="text-white bg-slate-700 rounded p-3 whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="block text-slate-300 mb-1">Submitted</label>
                    <p className="text-slate-400">{formatDate(selectedSubmission.created_at)}</p>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Status</label>
                    <span className={`px-2 py-1 rounded text-xs flex items-center space-x-1 w-fit ${getStatusColor(selectedSubmission.status)} text-white`}>
                      {getStatusIcon(selectedSubmission.status)}
                      <span className="capitalize">{selectedSubmission.status}</span>
                    </span>
                  </div>
                </div>

                {selectedSubmission.user_agent && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">User Agent</label>
                    <p className="text-xs text-slate-400 bg-slate-700 rounded p-2 break-all">
                      {selectedSubmission.user_agent}
                    </p>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <a
                    href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    onClick={() => handleStatusChange(selectedSubmission.id, 'replied')}
                  >
                    <Reply size={16} />
                    <span>Reply via Email</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
              <Mail className="mx-auto text-slate-400 mb-4" size={48} />
              <p className="text-slate-400">Select a submission to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSubmissionsManager;
