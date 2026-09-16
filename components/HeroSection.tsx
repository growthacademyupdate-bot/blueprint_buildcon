'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    projectType: '',
    location: '',
    budget: '',
    startDate: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          projectType: formData.projectType,
          location: formData.location,
          budget: formData.budget,
          startDate: formData.startDate,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error ?? 'Unable to submit your enquiry');
      }

      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', city: '', projectType: '', location: '', budget: '', startDate: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to submit your enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-charcoal">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-navy/70 mix-blend-multiply z-10" />
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
          alt="Modern House Construction"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Build Your Dream.<br />
                <span className="text-brand-orange">We&apos;ll Build It Right.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed">
                End-to-end construction solutions designed around your vision, budget and timeline — from the first blueprint to the final handover.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 bg-brand-orange text-white font-semibold rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 flex items-center"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 backdrop-blur-sm transition-all border border-white/20"
                >
                  Explore Our Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
                {[
                  'Transparent Pricing',
                  'Quality Construction',
                  'Professional Team',
                  'End-to-End Support'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center text-sm font-medium text-slate-200">
                    <CheckCircle2 className="text-brand-orange w-4 h-4 mr-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Consultation Form Card */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-brand-navy mb-6">Plan Your Construction With Us</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-6 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-green-500" />
                  <p className="font-medium text-lg">Thank you!</p>
                  <p>Our construction expert will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Mobile Number"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm"
                    />
                  </div>

                  <select
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm bg-white"
                  >
                    <option value="" disabled>Project Type</option>
                    <option value="Residential Construction">Residential Construction</option>
                    <option value="Commercial Construction">Commercial Construction</option>
                    <option value="Villa Construction">Villa Construction</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Interior & Finishing">Interior & Finishing</option>
                    <option value="Other">Other</option>
                  </select>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="location"
                      placeholder="Property Location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm"
                    />
                    <input
                      type="text"
                      name="budget"
                      placeholder="Approximate Budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm"
                    />
                  </div>
                  
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Expected Start Date"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm text-slate-500"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-navy text-white font-semibold py-3.5 rounded-lg hover:bg-slate-800 transition-colors mt-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
                  </button>
                  
                  <p className="text-xs text-center text-slate-500 mt-4 font-medium">
                    No obligation • Expert consultation • Transparent estimate
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
