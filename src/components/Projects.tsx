import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsService } from '../lib/database';
import type { Project } from '../lib/supabase';

// Tech Slider Component
const TechSlider = ({ tech }: { tech: string[] }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 120;
      const newScrollLeft = direction === 'left' 
        ? sliderRef.current.scrollLeft - scrollAmount
        : sliderRef.current.scrollLeft + scrollAmount;
      
      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollButtons);
      return () => slider.removeEventListener('scroll', checkScrollButtons);
    }
  }, [tech]);

  return (
    <div className="relative">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-slate-700/80 hover:bg-slate-600/80 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <ChevronLeft size={12} className="text-white" />
        </button>
      )}
      
      {/* Tech Tags Slider */}
      <div
        ref={sliderRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tech.map((techItem, techIndex) => (
          <span
            key={techIndex}
            className="px-2 py-1 bg-slate-800/50 text-muted text-xs rounded-md border border-slate-700/50 whitespace-nowrap flex-shrink-0"
          >
            {techItem}
          </span>
        ))}
      </div>
      
      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-slate-700/80 hover:bg-slate-600/80 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <ChevronRight size={12} className="text-white" />
        </button>
      )}
    </div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from database
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsService.getAll();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Get unique categories from projects data
  const categories = Array.from(new Set(projects.map(project => project.category)));
  const tabs = ['All', ...categories];

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeTab);



  return (
    <section id="projects" className="py-20 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 mb-6 card">
            <span className="text-sm font-mono text-muted tracking-wide uppercase">Featured Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Recent Projects
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            A showcase of my latest work in web development, featuring modern technologies and clean design principles.
          </p>
          
          {/* Tab Bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 outline-none focus:outline-none rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-custom text-white shadow-gradient-custom'
                    : 'bg-slate-800/50 text-muted hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group card hover:border-accent/30 transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-300"></div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-gradient-custom text-white text-xs rounded-md font-medium">
                      {project.category}
                    </span>
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-yellow-500 text-black text-xs rounded-md font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-white mb-3 group-hover:text-gradient-custom transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted text-sm mb-4 leading-relaxed project-desc">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <TechSlider tech={project.technologies} />
                  </div>

                  <div className="flex justify-between items-center">
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:text-white transition-colors duration-300 text-sm font-medium"
                    >
                      <ExternalLink size={16} />
                      <span>View Live</span>
                    </a>
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted hover:text-white transition-colors duration-300 text-sm font-medium"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted mb-4">No projects found for the selected category.</p>
            <button 
              onClick={() => setActiveTab('All')} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;