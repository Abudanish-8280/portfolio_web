import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "E-commerce Manager",
      company: "TechStyle Fashion",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "Alex transformed our Shopify store completely. The new design increased our conversion rate by 40% and the site loads incredibly fast. His attention to detail and technical expertise are outstanding.",
      rating: 5,
      project: "Custom Shopify Store"
    },
    {
      name: "Michael Rodriguez",
      role: "Founder & CEO",
      company: "GreenTech Solutions",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "Working with Alex was a game-changer for our business. He built a beautiful WordPress site with custom functionality that perfectly meets our needs. Professional, and reliable.",
      rating: 5,
      project: "WordPress Corporate Site"
    },
    {
      name: "Emma Thompson",
      role: "Marketing Director",
      company: "EduLearn Academy",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "Alex created an amazing learning management system for us. The user experience is intuitive and our students love the platform. His React skills are top-notch and he's great to work with.",
      rating: 5,
      project: "React LMS Platform"
    }
  ];


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

        {/* Modern Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
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
                    src={testimonial.avatar}
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
      </div>
    </section>
  );
};

export default Testimonials;