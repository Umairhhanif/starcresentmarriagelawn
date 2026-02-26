'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '15+', label: 'Years of Excellence' },
  { value: '2000+', label: 'Events Hosted' },
  { value: '1000+', label: 'Guest Capacity' },
  { value: '4.0', label: 'Google Rating' },
];

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!imageRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image reveal with scale
      gsap.fromTo(
        imageRef.current,
        {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          scale: 1.2
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          scale: 1,
          duration: 1.8,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Decorative line animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Title split animation
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Content paragraphs fade in
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll('p');
        gsap.fromTo(
          paragraphs,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Stats counter animation
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll('.stat-card');

        gsap.fromTo(
          statCards,
          {
            y: 60,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
            },
          }
        );

        // Animate stat numbers
        statCards.forEach((card) => {
          const valueEl = card.querySelector('.stat-value');
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
                  duration: 2,
                  ease: 'power2.out',
                  snap: { innerText: 1 },
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {/* Decorative background element */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-5"
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Content - Left side */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div
                ref={lineRef}
                className="w-16 h-px"
                style={{ backgroundColor: 'var(--primary)' }}
              />
              <span
                className="text-xs tracking-[0.4em] uppercase font-medium"
                style={{ color: 'var(--primary)' }}
              >
                About Us
              </span>
            </div>

            <h2
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              <span className="word inline-block">Crafting</span>
              <br />
              <span className="word inline-block italic" style={{ color: 'var(--primary)' }}>
                Memories
              </span>
              <br />
              <span className="word inline-block">Since</span>{' '}
              <span className="word inline-block">2009</span>
            </h2>

            <div ref={contentRef} className="space-y-6 mb-12">
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                Star Crescent Marriage Lawn has been the premier destination for
                unforgettable celebrations in Karachi. Located in the heart of
                Model Colony, our venue combines elegant aesthetics with
                world-class hospitality.
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                From intimate gatherings to grand weddings, we transform your vision
                into reality with our stunning décor, professional catering, and
                dedicated team of event specialists.
              </p>
            </div>

            {/* Stats - Mobile/Tablet */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 lg:hidden">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card relative p-6 overflow-hidden group"
                  style={{
                    backgroundColor: 'var(--surface-light)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.1), transparent)'
                    }}
                  />
                  <div
                    className="stat-value text-4xl font-light mb-2 relative z-10"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--primary)',
                      fontStyle: 'italic'
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-wider uppercase relative z-10"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image - Right side */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              {/* Main image */}
              <div
                ref={imageRef}
                className="relative h-[500px] lg:h-[700px] overflow-hidden"
                style={{
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)'
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
                  alt="Star Crescent Lawn Interior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                {/* Subtle overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(13, 13, 13, 0.4))'
                  }}
                />
              </div>

              {/* Decorative border element */}
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 border-r-2 border-b-2 hidden lg:block"
                style={{ borderColor: 'var(--primary)', opacity: 0.4 }}
              />

              {/* Stats overlay - Desktop only */}
              <div className="hidden lg:block absolute -bottom-12 -left-12 glass p-8 max-w-sm">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-card text-center">
                      <div
                        className="stat-value text-3xl font-light mb-1"
                        style={{
                          fontFamily: 'var(--font-display)',
                          color: 'var(--primary)',
                          fontStyle: 'italic'
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-[10px] tracking-wider uppercase"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
