'use client';

import { motion } from 'framer-motion';
import { Star, Quote, StarHalf } from 'lucide-react';
import { testimonials as fallbackTestimonials } from '@/data/testimonials';
import TestimonialForm from '@/components/TestimonialForm';
import { useEffect, useState } from 'react';

type Testimonial = {
  _id: string;
  fullname: string;
  feedback: string;
  rating: number;
};

export default function TestimonialsSection() {
  const [dynamicTestimonials, setDynamicTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials = () => {
    fetch('/api/testimonials')
      .then(async (res) => {
        const result = await res.json();
        if (result.success && result.data) {
          setDynamicTestimonials(result.data);
        }
      })
      .catch(() => undefined);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating - i >= 1) {
        stars.push(<Star key={i} fill="currentColor" className="w-5 h-5 text-yellow-400" />);
      } else if (rating - i === 0.5) {
        stars.push(
          <div key={i} className="relative w-5 h-5 text-yellow-400">
            <Star className="w-5 h-5 absolute" />
            <div className="absolute overflow-hidden w-[10px] h-5">
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 opacity-30" />);
      }
    }
    return stars;
  };

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6">
              What Our Clients Say
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {fallbackTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-brand-gray border border-slate-100 rounded-3xl p-8 md:p-10 relative shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-200 pointer-events-none" />
              
              <div>
                <div className="flex text-yellow-400 mb-6">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-slate-600 text-lg mb-8 leading-relaxed italic relative z-10">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>
              
              <div className="flex items-center pt-4 border-t border-slate-200/60 mt-auto">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-white shadow-sm"
                  />
                )}
                <div>
                  <h4 className="font-bold text-brand-navy leading-snug">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.projectType} • {testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {dynamicTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (fallbackTestimonials.length + idx) * 0.05 }}
              className="bg-brand-gray border border-slate-100 rounded-3xl p-8 md:p-10 relative shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-200 pointer-events-none" />
              
              <div>
                <div className="flex text-yellow-400 mb-6">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-slate-600 text-lg mb-8 leading-relaxed italic relative z-10">
                  &ldquo;{testimonial.feedback}&rdquo;
                </p>
              </div>
              
              <div className="flex items-center pt-4 border-t border-slate-200/60 mt-auto">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-navy to-blue-600 mr-4 flex items-center justify-center text-white font-bold text-xl uppercase ring-2 ring-white shadow-sm flex-shrink-0">
                  {testimonial.fullname.trim().charAt(0) || 'U'}
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy leading-snug">{testimonial.fullname}</h4>
                  <p className="text-sm text-slate-500">Verified Client</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TestimonialForm onSubmitted={fetchTestimonials} />
        </motion.div>
      </div>
    </section>
  );
}
