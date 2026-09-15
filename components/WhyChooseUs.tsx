'use client';

import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const benefits = [
    {
      title: 'Transparent Pricing',
      description: 'No hidden surprises. Get clear estimates and defined project scope.',
    },
    {
      title: 'Quality Materials',
      description: 'We use carefully selected materials and follow defined quality standards.',
    },
    {
      title: 'Experienced Professionals',
      description: 'Architects, engineers, supervisors and skilled construction teams.',
    },
    {
      title: 'Timely Execution',
      description: 'Structured planning and regular monitoring to keep projects moving.',
    },
    {
      title: 'Dedicated Support',
      description: 'A dedicated team to answer questions and keep you updated.',
    },
    {
      title: 'Quality Assurance',
      description: 'Regular site inspections and quality checks throughout construction.',
    },
    {
      title: 'Customized Solutions',
      description: 'Solutions designed around your plot, budget, lifestyle and requirements.',
    },
    {
      title: 'Complete Responsibility',
      description: 'One construction partner from planning to final handover.',
    }
  ];

  return (
    <section id="why-us" className="py-20 lg:py-32 bg-brand-navy text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Why Build With Us?
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:bg-slate-800 transition-colors"
            >
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-6 text-brand-orange font-bold text-xl">
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
