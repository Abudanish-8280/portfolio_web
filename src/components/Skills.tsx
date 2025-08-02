import React from 'react';

const Skills: React.FC = () => {

  const skills = [
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 88 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 92 },
    { name: "Shopify", level: 90 },
    { name: "WordPress", level: 88 },
    { name: "WooCommerce", level: 85 },
    { name: "GSAP", level: 80 },
    { name: "Git & GitHub", level: 87 },
    { name: "Responsive Design", level: 95 },
  ];

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
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
            </div>
          ))}
        </div>

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