'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, ArrowDown } from 'lucide-react';

export default function QualitySection() {
  const stages = [
    'Planning',
    'Material Selection',
    'Foundation',
    'Structural Work',
    'Electrical & Plumbing',
    'Finishing',
    'Inspection',
    'Handover'
  ];

  return (
    <section className="py-20 lg:py-32 bg-brand-navy text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full mb-6 border border-slate-700">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <span className="text-sm font-semibold tracking-wider uppercase text-slate-300">Quality Assurance</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Quality at <span className="text-brand-orange">Every Stage</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
                Our approach combines professional supervision, documented processes and regular quality checks to deliver construction that is built to last.
              </p>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-800"></div>
            <div className="space-y-6 relative">
              {stages.map((stage, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-brand-orange flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                    <span className="font-bold text-sm">{idx + 1}</span>
                  </div>
                  <div className="ml-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-lg px-6 py-4 flex-1 hover:bg-slate-800 transition-colors">
                    <h4 className="font-semibold text-lg">{stage}</h4>
                  </div>
                  {idx < stages.length - 1 && (
                    <ArrowDown className="absolute left-6 ml-[-11px] mt-16 text-slate-600 hidden" size={24} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
