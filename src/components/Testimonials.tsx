import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonialsService } from '../lib/database';
import type { Testimonial } from '../lib/supabase';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch testimonials from database
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await testimonialsService.getAll();
        setTestimonials(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);


  return (
    <section id="testimonials" className="py-20 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 mb-6 card">
            <span className="text-sm font-mono text-muted tracking-wide uppercase">Client Feedback</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            What Clients Say
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Testimonials from satisfied clients who have worked with me on various projects.
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

        {/* Testimonials Grid */}
        {!loading && !error && testimonials.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`card relative p-6 transition-all duration-500 hover-lift cursor-pointer group`}
              >
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="bg-text-gradient fill-current mx-1 group-hover:scale-110 transition-transform duration-300" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-slate-200 text-center mb-6 leading-relaxed min-h-[4rem] flex items-center justify-center">
                  <span className="italic group-hover:text-white transition-colors duration-300">
                    "{testimonial.content}"
                  </span>
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center space-y-4 mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gradient-custom/30 group-hover:border-gradient-custom/60 transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-custom/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-center space-y-1">
                    <h4 className="text-base font-heading font-semibold text-white group-hover:bg-text-gradient transition-all duration-300">{testimonial.name}</h4>
                    <p className="text-muted text-xs group-hover:text-slate-300 transition-colors duration-300">{testimonial.role}</p>
                    <p className="bg-text-gradient text-xs font-medium">{testimonial.company}</p>
                  </div>
                </div>

                {/* Project tag */}
                <div className="text-center absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-[max-content] ">
                  <span className="px-3 py-1.5 bg-gradient-custom/10 rounded-lg text-xs font-medium group-hover:bg-gradient-custom/20 group-hover:border-gradient-custom/40 transition-all duration-300 bg-gradient-custom">
                    {testimonial.project}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && testimonials.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted mb-4">No testimonials available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;