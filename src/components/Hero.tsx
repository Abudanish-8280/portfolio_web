import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfoService } from '../lib/database';
import type { PersonalInfo } from '../lib/supabase';

const Hero = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch personal info from database
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        setLoading(true);
        const data = await personalInfoService.get();
        if (data) {
          setPersonalInfo(data);
        }
      } catch (err) {
        console.error('Error fetching personal info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  // Default values if no data is loaded
  const displayName = personalInfo?.name || 'MD Abudanish';
  const displayTitle = personalInfo?.title || 'Front-End Developer';
  const displayBio = personalInfo?.bio || 'Specializing in Shopify & WordPress development with 4+ years of experience creating exceptional web experiences';
  const githubUrl = personalInfo?.github || '#';
  const linkedinUrl = personalInfo?.linkedin || '#';
  const email = personalInfo?.email || '#';

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      {/* Simple background */}
      <div className="absolute inset-0 bg-slate-950"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <div className="mb-2">
          <div className="inline-block px-4 py-2 mb-6 card">
            <span className="text-sm font-mono text-muted tracking-wide">Welcome to my portfolio</span>
          </div>
        </div>
        
        {loading ? (
          <div className="animate-pulse">
            <div className="h-16 bg-slate-700 rounded mb-6 mx-auto max-w-md"></div>
            <div className="h-8 bg-slate-700 rounded mb-4 mx-auto max-w-lg"></div>
            <div className="h-6 bg-slate-700 rounded mb-12 mx-auto max-w-2xl"></div>
          </div>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight bg-text-gradient">
              {displayName}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted mb-4 leading-relaxed">
              {displayTitle} & <span className="text-white">Digital Craftsman</span>
            </p>
            
            <p className="text-lg text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
              {displayBio}
            </p>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#projects"
            className="px-8 py-3 bg-gradient-custom bg-gradient-custom-hover text-white rounded-lg font-medium hover-lift transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-slate-600 text-slate-300 rounded-lg font-medium hover-lift hover:border-gradient-custom hover:text-gradient-custom transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>

        <div className="flex justify-center space-x-6 mb-12">
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 text-muted hover:text-gradient-custom transition-colors duration-300"
          >
            <Github size={24} />
          </a>
          <a 
            href={linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 text-muted hover:text-gradient-custom transition-colors duration-300"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href={`mailto:${email}`} 
            className="p-3 text-muted hover:text-gradient-custom transition-colors duration-300"
          >
            <Mail size={24} />
          </a>
        </div>

        <div className="animate-bounce">
          <a href="#about">
            <ChevronDown size={24} className="mx-auto text-muted" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;