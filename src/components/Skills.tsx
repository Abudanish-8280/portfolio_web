import React, { useState, useEffect } from 'react';
import { skillsService } from '../lib/database';
import type { Skill } from '../lib/supabase';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch skills from database
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await skillsService.getAll();
        setSkills(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching skills:', err);
        setError('Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-20 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 mb-6 card">
            <span className="text-sm font-mono text-muted tracking-wide uppercase">Technical Skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Tools and technologies I use to build modern web applications
          </p>
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

        {/* Skills Grid */}
        {!loading && !error && skills.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="card p-6 hover-lift transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-heading font-semibold text-white">
                    {skill.name}
                  </h3>
                  <span className="text-sm font-mono text-muted">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="h-full bg-gradient-custom rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                {skill.category && (
                  <div className="mt-2">
                    <span className="text-xs text-muted bg-slate-800/50 px-2 py-1 rounded">
                      {skill.category}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && skills.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted mb-4">No skills available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-muted">
            Always learning and staying up-to-date with the latest technologies
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;