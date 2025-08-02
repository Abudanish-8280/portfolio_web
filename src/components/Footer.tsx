import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/50 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-custom rounded-lg flex items-center justify-center">
                <span className="font-bold text-sm">MA</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-white">
                MD Abudanish
              </h3>
            </div>
            <p className="text-muted mb-6 max-w-md leading-relaxed">
              Front-End Developer specializing in creating exceptional web experiences 
              with modern technologies and clean, maintainable code.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 text-muted hover:text-gradient-custom transition-colors duration-300">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 text-muted hover:text-gradient-custom transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 text-muted hover:text-gradient-custom transition-colors duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {[
                'Shopify Development',
                'WordPress Sites',
                'React Applications',
                'E-commerce Solutions'
              ].map((service) => (
                <li key={service}>
                  <span className="text-muted">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm mb-4 md:mb-0">
            © {currentYear} MD Abudanish.
          </p>
          <p className="text-muted text-sm">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;