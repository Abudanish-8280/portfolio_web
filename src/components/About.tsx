import React, { useState, useEffect } from 'react';
import { Code, Palette, Zap, Smartphone, Layers, Target } from 'lucide-react';
import { aboutFeaturesService, personalInfoService } from '../lib/database';
import type { AboutFeature, PersonalInfo } from '../lib/supabase';

const About = () => {
  const [features, setFeatures] = useState<AboutFeature[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Icon mapping for dynamic icons
  const iconMap: { [key: string]: React.ReactNode } = {
    Code: <Code size={24} />,
    Palette: <Palette size={24} />,
    Zap: <Zap size={24} />,
    Smartphone: <Smartphone size={24} />,
    Layers: <Layers size={24} />,
    Target: <Target size={24} />
  };

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [featuresData, personalData] = await Promise.all([
          aboutFeaturesService.getAll(),
          personalInfoService.get()
        ]);
        setFeatures(featuresData);
        setPersonalInfo(personalData);
        setError(null);
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError('Failed to load about information');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Default content if no data is loaded
  const displayBio = personalInfo?.bio || "I'm a passionate front-end developer with over 4 years of experience creating user-friendly websites and applications that drive real business results.";
  const displayTitle = personalInfo?.title || 'Front-End Developer';

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
          {loading ? (
            <div className="animate-pulse">
              <div className="h-6 bg-slate-700 rounded mb-8 mx-auto max-w-3xl"></div>
              <div className="h-4 bg-slate-700 rounded mb-16 mx-auto max-w-2xl"></div>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card p-8">
                    <div className="w-16 h-16 bg-slate-700 rounded-lg mb-6"></div>
                    <div className="h-6 bg-slate-700 rounded mb-4"></div>
                    <div className="h-4 bg-slate-700 rounded mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
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
              <div className="text-center mb-16">
                <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                  {displayBio}
                </p>
                <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
                  Specializing in modern web technologies with expertise in 
                  <span className="text-white font-medium"> Shopify</span> and <span className="text-white font-medium">WordPress</span> development.
                </p>
              </div>

              {/* Dynamic Features Grid */}
              {features.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-8">
                  {features.map((feature) => (
                    <div key={feature.id} className="card p-8 hover-lift transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-custom rounded-lg flex items-center justify-center mb-6">
                        {iconMap[feature.icon] || <Code size={24} />}
                      </div>
                      <h3 className="text-xl font-heading font-semibold mb-4 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted mb-4">No features available at the moment.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;