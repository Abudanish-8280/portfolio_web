import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // You would typically send this data to your backend here
    alert('Thank you for your message! I\'ll get back to you soon.');
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      details: "abudanishmd@gmail.com",
      link: "mailto:abudanishmd@gmail.com"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      details: "+91 6305597058",
      link: "tel:+916305597058"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      details: "Bhubaneswar, Odisha, India",
      link: "#"
    }
  ];

  const socialLinks = [
    { icon: <Github size={24} />, url: "#", label: "GitHub" },
    { icon: <Linkedin size={24} />, url: "#", label: "LinkedIn" },
    { icon: <Twitter size={24} />, url: "#", label: "Twitter" }
  ];

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

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center space-x-4 p-4 card hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="bg-text-gradient group-hover:text-white transition-colors duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{info.title}</h4>
                    <p className="text-muted text-sm">{info.details}</p>
                  </div>
                </a>
              ))}
            </div>

            <div>
              <h4 className="text-xl font-heading font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className="p-3 bg-slate-800/50 rounded-lg hover:bg-gradient-custom/20 hover:text-gradient-custom transition-all duration-300 text-muted"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

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