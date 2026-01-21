'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import FadeInView from './animations/FadeInView';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '15+', label: 'Years of Excellence' },
  { value: '2000+', label: 'Events Hosted' },
  { value: '1000+', label: 'Guest Capacity' },
  { value: '4.0', label: 'Google Rating' },
];

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="about" 
      className="py-24 md:py-32"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div 
            ref={imageRef}
            className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden gradient-border"
          >
            <Image
              src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzeTFgvGVcn2V4LAEoFnEJ_mCt5NK4GwUb78PVQDZdEFWJFMhS67Z_F1-8CVsj2p9iQm4-6OrtjYK6mt7ND6-qLAvW1ADWYE0hfV4qINfvqzc7nYyqd5mj7oUSXYph0GRONgSoRtpqxaFsJ=w800-h1200-k-no"
              alt="Star Crescent Lawn Interior"
              fill
              className="object-cover"
            />
            {/* Decorative overlay */}
            <div 
              className="absolute inset-0"
              style={{ 
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), transparent)' 
              }}
            />
          </div>

          {/* Content */}
          <div>
            <FadeInView>
              <span 
                className="text-sm tracking-[0.3em] uppercase mb-4 block"
                style={{ color: 'var(--primary)' }}
              >
                About Us
              </span>
            </FadeInView>

            <FadeInView delay={0.1}>
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                Crafting Memories
                <br />
                <span style={{ color: 'var(--primary)' }}>Since 2009</span>
              </h2>
            </FadeInView>

            <FadeInView delay={0.2}>
              <p 
                className="text-lg mb-6 leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                Star Crescent Marriage Lawn has been the premier destination for 
                unforgettable celebrations in Karachi. Located in the heart of 
                Model Colony, our venue combines elegant aesthetics with 
                world-class hospitality.
              </p>
            </FadeInView>

            <FadeInView delay={0.3}>
              <p 
                className="text-lg mb-10 leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                From intimate gatherings to grand weddings, we transform your vision 
                into reality with our stunning décor, professional catering, and 
                dedicated team of event specialists.
              </p>
            </FadeInView>

            {/* Stats */}
            <FadeInView delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="text-center p-4 rounded-xl"
                    style={{ backgroundColor: 'var(--surface-light)' }}
                  >
                    <div 
                      className="text-3xl md:text-4xl font-light mb-1"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        color: 'var(--primary)' 
                      }}
                    >
                      {stat.value}
                    </div>
                    <div 
                      className="text-xs tracking-wider uppercase"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
