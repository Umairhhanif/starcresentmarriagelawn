'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Heart, Users, Building2, PartyPopper, Sparkles, Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animations
      if (headerRef.current) {
        const line = headerRef.current.querySelector('.header-line');
        const label = headerRef.current.querySelector('.header-label');
        const title = headerRef.current.querySelector('.header-title');
        const desc = headerRef.current.querySelector('.header-desc');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        });

        tl.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.8, ease: 'power2.out' }
        )
        .fromTo(
          label,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          title,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          desc,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        );
      }

      // Service cards staggered animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.service-card');

        gsap.fromTo(
          cards,
          {
            y: 100,
            opacity: 0,
            scale: 0.9,
            rotateX: -15
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1,
            stagger: {
              amount: 0.8,
              from: 'start',
              ease: 'power2.out'
            },
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
            },
          }
        );

        // Animate card numbers on scroll
        cards.forEach((card) => {
          const number = card.querySelector('.card-number');
          if (number) {
            gsap.fromTo(
              number,
              { scale: 0, rotation: -180, opacity: 0 },
              {
                scale: 1,
                rotation: 0,
                opacity: 0.05,
                duration: 1.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                },
              }
            );
          }

          // Icon animation
          const icon = card.querySelector('.card-icon');
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0, rotation: -90 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: 'back.out(2)',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                },
              }
            );
          }

          // Features tags animation
          const features = card.querySelectorAll('.feature-tag');
          gsap.fromTo(
            features,
            { x: -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
              },
            }
          );
        });
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 90%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-32 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-[150px] opacity-10"
        style={{ background: 'var(--primary)' }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-[150px] opacity-10"
        style={{ background: 'var(--accent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="header-line w-16 h-px"
              style={{ backgroundColor: 'var(--primary)' }}
            />
            <span
              className="header-label text-xs tracking-[0.4em] uppercase font-medium"
              style={{ color: 'var(--primary)' }}
            >
              Our Services
            </span>
          </div>

          <h2
            className="header-title text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-[1.1]"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Everything You Need
            <br />
            <span className="italic" style={{ color: 'var(--primary)' }}>
              for a Perfect
            </span>
            <br />
            Celebration
          </h2>

          <p
            className="header-desc text-lg leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            From intimate gatherings to grand celebrations, we offer comprehensive
            event services tailored to your unique vision.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="service-card group relative p-10 h-full cursor-pointer overflow-hidden"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Hover gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.08) 0%, transparent 60%)'
                }}
              />

              {/* Number indicator */}
              <div
                className="card-number absolute top-6 right-6 text-6xl font-light opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-8">
                <div className="card-icon w-16 h-16 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                  <service.icon
                    size={32}
                    style={{ color: 'var(--primary)' }}
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-2xl font-light mb-4 relative z-10"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="mb-8 leading-relaxed relative z-10"
                style={{ color: 'var(--text-muted)' }}
              >
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-3 relative z-10">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="feature-tag text-xs px-4 py-2 tracking-wider uppercase font-medium transition-all duration-300 group-hover:border-primary"
                    style={{
                      backgroundColor: 'var(--surface-light)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Decorative corner */}
              <div
                className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ borderColor: 'var(--primary)' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className="mt-20 text-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-12 py-5 font-medium cursor-pointer group"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid var(--primary)',
              color: 'var(--text-primary)',
              letterSpacing: '0.05em'
            }}
          >
            <span className="uppercase text-sm">Discuss Your Event</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'var(--primary)' }}
            >
              →
            </motion.span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
