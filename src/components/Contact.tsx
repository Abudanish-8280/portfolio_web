import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { contactInfoService, contactSubmissionsService } from '../lib/database';
import type { ContactInfo as ContactInfoType } from '../lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfoType[]>([]);
  const [socialLinks, setSocialLinks] = useState<ContactInfoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Icon mapping for dynamic icons
  const iconMap: { [key: string]: React.ReactNode } = {
    Mail: <Mail size={24} />,
    Phone: <Phone size={24} />,
    MapPin: <MapPin size={24} />,
    Github: <Github size={24} />,
    Linkedin: <Linkedin size={24} />,
    Twitter: <Twitter size={24} />,
    Instagram: <Instagram size={24} />
  };

  // Fetch contact data from database
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);
        const [contactData, socialData] = await Promise.all([
          contactInfoService.getByType('contact'),
          contactInfoService.getByType('social')
        ]);
        setContactInfo(contactData);
        setSocialLinks(socialData);
        setError(null);
      } catch (err) {
        console.error('Error fetching contact data:', err);
        setError('Failed to load contact information');
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get user's IP and user agent for tracking
      const userAgent = navigator.userAgent;
      
      // Submit form data to database
      await contactSubmissionsService.create({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        status: 'unread',
        user_agent: userAgent
      });
      
      // Reset form on successful submission
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Thank you for your message! I\'ll get back to you soon.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <section id="contact" className="py-20 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 mb-6 card">
            <span className="text-sm font-mono text-muted tracking-wide uppercase">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Ready to bring your project to life? I'd love to hear about your ideas and discuss how we can collaborate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card p-8">
            <h3 className="text-2xl font-heading font-semibold text-white mb-4">Send a Message</h3>
            <p className="text-muted mb-8">
              Fill out the form below and I'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                  placeholder="Project Subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3 bg-gradient-custom bg-gradient-custom-hover text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-heading font-semibold text-white mb-6">Contact Information</h3>
              <p className="text-muted mb-8">
                I'm always excited to discuss new opportunities and interesting projects. 
                Feel free to reach out through any of the channels below.
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 card">
                    <div className="w-6 h-6 bg-slate-700 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-slate-700 rounded mb-2"></div>
                      <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-400 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                {/* Dynamic Contact Info */}
                {contactInfo.length > 0 && (
                  <div className="space-y-4">
                    {contactInfo.map((info) => {
                      const href = info.label === 'Email' ? `mailto:${info.value}` : 
                                  info.label === 'Phone' ? `tel:${info.value}` : 
                                  info.value.startsWith('http') ? info.value : '#';
                      
                      return (
                        <a
                          key={info.id}
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex items-center space-x-4 p-4 card hover:border-accent/30 transition-all duration-300 group"
                        >
                          <div className="group-hover:text-white transition-colors duration-300">
                            {iconMap[info.icon] || <Mail size={24} />}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{info.label}</h4>
                            <p className="text-muted text-sm">{info.value}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )}

                {/* Dynamic Social Links */}
                {socialLinks.length > 0 && (
                  <div>
                    <h4 className="text-xl font-heading font-semibold text-white mb-4">Follow Me</h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.id}
                          href={social.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="p-3 bg-slate-800/50 rounded-lg hover:bg-gradient-custom/20 hover:text-gradient-custom transition-all duration-300 text-muted"
                        >
                          {iconMap[social.icon] || <Github size={24} />}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty States */}
                {!loading && !error && contactInfo.length === 0 && socialLinks.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted mb-4">Contact information will be available soon.</p>
                  </div>
                )}
              </>
            )}

            <div className="card p-6 border-accent/20">
              <h4 className="text-lg font-heading font-semibold text-white mb-2">Available for Projects</h4>
              <p className="text-muted text-sm">
                I'm currently accepting new client projects and would love to hear about your next big idea.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;