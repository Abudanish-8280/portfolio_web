import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const projects = [
    {
      title: "Premium Shopify Store",
      description: "Custom Shopify theme development with advanced filtering, multi-currency support, and optimized checkout flow. Increased conversion rate by 35%.",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Shopify", "Liquid", "JavaScript", "CSS3"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Shopify"
    },
    {
      title: "WordPress Corporate Site",
      description: "Full-stack WordPress development with custom post types, ACF integration, and responsive design. Built for a tech company with 10k+ monthly visitors.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["WordPress", "PHP", "JavaScript", "MySQL"],
      liveUrl: "#",
      githubUrl: "#",
      category: "WordPress"
    },
    {
      title: "WooCommerce Online Store",
      description: "Complete e-commerce solution with WooCommerce, custom payment gateways, inventory management, and advanced product filtering.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["WordPress", "WooCommerce", "PHP", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      category: "WooCommerce"
    },
    {
      title: "React Dashboard App",
      description: "Modern analytics dashboard built with React and D3.js. Features real-time data visualization, dark/light themes, and responsive design.",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "TypeScript", "D3.js", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
      category: "React"
    },
    {
      title: "Angular Enterprise App",
      description: "Large-scale Angular application with micro-frontend architecture, state management with NgRx, and comprehensive testing suite.",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Angular", "TypeScript", "NgRx", "Material UI"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Angular"
    },
    {
      title: "Fashion Brand Website",
      description: "Headless Shopify store with Next.js frontend. Features include AR try-on, personalized recommendations, and seamless mobile experience.",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "Shopify API", "GraphQL", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Shopify"
    },
    {
      title: "Blog & Portfolio Site",
      description: "Custom WordPress theme with Gutenberg blocks, SEO optimization, and performance enhancements. Achieved 95+ PageSpeed score.",
      image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["WordPress", "PHP", "Gutenberg", "SCSS"],
      liveUrl: "#",
      githubUrl: "#",
      category: "WordPress"
    },
    {
      title: "React E-learning Platform",
      description: "Interactive learning platform built with React, featuring video streaming, progress tracking, quizzes, and certificate generation.",
      image: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
      category: "React"
    },
    {
      title: "Multi-vendor Marketplace",
      description: "Complex WooCommerce multi-vendor marketplace with vendor dashboards, commission management, and advanced reporting.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["WooCommerce", "PHP", "JavaScript", "MySQL"],
      liveUrl: "#",
      githubUrl: "#",
      category: "WooCommerce"
    }
  ];

  const tabs = ['All', 'Shopify', 'WordPress', 'WooCommerce', 'Angular', 'React'];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
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
              </div>

              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-white mb-3 group-hover:text-gradient-custom transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6">
                  <TechSlider tech={project.tech} />
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href={project.liveUrl}
                    className="flex items-center space-x-2 bg-text-gradient hover:text-white transition-colors duration-300 text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    <span>View Live</span>
                  </a>
                  <a
                    href={project.githubUrl}
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
      </div>
    </section>
  );
};

export default Projects;