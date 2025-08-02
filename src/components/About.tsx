import React from 'react';
import { Code, Palette, Zap } from 'lucide-react';

const About = () => {

  const highlights = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description: "Writing maintainable, semantic, and performance-optimized code"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Focus",
      description: "Creating intuitive interfaces that enhance user experience"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance",
      description: "Optimizing for speed, accessibility, and search engines"
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 mb-6 card">
            <span className="text-sm font-mono text-muted tracking-wide uppercase">About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
            Building Digital Solutions
          </h2>
        </div>

        <div className="mx-auto">
          <div className="text-center mb-16">
            <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              I'm a passionate front-end developer with over <span className="bg-text-gradient font-semibold">4 years of experience</span> 
              creating user-friendly websites and applications that drive real business results.
            </p>
            <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
              My expertise spans modern web technologies, with a special focus on 
              <span className="text-white font-medium"> Shopify</span> and <span className="text-white font-medium">WordPress</span> development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 hover-lift transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-custom rounded-lg flex items-center justify-center mb-6">
                <Code size={24} className="" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-white">
                Clean Code
              </h3>
              <p className="text-muted leading-relaxed">
                Writing maintainable, scalable code following modern development standards.
              </p>
            </div>

            <div className="card p-8 hover-lift transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-custom rounded-lg flex items-center justify-center mb-6">
                <Palette size={24} className="" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-white">
                User-Focused Design
              </h3>
              <p className="text-muted leading-relaxed">
                Creating intuitive interfaces that provide excellent user experiences across all devices and platforms.
              </p>
            </div>

            <div className="card p-8 hover-lift transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-custom rounded-lg flex items-center justify-center mb-6">
                <Zap size={24} className="" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-white">
                Performance
              </h3>
              <p className="text-muted leading-relaxed">
                Delivering fast-loading, optimized websites with exceptional performance metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;