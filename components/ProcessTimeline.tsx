'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProcessTimeline() {
  const steps = [
    { num: '01', title: 'Consultation', desc: "Understand the customer's requirements, property and construction goals." },
    { num: '02', title: 'Site Assessment', desc: 'Evaluate the plot, site conditions and project feasibility.' },
    { num: '03', title: 'Design & Planning', desc: 'Develop architectural plans, structural requirements and project scope.' },
    { num: '04', title: 'Estimate & Agreement', desc: 'Provide a transparent estimate and finalize project specifications.' },
    { num: '05', title: 'Construction', desc: 'Begin construction with professional supervision and quality checks.' },
    { num: '06', title: 'Quality Inspection', desc: 'Inspect major stages and ensure work meets defined standards.' },
    { num: '07', title: 'Finishing', desc: 'Complete interiors, finishing, fixtures and final detailing.' },
    { num: '08', title: 'Handover', desc: 'Complete final inspection and hand over the finished project.' },
  ];

  return (
    <section id="process" className="py-20 lg:py-32 bg-brand-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6">
              From Blueprint to Reality
            </h2>
            <p className="text-lg text-slate-600">
              A simple, transparent process designed to make construction easier.
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-slate-200 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-start lg:items-center lg:text-center relative"
              >
                {/* Vertical Line for Mobile/Tablet */}
                <div className="lg:hidden absolute left-6 top-12 bottom-[-2rem] w-px bg-slate-200 -z-10 last:hidden"></div>

                <div className="flex items-center lg:flex-col w-full lg:w-auto mb-4 lg:mb-6">
                  <div className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-lg shrink-0 lg:mb-4 shadow-lg ring-4 ring-white z-10">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy ml-4 lg:ml-0">{step.title}</h3>
                </div>
                
                <div className="ml-16 lg:ml-0">
                  <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-brand-navy mb-6">Ready to Start Building?</h3>
          <Link
            href="#contact"
            className="inline-flex items-center px-8 py-3.5 bg-brand-orange text-white font-semibold rounded-full hover:bg-orange-600 transition-colors shadow-lg"
          >
            Book Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
