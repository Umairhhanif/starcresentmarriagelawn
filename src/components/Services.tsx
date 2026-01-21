'use client';

import { motion } from 'motion/react';
import { Heart, Users, Building2, PartyPopper, Sparkles, Camera } from 'lucide-react';
import FadeInView from './animations/FadeInView';

const services = [
  {
    icon: Heart,
    title: 'Wedding Ceremonies',
    description: 'Create your perfect wedding day with our stunning outdoor lawn and elegant indoor halls.',
    features: ['Nikkah Setup', 'Baraat Stage', 'Floral Décor'],
  },
  {
    icon: Users,
    title: 'Reception & Walima',
    description: 'Host memorable receptions with exquisite dining and entertainment arrangements.',
    features: ['Gourmet Catering', 'Stage Design', 'Sound System'],
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    description: 'Professional venue for conferences, seminars, and corporate celebrations.',
    features: ['AV Equipment', 'Seating Layouts', 'Catering'],
  },
  {
    icon: PartyPopper,
    title: 'Birthday Parties',
    description: 'Celebrate milestones with customized themes and entertainment packages.',
    features: ['Theme Décor', 'Entertainment', 'Custom Cakes'],
  },
  {
    icon: Sparkles,
    title: 'Mehndi & Sangeet',
    description: 'Colorful celebrations with vibrant décor and lively entertainment options.',
    features: ['Stage Décor', 'DJ & Music', 'Lighting'],
  },
  {
    icon: Camera,
    title: 'Photography Setup',
    description: 'Picture-perfect backdrops and professional photography arrangements.',
    features: ['Photo Booths', 'Backdrops', 'Drone Shots'],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInView>
            <span 
              className="text-sm tracking-[0.3em] uppercase mb-4 block"
              style={{ color: 'var(--primary)' }}
            >
              Our Services
            </span>
          </FadeInView>

          <FadeInView delay={0.1}>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Everything You Need for a
              <br />
              <span style={{ color: 'var(--primary)' }}>Perfect Celebration</span>
            </h2>
          </FadeInView>

          <FadeInView delay={0.2}>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              From intimate gatherings to grand celebrations, we offer comprehensive 
              event services tailored to your unique vision.
            </p>
          </FadeInView>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <FadeInView key={service.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group p-8 rounded-2xl cursor-pointer h-full"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 175, 55, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:gold-glow"
                  style={{ backgroundColor: 'var(--surface-light)' }}
                >
                  <service.icon 
                    size={28} 
                    style={{ color: 'var(--primary)' }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title */}
                <h3 
                  className="text-xl font-medium mb-3"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p 
                  className="mb-6"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: 'var(--surface-light)',
                        color: 'var(--primary)',
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
