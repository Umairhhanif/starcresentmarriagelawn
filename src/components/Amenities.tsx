'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users, Car, Wind, Utensils, Music,
  Flower, Wifi, Accessibility, Shield
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  { icon: Users, label: 'Capacity', value: '1000+', description: 'Guest capacity' },
  { icon: Car, label: 'Parking', value: 'Free', description: 'Valet available' },
  { icon: Wind, label: 'Climate', value: 'AC', description: 'Fully air-conditioned' },
  { icon: Utensils, label: 'Catering', value: 'Premium', description: 'In-house kitchen' },
  { icon: Music, label: 'Sound', value: 'Pro', description: 'DJ & sound system' },
  { icon: Flower, label: 'Decor', value: 'Custom', description: 'Professional styling' },
  { icon: Wifi, label: 'Internet', value: 'Free', description: 'High-speed WiFi' },
  { icon: Accessibility, label: 'Access', value: 'Easy', description: 'Wheelchair friendly' },
  { icon: Shield, label: 'Security', value: '24/7', description: 'Professional guards' },
];

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const elements = headerRef.current.querySelectorAll('.header-element');
        gsap.fromTo(
          elements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Amenity cards with 3D flip effect
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.amenity-card');

        cards.forEach((card, index) => {
          // Card entrance
          gsap.fromTo(
            card,
            {
              rotateY: -90,
              opacity: 0,
              scale: 0.8
            },
            {
              rotateY: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: index * 0.08,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
            }
          );

          // Icon bounce
          const icon = card.querySelector('.amenity-icon');
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0, rotation: -180 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                delay: index * 0.08 + 0.3,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                },
              }
            );
          }

          // Value counter animation
          const valueEl = card.querySelector('.amenity-value');
          if (valueEl) {
            const text = valueEl.textContent || '';
            const numMatch = text.match(/\d+/);

            if (numMatch) {
              const targetNum = parseInt(numMatch[0]);
              const suffix = text.replace(/\d+/, '');

              gsap.fromTo(
                valueEl,
                { innerText: 0 },
                {
                  innerText: targetNum,
                  duration: 1.5,
                  delay: index * 0.08 + 0.4,
                  ease: 'power2.out',
                  snap: { innerText: 1 },
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                  },
                  onUpdate: function() {
                    if (valueEl) {
                      valueEl.textContent = Math.ceil(parseFloat(valueEl.textContent || '0')) + suffix;
                    }
                  }
                }
              );
            }
          }
        });
      }

      // Info box animation
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          {
            y: 80,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 85%',
            },
          }
        );

        // Highlight text animation
        const highlights = infoRef.current.querySelectorAll('.highlight-text');
        gsap.fromTo(
          highlights,
          { backgroundSize: '0% 100%' },
          {
            backgroundSize: '100% 100%',
            duration: 1,
            stagger: 0.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
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
      id="amenities"
      className="py-32 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: 'var(--primary)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: 'var(--primary)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            className="header-element text-sm tracking-[0.3em] uppercase mb-4 block"
            style={{ color: 'var(--primary)' }}
          >
            Venue Features
          </span>

          <h2
            className="header-element text-4xl md:text-5xl lg:text-6xl font-light mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            World-Class
            <br />
            <span style={{ color: 'var(--primary)' }}>Amenities</span>
          </h2>

          <p
            className="header-element text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Every detail designed for your comfort and convenience,
            ensuring a seamless celebration experience.
          </p>
        </div>

        {/* Amenities Grid */}
        <div ref={gridRef} className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-4 mb-16">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.label}
              className="amenity-card p-6 rounded-2xl text-center group hover:gold-glow transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: 'var(--surface)',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <div
                className="amenity-icon w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: 'var(--surface-light)' }}
              >
                <amenity.icon
                  size={28}
                  style={{ color: 'var(--primary)' }}
                />
              </div>

              <div
                className="amenity-value text-2xl font-medium mb-1"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-primary)'
                }}
              >
                {amenity.value}
              </div>

              <div
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--text-light)' }}
              >
                {amenity.label}
              </div>

              <div
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                {amenity.description}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div
          ref={infoRef}
          className="p-8 rounded-2xl text-center gradient-border"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <p
            className="text-lg mb-4"
            style={{ color: 'var(--text-muted)' }}
          >
            Located at{' '}
            <span
              className="highlight-text font-medium"
              style={{
                color: 'var(--primary)',
                backgroundImage: 'linear-gradient(to right, rgba(201, 169, 97, 0.2), rgba(201, 169, 97, 0.2))',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left center',
                paddingLeft: '4px',
                paddingRight: '4px'
              }}
            >
              Jinnah Avenue, Model Colony, Karachi
            </span>
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            Open daily from{' '}
            <span
              className="highlight-text font-medium"
              style={{
                color: 'var(--primary)',
                backgroundImage: 'linear-gradient(to right, rgba(201, 169, 97, 0.2), rgba(201, 169, 97, 0.2))',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left center',
                paddingLeft: '4px',
                paddingRight: '4px'
              }}
            >
              4:00 PM
            </span>{' '}
            onwards
          </p>
        </div>
      </div>
    </section>
  );
}
