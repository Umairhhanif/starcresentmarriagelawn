'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Users, Car, Wind, Utensils, Music, 
  Flower, Wifi, Accessibility, Shield
} from 'lucide-react';
import FadeInView from './animations/FadeInView';

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
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!countersRef.current) return;

    const counters = countersRef.current.querySelectorAll('.counter');
    
    counters.forEach((counter) => {
      const value = counter.getAttribute('data-value') || '0';
      const numericValue = parseInt(value.replace(/\D/g, '')) || 0;

      if (numericValue > 0) {
        gsap.fromTo(
          counter,
          { innerText: '0' },
          {
            innerText: numericValue,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="amenities" 
      className="py-24 md:py-32 relative overflow-hidden"
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
        <div className="text-center mb-16">
          <FadeInView>
            <span 
              className="text-sm tracking-[0.3em] uppercase mb-4 block"
              style={{ color: 'var(--primary)' }}
            >
              Venue Features
            </span>
          </FadeInView>

          <FadeInView delay={0.1}>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              World-Class
              <br />
              <span style={{ color: 'var(--primary)' }}>Amenities</span>
            </h2>
          </FadeInView>

          <FadeInView delay={0.2}>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              Every detail designed for your comfort and convenience, 
              ensuring a seamless celebration experience.
            </p>
          </FadeInView>
        </div>

        {/* Amenities Grid */}
        <div ref={countersRef} className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-4">
          {amenities.map((amenity, index) => (
            <FadeInView key={amenity.label} delay={index * 0.05}>
              <div 
                className="p-6 rounded-2xl text-center group hover:gold-glow transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: 'var(--surface-light)' }}
                >
                  <amenity.icon 
                    size={28} 
                    style={{ color: 'var(--primary)' }}
                  />
                </div>

                <div 
                  className="text-2xl font-medium mb-1 counter"
                  data-value={amenity.value}
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
            </FadeInView>
          ))}
        </div>

        {/* Additional Info */}
        <FadeInView delay={0.5}>
          <div 
            className="mt-16 p-8 rounded-2xl text-center gradient-border"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <p 
              className="text-lg mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Located at <span style={{ color: 'var(--primary)' }}>Jinnah Avenue, Model Colony, Karachi</span>
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              Open daily from <span style={{ color: 'var(--primary)' }}>4:00 PM</span> onwards
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
